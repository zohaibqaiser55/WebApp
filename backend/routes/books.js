const express = require("express");

//instense of the import model
const Book = require('../models/book');
//Making instance of express
const router = express.Router();

//**ROUTES */

//this (back end point ) route will be used to post the data
router.post("",(req, res, next) => {

    //creating an instance of the model
    const book = new Book({
      //passing the values
      title: req.body.title,
      content: req.body.content
    });
    //saving the data in database
    book.save().then(createdPost => {
      console.log(createdPost)
      res.status(201).json({ 
        //ok code to show that post for the book was created
        message: "Post added successfully",
        postId: createdPost._id
      });
    });
   
});
  
//this is used to update the review/post 
router.put("/:id", (req, res, next) => {

    //putting the received value in to the local varaible 
    const post = new Book({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
    });
    //updated the review 
    Book.updateOne({ _id: req.params.id }, post)
     .then(result => {
        res.status(200).json({ message: "Update successful!" });
    });
});
    
//to get the data from back end to front end
router.get("", (req, res, next) => {

    Book.find()
      .then(document => {
        res.status(200).json({
          message: "reviews fetched succesfully!",
          posts: document
        });
      });
});


router.get("/:id", (req, res, next) => {
    Book.findById(req.params.id).then(Rev => {
      if (Rev) {
        res.status(200).json(Rev);
      } 
      else {
        res.status(404).json({ message: "Not Avaliable" });
      }
    });
});
  

// to delete the data from data base using the id of the post
router.delete("/:id", (req, res, next) => {
    Book.deleteOne({_id: req.params.id}).then(result => {
      console.log(result);
      res.status(200).json({message: "gone"})
    })   
});

//exporting the file 
module.exports = router;