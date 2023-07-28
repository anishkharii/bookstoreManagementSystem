const mongoose = require("mongoose");


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

const HistorySchema = new mongoose.Schema({
    book:BookSchema,
    type:String,
    quantity:{
        type:Number,
        default:1
    },
    date:{
        type:Date,
        default:Date.now,
        immutable:true
    },
    sellPrice:Number,
    TotalAmount:{
        type:Number,
        required:true
    }
});

const Book = mongoose.model("book",BookSchema);
const History = mongoose.model("history",HistorySchema);

module.exports = {Book,History};