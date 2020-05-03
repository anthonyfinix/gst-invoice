const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNo: String,
    client: {
        name: String,
        id: String,
    },
    created: { type: Date, default: Date.now },
    products: [],
    draft: Boolean,
});

let invoice = module.exports = mongoose.model('Invoice', invoiceSchema);