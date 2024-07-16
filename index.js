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
mongoose.connect("mongodb+srv://brianmuchira001:Muriukis@cluster0.c8atalq.mongodb.net/Ecommerce");
//Connect with Mongo atlas to abtain the key


//API CALLS
app.get("/",(req,res)=>{
    res.send("Express app is running");
})

//Image Stoarage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload= multer({storage:storage});
//Creating Upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server running on port: " +port);
    }
    else{
        console.log("SERVER NOT RUNNING!!!" + error);
    }
})
