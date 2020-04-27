const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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
  const posts = req.body;
  console.log();
  //ok code to show that post for the book was created
  res.status(201).jaso({
    message : 'You have successfully created a post'
  })
}) ;

//to get the data from back end to front end
app.get("/api/book", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "Posts fetched succesfully!",
    posts: posts
  });
});

module.exports = app;
