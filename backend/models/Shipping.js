const mongoose = require('mongoose');


const ShippingSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true 
    },
    address: {
        type: String,
        required:true 
    },
    zipCode: {
        type: String,
        required:true 
    },
    country: {
        type: String,
        required:true 
    },

});

module.exports = Shipping = mongoose.model('shipping', ShippingSchema)