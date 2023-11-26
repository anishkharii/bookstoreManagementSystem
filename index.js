const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const methodOverride = require('method-override');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const bookRoutes = require('./src/routes/bookRoutes');

//mongoDB configurations
const url =  process.env.MONGO_URI ;
mongoose.connect(url).then(()=>{
    console.log("connected");
});


//cloudinary configurations
const cloudinaryDetails = {
  cloud_name: process.env.CLOUDINARY_CLOUDNAME , 
  api_key: process.env.CLOUDINARY_APIKEY , 
  api_secret: process.env.CLOUDINARY_APISECRET
};     
cloudinary.config(cloudinaryDetails);

//express app configurations
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')));


app.use('/',bookRoutes);

//server start

app.listen(3000|| process.env.PORT,()=>{
    console.log(`Running`);
})
