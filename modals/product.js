const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
});

let product = module.exports = mongoose.model('Product',productSchema);