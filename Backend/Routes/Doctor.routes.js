let express=require("express");
// const { DoctorModel } = require("../model/user_model");
let doctorRouter=express.Router();
// let bcrypt=require("bcrypt");
// let jwt=require("jsonwebtoken")
// let Redis=require("ioredis");
const { registerLogic, loginLogic } = require("../Controllers/common.controllers");
const userModel = require("../Models/user.model");
// let redis=new Redis();


doctorRouter.get("/allDocotor", async (req,res)=>{

    // res.send(" Doctor part Working");
    try {
      let list = await userModel.find({role: 'Doctor'});
      res.status(200).send(list);
    } catch (err) {
      console.log('/doctor/allDoctor: ',err.message);
      res.status(500).send({msg: err.message});
    }
})

doctorRouter.post('/register', registerLogic('Doctor'));

doctorRouter.post('/login', loginLogic('Doctor'));


doctorRouter.post("/newdr",async(req,res)=>{
  try {
      const blog= new userModel(req.body)
      await blog.save()
      res.status(400).send("New Docotor register")
      
  }catch(error){
      res.status(400).send({"msg":error.message})
  }
})

// update for doctor

doctorRouter.patch("/update/:postID",async(req,res)=>{
    const{postID}=req.params
    const payload=req.body
    try {
        await user.modelModel.findByIdAndUpdate({_id:postID},payload)
        res.status(200).send("Updated")
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})

// Delete for doctor
doctorRouter.delete("/delete/:postID",async(req,res)=>{
    const {postID}=req.params
    try {
        await user.model.findByIdAndDelete({_id:postID})
        res.status(200).send({"msg":"deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
        
    }
   
})

  // let tokenN;
  // DoctorRouter.post("/login",async(req,res)=>{
  //   // console.log("Working");
  //   let {email,password}=req.body;
  //   try {
  //       let user=await DoctorModel.findOne({email})
  //       if(!user){
  //         return res.status(400).send({msg:"Wrong Credentials"})
  //       }
  //       bcrypt.compare(password, user.password,function(err,result) {
  //           if(result){
                
  //               let token=jwt.sign({userName:user.name,userMobile:user.mobile},"token",{
  //                   expiresIn:'10m'
  //               })
        
  //               let refreshToken=jwt.sign({userName:user.name,userMobile:user.mobile},"refreshToken",{
  //                   expiresIn:'20m'
  //               })
               
  //               res.cookie("token",token)
  //               tokenN=token
  //               res.cookie("refreshToken",refreshToken)
  //               res.send({msg:"Login Successful"});
  //           }
  //           else{
  //               res.status(400).send({msg:"Wrong credential, Login Failed"});
  //           }
  //       });
  //   } catch (error) {
  //     res.send({msg:error.message})
  //   }
  // })


  
//   DoctorRouter.get("/logout",async(req,res)=>{
//     try {
      
//         // let {token}=req.cookies;
        
//         redis.set("blacklist",tokenN);
//         res.send({msg:"LogOut Successfull"});

//     } catch (error) {
//         res.status(500).send({msg:error.message})
//     }
// })

// DoctorRouter.get("/refresh-token",async(req,res)=>{
//     let refreshToken=req.cookies.refreshToken

//     let valid=jwt.verify(refreshToken,"refreshToken")

//     let newToken=jwt.sign({userEmail:valid.email,role:valid.role},"token",{
//         expiresIn:'10m'
//     })
//     res.cookie("token",newToken,{maxAge:1000*60})
//     res.status(200).send({msg:"Token Generated"});

// })

  
module.exports= doctorRouter;