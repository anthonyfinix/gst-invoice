const mongoose = require("mongoose");

invoiceSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Invoice", invoiceSchema);
