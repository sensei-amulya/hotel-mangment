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



const Room = require('../models/room');

exports.getAllRooms = async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
};

exports.createRoom = async (req, res) => {
  const { Hotel_Id,room_Num,room_type, Price, Availability } = req.body;
  const room = new Room({ Hotel_Id,room_Num,room_type, Price, Availability });
  await room.save();
  res.status(201).json(room);
};
