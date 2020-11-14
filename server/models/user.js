const mongoose = require("mongoose");

userSchema = new mongoose.Schema(
  {
    name: String,
    username: String,
    password: String,
    email: String,
    invoiceCount: Number,
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
