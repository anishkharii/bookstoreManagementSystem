const { Book } = require('../models/book');
const bookServices = require('../services/booksServices');
const cloudinary = require('cloudinary').v2;
const bookController ={
    getAllBooks : async(req,res)=>{
        try{
            const books = await bookServices.getAllBooks();
            res.render("index",{books});
        }catch(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        }

    },
    getAddBookPage:(req,res)=>{
        // res.send("There is work going on for you to add books. Please give us some time.");
        res.render("add-book");
    },
    addBook: async(req,res)=>{
        try {
            
            const result = await cloudinary.uploader.upload(req.file.path);
            const bookDetail ={
                imageURL:result.secure_url,
                title:req.body.title,
                author:req.body.author,
                price:req.body.price,
                quantity:req.body.quantity,
                category:req.body.category,
                topic:req.body.details
            };
            await bookServices.addBook(bookDetail);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: 'Something went wrong.' });
        }
        
    },
    getEditBookPage:async(req,res)=>{
        const book = await Book.findById(req.params.id);
        res.render('edit-book',{book});
    },
    editBook: async (req, res) => {
        console.log(req.file);
        var bookImageURL ;
        if(req.file!=undefined){
            const result = await cloudinary.uploader.upload(req.file.path);
            bookImageURL = result.secure_url;
        }
        
        const book = await Book.findById(req.params.id);
        
        if(bookImageURL==undefined){
            bookImageURL = book.imageURL;
        }
        const bookDetail = {
            id:req.params.id,
            imageURL: bookImageURL,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            details: req.body.details
        };

    
        await bookServices.editBook(bookDetail);
        res.redirect('/');
    },

    deleteBook:async(req,res)=>{
        try{
            await Book.findByIdAndDelete(req.params.id);
            res.redirect('/');
        }catch(err){
            res.status(500).json({ error: 'Something went wrong.' });
        }
        
    },
    searchBooks: async(req,res)=>{
        try{
            const query = req.body.query;
            if(!query){
                res.redirect('/');
            }
            else{
                const books = await bookServices.searchBooks(query);
                res.render('search',{books,query});
            }
            
        }catch(error){
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = bookController;