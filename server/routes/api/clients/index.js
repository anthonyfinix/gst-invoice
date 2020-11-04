const Routes = require('express').Router();
const getAllClients = require('./getAllClients.js');
const createClient = require('./createClient');
const deleteClient = require('./deleteClients');
const searchClient = require('./searchClients');

Routes.get('/',getAllClients);
Routes.post('/',createClient);
Routes.get('/search',searchClient); 
Routes.delete('/',deleteClient);

module.exports = Routes