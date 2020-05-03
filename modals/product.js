const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    sku: {type: String, required: true},
    description: {type: String, required: true},
    taxRate: {type: Number, required: true},
});

let product = module.exports = mongoose.model('Product',productSchema);