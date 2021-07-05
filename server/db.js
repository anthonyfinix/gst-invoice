const mongoose = require("mongoose");

exports.connect = async function connect() {
  return mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((response) => response)
    .catch((error) => error);
};

exports.disconnect = function disconnect() {
  mongoose.disconnect();
};
