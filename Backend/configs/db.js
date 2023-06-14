const mongoose = require('mongoose');
require('dotenv').config();

const connection = () =>{
    try{
        mongoose.connect(process.env.MONGODB_URI);
        console.log('Connection with the DB Successful');
    }catch(err){
        console.log('Something went wrong with db connection');
    }
}

module.exports = {
    connection
}
