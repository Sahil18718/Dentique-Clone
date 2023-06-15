const { timeStamp } = require("console");
const mongoose = require("mongoose");

const appointmentSchema =new mongoose.Schema({

doctorId : {type:String,required:true},
userId : {type:String,required:true},
deleted : {type:Boolean,default:false},
message :{type:String},


},{timestamps:true,versionKey:false})

const AppointmentModel = mongoose.model("appointments",appointmentSchema);
module.exports={AppointmentModel};