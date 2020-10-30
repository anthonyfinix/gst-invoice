const mongoose = require("mongoose");

clientSchema = new mongoose.Schema({
  name: String
},{ versionKey: false });

module.exports = mongoose.model("Client", clientSchema);
