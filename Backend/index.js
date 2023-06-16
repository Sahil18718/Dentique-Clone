const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connection } = require('./configs/db');
const { appointmentRouter } = require('./Routes/appointment');
const { logoutLogic } = require('./Controllers/common.controllers');
const adminRouter = require('./Routes/Admin.routes');
const patientRouter = require('./Routes/Patient.routes');
const doctorRouter = require('./Routes/Doctor.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Dentique Backend Home Page")
})

app.use('/admin', adminRouter);

app.use('/patient', patientRouter);

app.use('/doctor', doctorRouter);

app.use("/appointment",appointmentRouter);

app.post('/logout', logoutLogic);

app.get('*', (req, res)=>{
    res.send('<h1>Page Not Found</h1>')
})

app.listen(process.env.PORT, ()=>{
    connection();
    console.log(`Server is running @ http://localhost:${process.env.PORT}`)
})

