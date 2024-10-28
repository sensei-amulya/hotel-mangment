require('dotenv').config()
const express= require('express')
const connctdb=require('./config/database')
const app =express();
connctdb();
app.listen(process.env.Port,()=>{
console.log(`server running on port:${process.env.Port}`)
})