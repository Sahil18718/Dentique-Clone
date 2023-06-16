const express = require('express');
const { loginLogic, registerLogic } = require('../Controllers/common.controllers');

const patientRouter = express.Router();

patientRouter.post('/login', loginLogic('Patient'));

patientRouter.post('/register', registerLogic('Patient'));

module.exports = patientRouter;