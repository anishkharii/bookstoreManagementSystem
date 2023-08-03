const express = require('express');
const multer = require('multer');
const bookController = require('../controllers/bookController');

const router = express.Router();

//multer configurations
const storage = multer.diskStorage({
    filename:function(req,file,cb){
        const extension = file.originalname.split('.').pop();
        const currDate = new Date();

        const name =`${currDate.getDate()}${currDate.getMonth()+1}${currDate.getFullYear()}_${currDate.getHours()}${currDate.getMinutes()}${currDate.getSeconds()}` ;
        const fileName = `${name}.${extension}`;
        cb(null,fileName);
    }
})
const upload = multer({storage:storage});

router.get('/',bookController.getAllBooks);
router.get('/add-book',bookController.getAddBookPage);
router.post('/add-book',upload.single("image"),bookController.addBook);

router.get('/edit-book/:id',bookController.getEditBookPage);
router.put('/edit-book/:id',upload.single('image'),bookController.editBook);
router.delete('/edit-book/:id',bookController.deleteBook);

router.post('/search',bookController.searchBooks);

module.exports = router;