const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

//middlewares
app.use(express.json());
app.use(cors());



app.get("/",(req,res)=>{
    res.send("Dentique Backend Home Page")
})













app.listen(process.env.port,async()=>{
    try{
       console.log(`server started @ http://localhost:${process.env.port}`)
    }catch(err){console.log("________error in connection ",err)}
})