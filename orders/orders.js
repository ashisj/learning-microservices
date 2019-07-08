const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');

app.use(bodyParser.json())

mongoose.connect("mongodb+srv://ashis:ashis@order-service-klk5o.mongodb.net/test?retryWrites=true&w=majority",()=>{
    console.log("database connected");
})

require("./orderModel");
const Order = mongoose.model("Order");

app.post("/order",(req,res) => {
    var newOrder = {
        customeId : mongoose.Types.ObjectId(req.body.customeId),
	    bookId : mongoose.Types.ObjectId(req.body.bookId),
	    initialDate : req.body.initialDate,
	    deliveryDate : req.body.deliveryDate
    }
    var order = new Order(newOrder);
    order
    .save()
    .then(() =>{
        res.send("order created successfully");
    })
    .catch(err => {
        throw err;
    })
});

app.get("/orders",(req,res) => {
    Order
    .find()
    .then((orders) => {
        res.json(orders)
    })
    .catch(err => {
        throw err;
    })
})

app.get("/order/:id",(req,res) => {
    Order
    .findById(req.params.id)
    .then((order) => {
        if(order){
            axios.get("http://localhost:5555/customer/" + order.customeId)
            .then((response) =>{
                var orderObject = {customerName : response.data.name , bookTitle : ''}
                
                axios.get("http://localhost:4545/book/" + order.bookId)
                .then(response => {
                    orderObject.bookTitle =response.data.title     
                    res.json(orderObject)               
                })
            })
        }else{
            res.send("Invalid Id")
        }
    })
    .catch(err => {
        throw err;
    })
})

app.listen(7777,()=>{
    console.log("Up and running  - Orders service");
})