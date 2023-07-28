const bookServices = require('../services/booksServices');

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
        res.send("There is work going on for you to add books. Please give us some time.");
        // res.render("add-book");
    },
    addBook: async(req,res)=>{
        const bookDetail ={
                imageURL:req.file.filename,
                title:req.body.title,
                author:req.body.author,
                price:req.body.price,
                quantity:req.body.quantity,
                category:req.body.category,
                topic:req.body.details
        };
        bookServices.addBook(bookDetail);
        res.redirect('/');
    },
    searchBooks: async(req,res)=>{
        try{
            const query = req.body.query;
            const books = await bookServices.searchBooks(query);
            res.render('search',{books,query});
        }catch(error){
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }

}

module.exports = bookController;