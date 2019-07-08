LIBRARY SERVICE

3 FUNCTIONALITY
BOOK
ORDER
CUSTOMER
So you need to create 3 folder

1.Inside Book add book.js file

Npm i express body-parser mongoose
```
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

```

For model
```
const mongoose = require("mongoose");

mongoose.model("Book",{
   //title,author,numberPages,publisher
   title : { type: String,required:true },
   author : { type: String,required:true },
   numberPages : { type: Number,required:false },
   publisher : { type: String,required:false }
})

```

2. Inside Customer folder

Npm i express body-parser mongoose


```
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
```

In model
```
const mongoose = require("mongoose");

mongoose.model("Customer",{
   name : { type: String,required:true },
   age : { type: Number,required:true },
   address : { type: String,required:false }
})

```

3. Inside Order folder
Npm i express body-parser mongoose request axios

Request is a library that allows our application to send request to another services.
So using request we can make get/post/ delete request to another  services.

In model
```
const mongoose = require('mongoose');

mongoose.model("Order",{
   customeId:{
       type: mongoose.SchemaTypes.ObjectId,
       required : true
   },
   bookId:{
       type: mongoose.SchemaTypes.ObjectId,
       required : true
   },
   initialDate:{
       type: Date,
       required:true
   },
   deliveryDate:{
       type: Date,
       required:true
   }
})
```

In order.js
```
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
```



