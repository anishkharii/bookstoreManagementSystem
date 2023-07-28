const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config();
const bookRoutes = require('./routes/bookRoutes');

//mongoDB configurations
const url = process.env.MONGO_URI;
mongoose.connect(url).then(()=>{
    console.log("connected");
})



//express app configurations
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.use('/',bookRoutes);

//server start
app.listen(3000,()=>{
    console.log("Running");
})