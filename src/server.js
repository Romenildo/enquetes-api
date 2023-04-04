const express = require('express')
const app = express()

const AuthController = require("./controllers/AuthController")

//habilitar o recebimento de json via post
app.use(express.json())

//portas das requisições
app.use("/auth", AuthController)

app.listen(3000, ()=>{
    console.log("Server is running in 3000")
})