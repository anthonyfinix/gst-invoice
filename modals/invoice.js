const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNo: String,
    client: {
        name: String,
        id: String,
    },
    created: { type: Date, default: Date.now },
    dueDate: { type: Date },
    products: [],
    status: { type: Number, required: true },
    total: Number,
});

let invoice = module.exports = mongoose.model('Invoice', invoiceSchema);