
const { AppointmentModel } = require("../Models/appointment.model");

const appointmentRouter = require("express").Router();

appointmentRouter.get("/",async(req,res)=>{
    res.status(200).json("appointments")
})
appointmentRouter.post("/",async(req,res)=>{
    try{
    //___________setting dummy data
    req.body.userId="1"
    req.body.doctorId="1"
    //___________dummy data set
    let {userId,doctorId,message,}=req.body;
    if(!userId){res.status(401).json("you are not authorized")}
    else if (!doctorId){res.status(507).json('No doctor selected')}
    else {
        let newAppointment = new AppointmentModel(req.body);
        let output= await newAppointment.save();
        res.send(output)
    }
    }catch(err){
        console.log("error in appointmentRouter | get",error)
        res.status(500).json("server error")
}
})










module.exports ={appointmentRouter}