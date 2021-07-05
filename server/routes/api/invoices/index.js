const Routes = require('express').Router();
const getAllInvoices = require('./getAllInvoices');
const createInvoice = require('./createInvoice');
const searchInvoices = require('./searchInvoices');
const deleteInvoice = require('./deleteInvoice');
const updateInvoice = require('./updateInvoice');

Routes.get('/',getAllInvoices);
Routes.post('/',createInvoice);
Routes.put('/',updateInvoice);
Routes.get('/search',searchInvoices);
Routes.delete('/',deleteInvoice);


module.exports = Routes