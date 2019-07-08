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