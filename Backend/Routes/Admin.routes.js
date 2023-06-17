const express = require('express');
const { loginLogic, registerLogic } = require('../Controllers/common.controllers');
// const passport = require('passport');
// require('../configs/googleOauth');

const adminRouter = express.Router();

adminRouter.post('/login', loginLogic('Admin'));

adminRouter.post('/register', registerLogic('Admin'));

module.exports = adminRouter;