const Routes = require('express').Router();
const getAllClients = require('./getAllClients.js');

Routes.get('/',getAllClients);

module.exports = Routes