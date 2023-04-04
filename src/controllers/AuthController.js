const express = require("express")

const UserModel = require("../models/User")
const User = require("../models/User")

const router = express.Router()


router.post("/register", async(req, res) => {
   
    const {cpf} = req.body;//destructing par apegar somente o cpf do objeto

    if(await UserModel.findOne({cpf})){
        return res.status(400).json({
            error: true,
            message: "User already exists!",
        })
    }

    const User = await UserModel.create(req.body)
    
    User.password = undefined;//retirar o password na hora do retorno para mostrar par ao usuario

    return res.json({
        error: false,
        message: "registred with sucess!",
        data: User
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