const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const loginRouter = require('./Routes/login.routes');
const registerRouter = require('./Routes/register.routes');
const { connection } = require('./configs/db');
const { appointmentRouter } = require('./Routes/appointment');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");
const { openapiSpecification } = require('./configs/swagger.docs');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/",async(req,res)=>{res.send("HOME PAGE")})
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use("/appointment",appointmentRouter);



app.get("/",(req,res)=>{
    res.send("Dentique Backend Home Page")
})

//swagger documentation middleware.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));




app.get('*', (req, res)=>{
    res.send('<h1>Page Not Found</h1>')
})

app.listen(process.env.PORT, ()=>{
    connection();
    console.log(`Server is running @ http://localhost:${process.env.PORT}`)
})

