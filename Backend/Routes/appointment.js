const { AppointmentModel } = require("../Models/appointment.model");
const userModel = require("../Models/user.model");
const appointmentRouter = require("express").Router();





//1. get all doctors👩‍⚕️👩‍⚕️👩‍⚕️ for appointment page

appointmentRouter.get("/doctors",async(req,res)=>{
  try{
  let data = await userModel.find({role:"Doctor"});
  res.send(data)

  }catch(err){console.log("*********errror in /appointments/doctors | get",err)}
})


//get all appointments

appointmentRouter.get("/",async(req,res)=>{
    res.status(200).json("appointments")
})
appointmentRouter.post("/",async(req,res)=>{
    try{
    //___________setting dummy data
    req.body.userId="648c47af54f8af600e3e1d45"
   
    //___________dummy data set
    let {userId,doctorId,message,time,date}=req.body;
    if(!userId){res.status(401).json("you are not authorized")}
    else if (!doctorId){res.status(507).json('No doctor selected')}
    else if(!time){res.status(507).json('No time selected')}
    else if (!date){res.status(507).json("No date selected")}
    else {
        let appointmentExists = await AppointmentModel.findOne({time,date,doctorId})
        if(appointmentExists){res.status(409).json("That slot is already booked")}
        else{
        let newAppointment = new AppointmentModel(req.body);
        let output= await newAppointment.save();
        res.send(output)
            }
    }
    }catch(err){
        console.log("error in appointmentRouter | get",err)
        res.status(500).json("server error")
}
})










module.exports ={appointmentRouter}