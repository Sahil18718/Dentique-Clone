const express = require('express');
const { loginLogic, registerLogic } = require('../Controllers/common.controllers');

const adminRouter = express.Router();

adminRouter.post('/login', loginLogic('Admin'));

adminRouter.post('/register', registerLogic('Admin'));

module.exports = adminRouter;