//I have used the code avaliable on CCT MOODEL [by : Mikhail Timofeev]
//Angular & NodeJS - The MEAN Stack Guide [online Courese on Udemy]
//link to that Course is [https://www.udemy.com/share/101WISB0QZclxTR34=/]
//This project is submitted by: Zohaib Qaiser[2017400]

const express = require("express");

//Making instance of express
const router = express.Router();
//Making instance of Controller (review.js file)
const ReviewController = require("../controllers/review");

//**Requested routes */
//this (back end point ) route will be used to post the review the data
router.post("",ReviewController.createReview);
  
//this is used to update the review
router.put("/:id",ReviewController.updateReview );
    
//to get the data from back end to front end
router.get("", ReviewController.getReview);

//get the review by id 
router.get("/:id",ReviewController.getbyID);
  

// to delete the data from data base using the id of the the review
router.delete("/:id",ReviewController.deleteReview );

//exporting the file 
module.exports = router;