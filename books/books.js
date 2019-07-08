//load express 
    const express = require("express");
    const app = express();

    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
        
// load mongoose
    const mongoose = require('mongoose');
    
    require('./bookModel');
    const Book = mongoose.model("Book");

mongoose.connect("mongodb+srv://ashis:ashis@bookservice-yvcoa.mongodb.net/test?retryWrites=true&w=majority",()=>{
    console.log("database connected");
})

app.get('/',(req,res) => {
    res.send("This is our main endpoint!");
})

// Crate func
app.post('/book',(req,res) => {
    var newBook = new Book(req.body);
    newBook
    .save()
    .then(() => {
        console.log("New book created");
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() =>{
        res.send("great")
    })
})

app.get("/books",(req,res) => {
    Book
    .find()
    .then((books) => {
        res.json(books)
    })
    .catch((err) => {
        throw err;
    })
})

app.get("/book/:id",(req,res) => {
    Book
    .findById(req.params.id)
    .then((book) => {
        if(book){
            res.json(book);
        }else{
            res.sendStatus(404);
        }
    })
    .catch( err => {
        throw err;
    })
})

app.delete("/book/:id",(req,res) => {
    Book
    .findOneAndRemove(req.params.id)
    .then((book) => {
        if(book){
            res.send("book removed successfully");
        }else{
            res.sendStatus(404);
        }
    })
    .catch( err => {
        throw err;
    })
})
app.listen(4545,() => {
    console.log("Up and running! -- this is our books service");
})