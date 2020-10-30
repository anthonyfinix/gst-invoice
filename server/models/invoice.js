const mongoose = require("mongoose");

invoiceSchema = new mongoose.Schema({
  recipient: String
},{ versionKey: false });

module.exports = mongoose.model("Invoice", invoiceSchema);
