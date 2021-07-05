const mongoose = require("mongoose");

productSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
  },
  { versionKey: false }
);

module.exports = mongoose.model("Product", productSchema);
