const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Connect to MongoDB
mongoose.connect("");
//Connect with Mongo atlas to abtain the key


//API CALLS
app.get("/",(req,res)=>{
    res.send("Express app is running");
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port: " +port);
    }
    else{
        console.log("SERVER NOT RUNNING!!!" + error);
    }
})
