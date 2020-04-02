const mongoose = require('mongoose');

let clientSchema = new mongoose.Schema({
    name: String,
    company: String,
    address: String,
    contactNumber: Number
})

let client = module.exports = mongoose.model('client',clientSchema);