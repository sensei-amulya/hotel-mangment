require('dotenv').config()
const express= require('express')
const passport = require('passport');
const session = require("express-session")
const cookieParser = require("cookie-parser");
const SignUp=require('./routes/signUp') 
const login=require('./routes/login')
const email=require('./routes/email')
const room=require('./routes/rooms')
const LoginGoogle=require('./routes/logingoogle')
const connctdb=require('./config/database')
const app =express();
connctdb();

app.use(cookieParser())


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
app.get("/", (req, res) => {
    res.send("<a href='/auth/google'> Login with google </a>")
})



app.use('/room',room)
app.use('/signup',SignUp)
app.use('/login',login)
app.use('/',email)
app.use('/auth/google',LoginGoogle)



app.get('/profile', (req, res) => {
    res.send(`<h1>Welcome ${req.user.displayName} </h1>`)
})



app.listen(process.env.Port,()=>{
console.log(`server running on port:${process.env.Port}`)
})