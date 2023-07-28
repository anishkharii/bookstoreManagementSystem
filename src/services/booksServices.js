const {Book, History} = require("../models/book");

const bookServices = {
    getAllBooks : async()=>{
        try{
            const books = await Book.find({});
            return books;
        }catch(error){
            throw new Error('Error fetching books from the database');
        }
    },
    addBook:async(bookData)=>{

        try{
            const book = new Book({
                imageURL:bookData.imageURL,
                title:bookData.title,
                author:bookData.author,
                price:bookData.price,
                quantity:bookData.quantity,
                category:bookData.category,
                topic:bookData.topic
            });
            await book.save().then(()=>{
                console.log("New Book Saved");
            });
            return book;
        }catch(error){
            console.log(error);
            throw new Error('Error adding the book to the database');
        }
    },
    searchBooks:async(query)=>{
        try{
            const books = await Book.find({
                $or:[
                    {title:{$regex:query,$options:'i'}},
                    {author:{$regex:query,$options:'i'}},
                    {category:{$regex:query,$options:'i'}},
                    {topic:{$regex:query,$options:'i'}}
                ]
            });
            return books;
        }catch(error){
            throw new Error('Error searching books');
        }
    }
}

module.exports = bookServices;