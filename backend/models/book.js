//purpose of the class is to create a model that will be followed to POST the data using mongoose
//code provided in intrective web class is also used to under stand the working 

const mongoose = require('mongoose');

//blue print (defination) i.e what data we want to save in database //deal with the data :0
const bookschema = mongoose.Schema({
    // this variable wiil hold the value of the book title that user will enter 
    //input type is string and user is required to enter something in this field
    title: {type: String, required: true },
    // this variable wiil hold the value of the content that user will add about the book
    //input type is string and user is required to enter something in this field
    content: {type: String, required: true }
});

//to be able to acces this model we will export it
//and pasing the schema i.e bookschema (that we created)
module.exports = mongoose.model('Book', bookschema);

