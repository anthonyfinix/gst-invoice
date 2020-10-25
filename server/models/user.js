const mongoose = require("mongoose");

userSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
});

module.exports = mongoose.model("User", userSchema);
