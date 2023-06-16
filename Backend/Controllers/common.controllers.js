const userModel = require("../Models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistModel = require("../Models/blacklistToken.model");
require('dotenv').config();

const loginLogic = (Role) => {
    return async (req, res)=>{
        try{
            let data = req.body;
            const userDetails = await userModel.find({email: data.email});
            if(userDetails.length===0){
                return res.status(400).send({msg: "User Doesn't Exist, create an account"});
            }
            let result = await bcrypt.compare(data.password, userDetails[0].password);
            if(result && userDetails[0].role===Role){
                let accessToken = jwt.sign({userId: userDetails._id}, process.env.JWT_SECRET_KEY, {expiresIn: '4h'});
                res.cookie('token', accessToken, {maxAge: 4*60*60*1000})
                res.status(200).send({msg: 'Login Successful'});
            }else{
                res.status(400).send({msg: 'Wrong Credentials'});
            }
        }catch(err){
            console.log(err.message);
            res.status(500).send({msg: err.message});
        }
    }
}


const logoutLogic = async (req, res) => {
    try{
        let cookie = req.cookies.token;
        let newToken = await blacklistModel({token: cookie});
        await newToken.save();
        res.clearCookie('token');
        res.status(200).send({msg: 'Logout Successful'});
    }catch(err){
        console.log(err.message);
        res.status(500).send({msg: err.message});
    }
}

const registerLogic = (Role) =>{
    return async (req, res)=>{
        try{
            let data = req.body;
            const alreadyPresent = await userModel.find({email: data.email});
            if(alreadyPresent.length!==0){
                return res.status(400).send({msg: 'User Already Exists, try Logging in'});
            }
            data = {...data, role: Role}
            let password = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS))
            data = {...data, ...{password}};
            let newuser = new userModel(data);
            await newuser.save();
            res.status(200).send({msg: 'Registration Done'});
        }catch(err){
            console.log('/register/doctor: ', err.message);
            res.status(500).send({msg: err.message});
        }
    }
}


// // update for doctor

// postRouter.patch("/update/:postID",async(req,res)=>{
//     const{postID}=req.params
//     const payload=req.body
//     try {
//         await PostModel.findByIdAndUpdate({_id:postID},payload)
//         res.status(200).send("Updated")
//     } catch (error) {
//         res.status(400).send({"msg":error.message})
//     }
    
// })

// // Delete for doctor
// postRouter.delete("/delete/:postID",async(req,res)=>{
//     const {postID}=req.params
//     try {
//         await PostModel.findByIdAndDelete({_id:postID})
//         res.status(200).send({"msg":"deleted"})
//     } catch (error) {
//         res.status(400).send({"msg":error.message})
        
//     }
   
// })


module.exports = {loginLogic, logoutLogic, registerLogic};
