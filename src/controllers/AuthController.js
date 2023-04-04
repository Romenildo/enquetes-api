const express = require("express")

const UserModel = require("../models/User")
const User = require("../models/User")
const bcrypt = require("bcryptjs")

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


router.post("/autenticate", async(req, res) => {
   
    const { cpf, password } = req.body

    //<sempre que utilizar o model do banco é preciso possuir o await
    const user = await UserModel.findOne({cpf}).select("+password")

    if(!user){
        return res.status(400).json({
            error: true,
            message: "User not found"
        })
    }
    //comparadno a senha recebida com a senha do usuario no banco de dados que ta com o hash
    //importantissimo a parte do await
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({
            error:true,
            message: "Invalid password"
        })
    }

    user.password = undefined

    return res.json({
        error: false,
        message: "Loged!",
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