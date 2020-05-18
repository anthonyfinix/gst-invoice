const Joi = require('@hapi/joi');

const name = Joi.string().min(3).max(30).required();
const password = Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')).required();
const username = Joi.string().alphanum().min(3).max(30).required();
const email = Joi.string().email();

const registrationSchema = Joi.object({name,username,password,email})
const loginSchema = Joi.object({username,password})
module.exports = {
    registrationSchema,
    loginSchema
}