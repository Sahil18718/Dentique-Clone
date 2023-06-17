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

// pataint
//all appointments of a doctor
appointmentRouter.get("/patient",async(req,res)=>{
    let userId = "648c47af54f8af600e3e1d45"
    try{
        // let data =await AppointmentModel.find({userId})
        // res.send(data)
        let data = await AppointmentModel.aggregate([
            {
                "$lookup": {
                    "from": "users",
                    "localField": "userId",
                    "foreignField": "_id",
                    "as": "user"
                }
            }




        ]);
        res.send(data)
    }catch(err){console.log("error in appointment | get",err)}
})

//all appointments of a user


appointmentRouter.get("/",async(req,res)=>{
    let userId = "648c47af54f8af600e3e1d45"
    try{
        // let data =await AppointmentModel.find({userId})
        // res.send(data)
        let data = await AppointmentModel.aggregate([
            {
                "$lookup": {
                    "from": "users",
                    "localField": "doctorId",
                    "foreignField": "_id",
                    "as": "doctor"
                }
            }




        ]);
        res.send(data)
    }catch(err){console.log("error in appointment | get",err)}
})
//update appointment div values
appointmentRouter.patch("/:appointmentId",async(req,res)=>{
    try{
    let userId = "648c47af54f8af600e3e1d45";
    let {status} =req.body;
    let appointmentId = req.params.appointmentId;
    if(!status){res.status(400).json("please provide a status")}
    else if(status=="accepted" || status=="rejected"){
        let data =await AppointmentModel.findOneAndUpdate({_id:appointmentId},{status},{new:true});
        res.send(data)
    }
    else{
        res.status(400).json("That's not a valid status")
    }
    }catch(err){console.log("error in appointment | get",err)}
})


//delete an appointment from userside

appointmentRouter.delete("/:id",async(req,res)=>{
    try{
        
        let output = await AppointmentModel.findByIdAndDelete(req.params.id);
        res.send(output)
    }catch(err){console.log("err in delete appointment",err)}
})





module.exports ={appointmentRouter}