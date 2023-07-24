const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const nodeNotifier = require('node-notifier');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

const url = "mongodb+srv://user001:test123@cluster0.dpqjq5z.mongodb.net/booksDB";
mongoose.connect(url).then(()=>{
    console.log("connected");
})

const BookSchema = new mongoose.Schema({
    imageURL:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    category:String,
    topic:String
});

const Book = mongoose.model("book",BookSchema);

const storage = multer.diskStorage({
    destination:"public/images",
    filename:function(req,file,cb){
        const extension = file.originalname.split('.').pop();
        const currDate = new Date();

        const name =`${currDate.getDate()}${currDate.getMonth()+1}${currDate.getFullYear()}_${currDate.getHours()}${currDate.getMinutes()}${currDate.getSeconds()}` ;
        const fileName = `${name}.${extension}`;
        cb(null,fileName);
    }
})


const upload = multer({storage:storage});

app.get("/",async (req,res)=>{
    const books  = await Book.find({})
    res.render("index",{books});
});

app.get("/add-book",(req,res)=>{
    res.render("add-book");
});

app.post("/add-book",upload.single("image"),async(req,res)=>{
    const book = new Book({
        imageURL:req.file.filename,
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        quantity:req.body.quantity,
        category:req.body.category,
        topic:req.body.details
    })
    await book.save().then(()=>{
        nodeNotifier.notify({
            title:"New Book",
            message:"Successfully Saved",
            appName:"Server says: ",
            icon:""
        });
        res.redirect("/");  
        
    });
});



app.post("/search",async (req,res)=>{
    try{
        const query = req.body.query;
        const books = await Book.find({
            $or:[
                {title:{$regex:query,$options:'i'}},
                {author:{$regex:query,$options:'i'}},
                {category:{$regex:query,$options:'i'}},
                {topic:{$regex:query,$options:'i'}}
            ]
        });
        res.render("search",{books,query});
    }catch(error){
        console.log(error);
    }
})
app.listen(process.env.PORT,()=>{
    console.log("Running");
})
