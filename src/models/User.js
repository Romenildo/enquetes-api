const mongoose = require("..//database")

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    cpf: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User