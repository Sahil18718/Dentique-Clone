const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connection } = require('./configs/db');
const { appointmentRouter } = require('./Routes/appointment');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const { openapiSpecification } = require('./configs/swagger.docs');

const { logoutLogic } = require('./Controllers/common.controllers');
const adminRouter = require('./Routes/Admin.routes');
const patientRouter = require('./Routes/Patient.routes');
const doctorRouter = require('./Routes/Doctor.routes');

require('dotenv').config();
const app = express();

const http = require("http");
const {Server} = require("socket.io");
const httpServer = http.createServer(app);

const io = new Server(httpServer);



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



app.get("/",(req,res)=>{
    res.send("Dentique Backend Home Page")
})


//swagger documentation middleware.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));




app.get('*', (req, res)=>{
    res.send('<h1>Page Not Found</h1>')
})

app.get("/chat",(req,res)=>{
    res.sendFile(__dirname + "/Fronten/chat/chat.html")
})

io.on("connection",(socket)=>{
    socket.on("chat1",(msg)=>{
        io.emit("chat2",msg)
    })
})


httpServer.listen(process.env.PORT, ()=>{


    connection();
    console.log(`Server is running @ http://localhost:${process.env.PORT}`)
})
