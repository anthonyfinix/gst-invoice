const Joi = require("@hapi/joi");
const joi = require("@hapi/joi");

const name = joi.string();
const username = joi.string().min(3).max(15);
const password = joi.string().min(3).max(40);
const email = joi.string().email();
const date = joi.date();
const number = joi.number();

const login = joi.object({
  username: username.required(),
  password: password.required(),
});
const register = joi.object({
  name: name.required(),
  username: username.required(),
  email: email.required(),
  password: password.required(),
});
const client = joi.object({
  name: name.required(),
  email: email.required(),
});
const product = joi.object({
  name: name.required(),
  price: number.required(),
});
const invoice = joi.object({
  invoiceNo: date,
  recipient: client.required(),
  products: joi
    .array()
    .items(
      joi.object().keys({
        _id: name,
        name: name.required(),
        price: joi.number().required(),
        qty: number.required(),
        discount: number,
        discountPercentage: number,
      })
    )
    .required(),
  issuedOn: date,
  total: number.required(),
  draft: joi.boolean().required(),
});

module.exports = {
  login,
  register,
  client,
  product,
  invoice,
  username: username,
  password: password,
  name: name,
  email: email,
};
