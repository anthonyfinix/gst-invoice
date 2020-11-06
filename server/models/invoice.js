const mongoose = require("mongoose");

invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: Number,
    recipient: { name: String, email: String },
    products: [
      {
        name: String,
        price: Number,
        qty: Number,
        discount: Number,
        discountPercentage: Number,
      },
    ],
    issuedOn: Date,
    total: Number,
    draft: Boolean,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
