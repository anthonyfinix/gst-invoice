const mongoose = require('mongoose');

let clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: {
            validator: function (v) {
                return /\b[A-Za-z0-9]+@[a-z]+\.[a-z]{1,5}\b/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        },
        required: true,
    },
    company: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: {
        type: String,
        validate: {
            validator: function (v) {
                return /\b\d{10}\b/.test(v)
            },
            message: props => `${props} is not a valid mobile number!`
        }
    }
})

let client = module.exports = mongoose.model('client', clientSchema);