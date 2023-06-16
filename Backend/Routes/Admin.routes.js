const express = require('express');
const { loginLogic, registerLogic } = require('../Controllers/common.controllers');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model');
require('../configs/googleOauth');

const adminRouter = express.Router();

adminRouter.post('/login', loginLogic('Admin'));

adminRouter.post('/register', registerLogic('Admin'));

adminRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

adminRouter.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/login', session: false}), async (req, res)=>{
    let isUserValid = await userModel.findOne({email: req.user._json.email});
    if (isUserValid && isUserValid.role === 'Admin') {
        const access_token = jwt.sign({ userId: isUserValid._id }, process.env.JWT_SECRET_KEY, { expiresIn: '4h' });
        res.cookie('token', access_token, {maxAge: 4*60*60*1000})
        const queryString = JSON.stringify(access_token);
        // res.redirect(`https://adminside-production.up.railway.app?${queryString}`);
        res.redirect(`http://127.0.0.1:5500/Frontend/admin/html/login.html?${queryString}`)
    }
    else{
        res.status(200).send({ msg: "You are not authorized" });
    }
});

module.exports = adminRouter;