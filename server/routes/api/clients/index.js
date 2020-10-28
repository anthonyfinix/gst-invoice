const Routes = require('express').Router();
const getAllClients = require('./getAllClients.js');
const createClient = require('./createClient')
const deleteClient = require('./deleteClients')

Routes.get('/',getAllClients);
Routes.post('/',createClient);
Routes.delete('/',deleteClient);

module.exports = Routes