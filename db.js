const mongoose = require("mongoose");

// define the monogodb URL
const  mongoURL = "mongodb://127.0.0.1:27017/hotels";

// set up mongodb connections
mongoose.connect(mongoURL , {
    // useNewUrlparser: true,
    // useUnifiedTopology: true
});

// get the defult connection
// mongoose maintains defult connection object representing the mongodb connection  
const db = mongoose.connection;


// define event listeneres for database connection
db.on('connnected', () =>{
    console.log('connected to mongodb server');
});

db.on('error', (err) =>{
    console.error('mongodb connection server', err);
});

db.on('disconnnected', () =>{
    console.log('mongodb server disconnected');
});

// exports mongodb connection
module.exports = db;