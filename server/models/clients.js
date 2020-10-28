const mongoose = require("mongoose");

clientSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Client", clientSchema);
