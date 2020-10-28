const Routes = require('express').Router();
const getAllInvoices = require('./getAllInvoices');

Routes.get('/',getAllInvoices);

module.exports = Routes