

const mongoose = require("mongoose");

const appointmentSchema =new mongoose.Schema({

doctorId : {type:String,required:true},
userId : {type:String,required:true},
deleted : {type:Boolean,default:false},
time : {type:String,required:true},
date : {type:String,required:true},
status : {type:String,enum:["pending","accepted","cancelled"],default:"pending"},


},{timestamps:true,versionKey:false})

const AppointmentModel = mongoose.model("appointments",appointmentSchema);
module.exports={AppointmentModel};