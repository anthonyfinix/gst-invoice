const Routes = require('express').Router();
const getAllProducts = require('./getAllProducts');

Routes.get('/',getAllProducts);

module.exports = Routes