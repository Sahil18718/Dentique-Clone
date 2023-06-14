const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const loginRouter = require('./Routes/login.routes');
const registerRouter = require('./Routes/register.routes');
const { connection } = require('./configs/db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/register', registerRouter);
app.use('/login', loginRouter);

app.get('*', (req, res)=>{
    res.send('<h1>Page Not Found</h1>')
})

app.get("/",(req,res)=>{
    res.send("Dentique Backend Home Page")
})

app.listen(process.env.PORT, ()=>{
    connection();
    console.log(`Server is running on Port: ${process.env.PORT}`)
})

