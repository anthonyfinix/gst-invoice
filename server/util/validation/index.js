const joi = require("@hapi/joi");

const name = joi.string();
const username = joi.string().min(3).max(15);
const password = joi.string().min(3).max(40);
const email = joi.string().email();

module.exports = {
  login: joi.object({
    username: username.required(),
    password: password.required(),
  }),
  register: joi.object({
    name: name.required(),
    username: username.required(),
    email: email.required(),
    password: password.required(),
  }),
  username: username,
  password: password,
};
