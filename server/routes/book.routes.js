const express = require("express");
const { handleBookStoreController,handleBookViewController,handleDeleteController,handleUpdateController } =require( "../controller/book.controller");

const router = express.Router();

//http://localhost:8000/book/..
router.post('/addBook',handleBookStoreController)
router.get('/viewBook',handleBookViewController)
router.delete('/deleteBook',handleDeleteController)
router.put('/updateBook',handleUpdateController)

module.exports = router;