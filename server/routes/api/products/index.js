const Routes = require('express').Router();
const getAllProducts = require('./getAllProducts');
const createProduct = require('./createProduct');
const searchProducts = require('./searchProducts');
const deleteProduct = require('./deleteProduct');
const updateProduct = require('./updateProduct')

Routes.get('/',getAllProducts);
Routes.post('/',createProduct);
Routes.put('/',updateProduct)
Routes.get('/search',searchProducts);
Routes.delete('/',deleteProduct);
module.exports = Routes