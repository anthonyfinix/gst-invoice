const jwt = require("jsonwebtoken");

module.exports = {
  verify: (token) => {
    try {
      return jwt.verify(token,process.env.JWT_SECRET);
    } catch (error) {
      return error.message;
    }
  },
  payload: (token) => {
    return jwt.decode(token);
  },
};
