const Routes = require('express').Router();
const getAllProducts = require('./getAllProducts');
const createProduct = require('./createProduct');
const deleteProduct = require('./deleteProduct')

Routes.get('/',getAllProducts);
Routes.post('/',createProduct);
Routes.delete('/',deleteProduct);

module.exports = Routes