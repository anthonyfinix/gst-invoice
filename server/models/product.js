const mongoose = require("mongoose");

productSchema = new mongoose.Schema({
  name: String
},{ versionKey: false });

module.exports = mongoose.model("Product", productSchema);
