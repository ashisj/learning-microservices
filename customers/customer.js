//load express 
    const express = require("express");
    const app = express();

    const bodyParser = require('body-parser');
    app.use(bodyParser.json());
    
// load mongoose
    const mongoose = require('mongoose');

    require('./customerModel');
    const Customer = mongoose.model("Customer");

    mongoose.connect("mongodb+srv://ashis:ashis@customer-service-ur7gj.mongodb.net/test?retryWrites=true&w=majority",()=>{
        console.log("database connected");
    })


// Crate func
    app.post('/customer',(req,res) => {
        console.log(req.body);
        
        var newCustomer = new Customer(req.body);
        newCustomer
        .save()
        .then(() => {
            console.log("Customer created");
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() =>{
            res.send("great")
        })
    })

    app.get("/customers",(req,res) => {
        Customer
        .find()
        .then((customers) => {
            res.json(customers)
        })
        .catch((err) => {
            throw err;
        })
    })

    app.get("/customer/:id",(req,res) => {
        Customer
        .findById(req.params.id)
        .then((customer) => {
            if(customer){
                res.json(customer);
            }else{
                res.sendStatus(404);
            }
        })
        .catch( err => {
            throw err;
        })
    })

    app.delete("/customer/:id",(req,res) => {
        Customer
        .findOneAndRemove(req.params.id)
        .then((customer) => {
            if(customer){
                res.send("customer removed successfully");
            }else{
                res.sendStatus(404);
            }
        })
        .catch( err => {
            throw err;
        })
    })

    app.listen(5555,() => {
        console.log("Up and running! -- this is our customer service");
    })