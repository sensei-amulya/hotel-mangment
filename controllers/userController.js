const User = require('../models/usermod')
const express = require('express')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const bcrypt = require('bcryptjs')
//const passport = require('passport')
require('dotenv').config()

const app = express()
app.use(cookieparser())

const SignUp = async (req, res) => {
    const {firstName, lastName, email, password, accountType } = req.body
    console.log(`helllo ,${firstName}`)
if (!firstName || !lastName || !email || !password) {
    return res.status(404).json("All fields are required");
}
const user = await User.findOne( {$or:[{email}]})
if (user) {
    return res.json("User's email must be unique")
}
else {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hash,
                accountType
            })
            return res.status(200).json("New User Created")
        })
    })
}
}




const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
        res.json(`User not found with the email:${email}`)
    }
    else {
        bcrypt.compare(password, user.password, function (err, result) {
            console.log(result)
            if (result) {
                const token = jwt.sign({ email }, process.env.secret)
                console.log(token)
                res.cookie("token", token)
                res.json(`Welcome,${email}`)
            }
            else {
                res.json("Incorrect password")
            }
        })
    }
}

module.exports = { SignUp, login }
