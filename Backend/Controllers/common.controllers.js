const userModel = require("../Models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistModel = require("../Models/blacklistToken.model");
const { v4: uuidv4 } = require('uuid');
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
                let accessToken = jwt.sign({userId: userDetails[0]._id}, process.env.JWT_SECRET_KEY, {expiresIn: '4h'});
                res.cookie('token', accessToken, {maxAge: 4*60*60*1000})
                res.status(200).send({msg: 'Login Successful', accessToken});
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

const googleOauth = (Role)=>{
    return async (req, res)=>{
        let isUserValid = await userModel.findOne({email: req.user._json.email});
        if (isUserValid && isUserValid.role === Role) {
            const access_token = jwt.sign({ userId: isUserValid._id }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' });
            res.cookie('token', access_token, {maxAge: 4*60*60*1000})
            const queryString = JSON.stringify(access_token);
            res.redirect(`http://127.0.0.1:5500/Frontend/index.html?${queryString}`);
        }
        else{
            const pass = uuidv4();
            const hashedPass = await bcrypt.hash(pass, Number(process.env.SALT_ROUNDS));
            const newUser = new userModel({name: req.user._json.name, email: req.user._json.email, role: 'Patient', password: hashedPass, age: 18});
            await newUser.save();
            const accessToken = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: '4h'});
            const queryString = JSON.stringify(accessToken);
            res.redirect(`http://127.0.0.1:5500/Frontend/index.html?${queryString}`);
        }
    }
}

// 638a6ab2-28f6-4eaa-940c-9a951442f47d

module.exports = {loginLogic, logoutLogic, registerLogic, googleOauth};
