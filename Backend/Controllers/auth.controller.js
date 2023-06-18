require("dotenv").config();
const jwt = require("jsonwebtoken")

const auth = async (req,res,next)=>{
  try{
    if(req.headers.token){
        
        let incToken = req.headers.token;
        //console.log("token from header",incToken);
      
        await jwt.verify(incToken, process.env.JWT_SECRET_KEY, function(err, decoded) {
        if(err){ res.status(404).json("you are not authorized")}
        else{ 
         
          req.body.userId =decoded.userId;
          // console.log(req.body.userId,"is the userid added")
          next();
        }
       
 });
       
    }
    else{
   
      res.status(404).json("you are not authorized")}
    
  }catch(err){
    //console.log("error  in auth",err)
    res.status(500).json("server error")
  
  }
}

module.exports={auth}