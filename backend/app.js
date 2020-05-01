const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

//instense of express()
const app = express();
//instense of the import model
const Book = require('./models/book');

//connecting to Data Base while the credentials of the data base is hidden
mongoose.connect(process.env.MONGO_URL )
.then(() => 
  {console.log('Online DataBase is Ready')
 })
 .catch(() =>{
  console.log
    ('Error occured, During Connecting to DataBase. Pls check the database.js File' );
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))



app.use((req, res, next) => {
  //to solve the issue of CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  //jumping to next fuction//route
  next();
});


//this (back end point ) route will be used to post the data
app.post("/api/book",(req, res, next) => {
  //creating an instance of the model
  const book = new Book({
    //passing the values
    title: req.body.title,
    content: req.body.content
  });
  //saving the data in database
  book.save();
  //ok code to show that post for the book was created
  res.status(201).json({
    message : 'You have successfully created a post'
  });
}) ;

//to get the data from back end to front end
app.get("/api/book", (req, res, next) => {
  Book.find()
    .then(document => {
      res.status(200).json({
        message: "Posts fetched succesfully!",
        posts: document
      });
    });
 
});

// to delete the data from data base using the id of the post
app.delete("/api/book/:id", (req, res, next) => {
  Book.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: "gone"})
  })

  
});
module.exports = app;
