const jwt = require("jsonwebtoken");

module.exports = {
  verify: (token, secret) => {
    let response = { payload: undefined, error: undefined };
    try {
      response.payload = jwt.verify(token, secret);
    } catch (error) {
      response.error = error;
    }
    return response;
  },
  getPayload: (token) => {
    return jwt.decode(token);
  },
  new: (payload, secret, options) => {
    return jwt.sign(payload, secret, options);
  },
};
