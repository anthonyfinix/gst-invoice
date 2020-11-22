const Routes = require('express').Router();
const getAllClients = require('./getAllClients.js');
const createClient = require('./createClient');
const deleteClient = require('./deleteClients');
const searchClient = require('./searchClients');
const updateClient = require('./updateClient');

Routes.get('/',getAllClients);
Routes.post('/',createClient);
Routes.put('/',updateClient);
Routes.get('/search',searchClient); 
Routes.delete('/',deleteClient);

module.exports = Routes