require('dotenv').config()
const express= require('express')
const cookieParser = require("cookie-parser");
const SignUp=require('./routes/signUp') 
const login=require('./routes/login')
const email=require('./routes/email')
const connctdb=require('./config/database')
const app =express();
connctdb();

app.use(cookieParser())


app.use(express.json())
app.use(express.urlencoded({ extended: true }));





app.use('/signup',SignUp)
app.use('/login',login)
app.use('/',email)
app.listen(process.env.Port,()=>{
console.log(`server running on port:${process.env.Port}`)
})