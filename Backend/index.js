const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const loginRouter = require('./Routes/login.routes');
const registerRouter = require('./Routes/register.routes');
const { connection } = require('./configs/db');
const { appointmentRouter } = require('./Routes/appointment');
require('dotenv').config();
const app = express();

const http = require("http");
const {Server} = require("socket.io");
const httpServer = http.createServer(app);

const io = new Server(httpServer);



app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/",async(req,res)=>{res.send("HOME PAGE")})
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use("/appointment",appointmentRouter);

app.get('*', (req, res)=>{
    res.send('<h1>Page Not Found</h1>')
})

app.get("/",(req,res)=>{
    res.send("Dentique Backend Home Page")
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
