const Routes = require('express').Router();
const getAllInvoices = require('./getAllInvoices');
const createInvoice = require('./createInvoice');
const deleteInvoice = require('./deleteInvoice');

Routes.get('/',getAllInvoices);
Routes.post('/',createInvoice);
Routes.delete('/',deleteInvoice);


module.exports = Routes