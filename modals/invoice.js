const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    client: {
        name: String,
        id: String,
    },
    created: { type: Date, default: Date.now },
    products: [],
});

let invoice = module.exports = mongoose.model('Invoice', invoiceSchema);