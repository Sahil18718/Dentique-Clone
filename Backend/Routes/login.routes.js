const express = require('express');
const userModel = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const loginRouter = express.Router();

loginRouter.post('/', async (req, res)=>{
    try{
        let data = req.body;
        const userDetails = await userModel.find({email: data.email});
        if(userDetails.length===0){
            return res.status(400).send({msg: "User Doesn't Exist, create an account"});
        }
        let result = await bcrypt.compare(data.password, userDetails[0].password);
        if(result){
            let accessToken = jwt.sign({userId: userDetails._id}, process.env.JWT_SECRET_KEY, {expiresIn: '4h'});
            res.cookie('token', accessToken, {maxAge: 60*4})
            res.status(200).send({msg: 'Login Successful'});
        }else{
            res.status(400).send({msg: 'Wrong Credentials'});
        }
    }catch(err){
        console.log(err.message);
        res.status(500).send({msg: err.message});
    }
})

// loginRouter.post('/admin', (req, res)=>{
//     try{
    
//     }catch(err){
//         console.log(err.message);
//         res.status(500).send({msg: err.message});
//     }
// })

// loginRouter.post('/doctor', (req, res)=>{
//     try{
    
//     }catch(err){
//         console.log(err.message);
//         res.status(500).send({msg: err.message});
//     }
// })

module.exports = loginRouter;
