const Routes = require('express').Router();
const getAllProducts = require('./getAllProducts');
const createProduct = require('./createProduct');
const searchProducts = require('./searchProducts');
const deleteProduct = require('./deleteProduct')

Routes.get('/',getAllProducts);
Routes.post('/',createProduct);
Routes.get('/search',searchProducts);
Routes.delete('/',deleteProduct);

module.exports = Routes