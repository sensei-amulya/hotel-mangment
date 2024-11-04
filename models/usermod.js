const { default: mongoose } = require('mongoose')
const mogoose = require('mongoose')


const userSchema = new mogoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    },
    accountType:{
        type:String,
        enum:['Customer','Manager','Admin'],
        default:'Customer'
    }

})


module.exports=mongoose.model('User',userSchema);