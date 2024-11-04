const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    Hotel_Id:{
    type:String,
    unique:true,
    },
    room_Num:{
        type: String, 
        required: true   
    },
    room_type:{
        type: String, 
        required: true  
    },
    Price:{
        type: Number, 
        required: true
    },
    Availability:{
        type:String,
        enum:['Available','Booked'],
        default:'Availabe'
    },
    Booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking',
    }

})


module.exports=mongoose.model('Room',roomSchema);