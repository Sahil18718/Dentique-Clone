require("dotenv").config();
const jwt = require("jsonwebtoken")

const auth = async (req,res,next)=>{
  try{
    if(req.cookies.token){
        
        let incToken = req.cookies.token;
       // console.log("token",incToken);
      
        await jwt.verify(incToken, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if(err){console.log(err)}
        else{ 
         
          req.body.userId =decoded.userId;
          console.log(req.body.userId,"is the userid added")
          next();
        }
       
 });
       
    }
    else{
      console.log("cookies",req.cookies)
      res.status(404).json("please login ")}
    
  }catch(err){
    console.log("error  in auth",err)
  }
}

module.exports={auth}