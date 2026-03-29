const { Book } = require("../model/book.model");

const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice
    ) {
      return res
        .status(400)
        .json({ Message: "All field's are requred", Success: false });
    }

    const bookAdd = await Book.create(body);

    if (bookAdd) {
      return res.status(201).json({
        Message: "Data created successfully !",
        Success: true,
        Id: bookAdd?._id,
      });
    }
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleBookViewController = async (req, res) => {

  try {
    const Books = await Book.find({})
    return res.status(200).json({
      message: "Books fetched successfully",
      Success: true,
      totalcount: Books.length,
      BookList: Books
    })

  } catch (error) {
    return res.status(500).json({
      Message: error.message, Success: false
    });
  }
}

const handleDeleteController = async(req,res) =>{
  const body = req.body
  try {
    const deleted =await Book.deleteOne({_id:body.Id})
    console.log('deleted',deleted)
    if(deleted.acknowledged){
        return res.status(200).json({
          message:'book deleted successfully',
          book:deleted,
          Success:true
        })
    }
  } catch (error) {
    return res.status(500).json({
      Message: error.message, Success: false
    });
  }
}

const handleUpdateController = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body.Id ||
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice
    ) {
      return res.status(400).json({
        Message: "All field's are requred",
        Success: false,
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      body.Id,
      {
        BookName: body.BookName,
        BookTitle: body.BookTitle,
        Author: body.Author,
        SellingPrice: body.SellingPrice,
        PublishDate: body.PublishDate,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        Message: "Book not found",
        Success: false,
      });
    }

    return res.status(200).json({
      Message: "Book updated successfully",
      Success: true,
      Book: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookViewController,
  handleDeleteController,
  handleUpdateController
};