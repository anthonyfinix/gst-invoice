const Joi = require('@hapi/joi');

const objectId = Joi.string();
const Name = Joi.string().min(1).max(30);
const Date = Joi.date().required();
const Status = Joi.boolean().required();
const Number = Joi.number().required();
const Password = Joi.string().pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$')).required();
const Username = Joi.string().alphanum().min(3).max(30).required();
const Email = Joi.string().email();
const ContactNumber = Joi.string().min().max(30);
const Address = Joi.string().min().max(30);

const registrationSchema = Joi.object({ name: Name, username: Username, password: Password, email: Email }).required();
const loginSchema = Joi.object({ username: Username, password: Password }).required();
const invoiceSchema = Joi.object({ name: Name, id: objectId, created: Date, dueDate: Date, status: Status, total: Number }).required();
const clientSchema = Joi.object({ name: Name, email: Email, company: Name, address: Address, contactNumber: ContactNumber }).required();

module.exports = {
    objectId,
    Name,
    Date,
    Number,
    Password,
    Username,
    Email,
    Address,
    ContactNumber,
    registrationSchema,
    loginSchema,
    clientSchema,
    invoiceSchema,
}