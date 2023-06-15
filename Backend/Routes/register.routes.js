const express = require('express');
const userModel = require('../Models/user.model');
const bcrypt = require('bcrypt');

const registerRouter = express.Router();

registerRouter.post('/patient', async (req, res)=>{
    try{
        let data = req.body;
        const alreadyPresent = await userModel.find({email: data.email});
        if(alreadyPresent.length!==0){
            return res.status(400).send({msg: 'User Already Exists, try Logging in'});
        }
        data = {...data, role: 'Patient'}
        let password = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS))
        data = {...data, ...{password}};
        let patient = new userModel(data);
        await patient.save();
        res.status(200).send({msg: 'Registration Done'});
    }catch(err){
        console.log('/register/patient: ', err.message);
        res.status(500).send({msg: err.message});
    }
})

registerRouter.post('/admin', async (req, res)=>{
    try{
        let data = req.body;
        const alreadyPresent = await userModel.find({email: data.email});
        if(alreadyPresent.length!==0){
            return res.status(400).send({msg: 'User Already Exists, try Logging in'});
        }
        data = {...data, role: 'Admin'}
        let password = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS))
        data = {...data, ...{password}};
        let patient = new userModel(data);
        await patient.save();
        res.status(200).send({msg: 'Registration Done'});
    }catch(err){
        console.log('/register/admin: ', err.message);
        res.status(500).send({msg: err.message});
    }
})

registerRouter.post('/doctor', async (req, res)=>{
    try{
        let data = req.body;
        const alreadyPresent = await userModel.find({email: data.email});
        if(alreadyPresent.length!==0){
            return res.status(400).send({msg: 'User Already Exists, try Logging in'});
        }
        data = {...data, role: 'Doctor'}
        let password = await bcrypt.hash(data.password, Number(process.env.SALT_ROUNDS))
        data = {...data, ...{password}};
        let patient = new userModel(data);
        await patient.save();
        res.status(200).send({msg: 'Registration Done'});
    }catch(err){
        console.log('/register/doctor: ', err.message);
        res.status(500).send({msg: err.message});
    }
})

module.exports = registerRouter;
