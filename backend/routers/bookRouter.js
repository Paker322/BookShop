const  {addBook,getBooks,upload,deleteBook,addBuyer,getBook,addSeller,checkLogin,addReview,getReview,addSellerBucket,getSellerBooks,searchBook,updateBook,
    updateBookClik,updateBookRaiting,addBuyerBucket,updateBookQuantity,getBuyerBooks,updateBookQuantityPos,deleteFromBucket 

} =require ('../controllers/bookController')
const router = require('express').Router()
// use routers
router.post('/addBook', upload ,addBook);
router.get('/getBooks',  getBooks);
router.get('/getBooks',  getBooks);
router.get('/getReview/:id',  getReview);
router.get('/searchBook/:title',  searchBook);
router.get('/getSellerBooks/:id',  getSellerBooks);
router.get('/getbuyerbooks/:id',  getBuyerBooks);
router.delete('/bookDelete/:id',  deleteBook);
router.delete('/bucketdelete',  deleteFromBucket);
router.post('/userAdd/buyer',  addBuyer);
router.post('/userAdd/seller',  addSeller);
router.post('/userChek',  checkLogin);
router.post('/addReview',  addReview);
router.post('/addSellerBucket',  addSellerBucket);
router.post('/addbuyerbucket',  addBuyerBucket);
router.get('/:id',  getBook);
router.put('/update/:bookId', upload ,updateBook);
router.put('/updateclik/:bookId', updateBookClik);
router.put('/updatebookquantity/:bookId', updateBookQuantity);
router.put('/updatebookquantityp/:bookId', updateBookQuantityPos);
router.put('/updateraiting/:bookId', updateBookRaiting);
module.exports = router;
