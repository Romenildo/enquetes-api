const express = require('express')
const app = express()

const AuthController = require("./controllers/AuthController")
const AdminController = require("./controllers/AdminController")

const authenticateMiddleware = require("./middlewares/authenticate")

//habilitar o recebimento de json via post
app.use(express.json())

//portas das requisições
app.use("/auth", AuthController)
app.use("/admin", authenticateMiddleware, AdminController)

app.listen(3000, ()=>{
    console.log("Server is running in 3000")
})