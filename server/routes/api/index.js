const Routes = require('express').Router();
const products = require('./products');

Routes.use('/products',products);

module.exports = Routes