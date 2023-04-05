const express = require("express")

const UserModel = require("../models/User")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authConfig = require("../config/auth.json")

const router = express.Router()

const generateToken = (user = {})=>{
    return jwt.sign({
        id: user.id,
        name: user.name
    }, authConfig.secret,
    { expiresIn: 86400} // 1 dia
    )
}

router.post("/register", async(req, res) => {
   
    const {cpf} = req.body;

    if(await UserModel.findOne({cpf})){
        return res.status(400).json({
            error: true,
            message: "User already exists!",
        })
    }
    const user = await UserModel.create(req.body)
    
    user.password = undefined;

    return res.json({
        user,
        token: generateToken(user)
    })
})


router.post("/autenticate", async(req, res) => {
   
    const { cpf, password } = req.body

    const user = await UserModel.findOne({cpf}).select("+password")

    if(!user){
        return res.status(400).json({
            error: true,
            message: "User not found"
        })
    }
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({
            error:true,
            message: "Invalid password"
        })
    }

    user.password = undefined

    return res.json({
        user,
        token: generateToken(user)
    })
})




router.delete("/delete", (req, res) => {
    console.log(req.body)
    return res.json({
        error: false,
        message: "deleted with sucess!",
        
    })
})

module.exports = router