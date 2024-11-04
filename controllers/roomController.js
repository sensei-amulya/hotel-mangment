/*const room =require('../models/room')
const express=require('express')

const RoomList = async (req,res) => {
    try{
        const rooms=await room.find();
    res.status(200).json(rooms);
    }catch(err){
        res.status(500).json({msg:"Error retrieving rooms",err})
    }
    
}

module.exports= {RoomList}*/

const { ApiResponse } = require("../middelwares/apiResponse")


const Room = require('../models/room');

exports.getAllRooms = async (req, res) => {
  if(req.user){const rooms = await Room.find();
    res.json(new ApiResponse(200, rooms))
    ;
}else{
    res.json(new ApiResponse(400, "First login then View the List of rooms!!"))
}
};

exports.createRoom = async (req, res) => {
  if(req.user){const { Hotel_Id,room_Num,room_type, Price, Availability } = req.body;
  const room = new Room({ Hotel_Id,room_Num,room_type, Price, Availability });
  await room.save();
  res.json(new ApiResponse(201, room))

}else{
    res.json(new ApiResponse(400, "First login then Enter the rooms details!!"))

}
};
