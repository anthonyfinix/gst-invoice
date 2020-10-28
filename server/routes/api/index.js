const Routes = require('express').Router();
const products = require('./products');
const clients = require('./clients');
const invoices = require('./invoices');


Routes.use('/products',products);
Routes.use('/clients',clients);
Routes.use('/invoices',invoices);

module.exports = Routes