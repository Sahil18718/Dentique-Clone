let express=require("express");
const { registerLogic, loginLogic} = require("../Controllers/common.controllers");


let doctorRouter=express.Router();

doctorRouter.get("/",(req,res)=>{
    res.send(" Doctor part Working");
})

doctorRouter.post('/register', registerLogic('Doctor'));

doctorRouter.post('/login', loginLogic('Doctor'));

  
module.exports= doctorRouter;