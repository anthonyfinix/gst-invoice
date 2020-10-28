const mongoose = require("mongoose");

productSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Product", productSchema);
