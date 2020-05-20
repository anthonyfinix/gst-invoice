const express = require('express');
const router = express.Router();
const verify = require('../routeGuard')
const Client = require('../modals/clients');
const Joi = require('@hapi/joi');
const { clientSchema, objectId, clientName, clientEmail, clientAddress, clientContactNumber, clientCompany } = require('../validate');

// VIEW ALL AND PARTIAL SEARCH
router.get('/',verify, (req, res) => {
    const { q } = req.query;
    if (q) {
        Client.find({ name: { $regex: new RegExp(`^${q}`, 'i') } }, (err, client) => {
            if (err) return res.send(err);
            if (!client) res.status(404).send('user not found')
            res.send(client)
        });
    } else {
        Client.find({}, (err, clients) => {
            if (err) {
                res.status(500).send(err)
            } else if (clients) {
                res.send(clients)
            } else {
                res.status(500).send(err)
            };

        });
    }
});

// GET SINGLE
router.get('/:id',verify, (req, res) => {
    const { id } = req.params;
    const { value, error } = objectId.validate(id);
    if (error) return res.status(400).json({ type: error.details[0].type, message: error.details[0].message })
    Client.find({ _id: objectId }, (err, client) => {
        if (err) return res.send(err)
        if (!client) return res.status(404).send('User not found');
        res.send(client)
    });
});

// ADD NEW
router.post('/',verify, (req, res) => {
    const { name, email, company, address, contactNumber } = req.body;
    const { value, error } = clientSchema.validate({ name, email, company, address, contactNumber });
    if (error) return res.status(401).json({ type: error.details[0].type, message: error.details[0].message });
    Client({ name, email, company, address, contactNumber }).save()
        .then(client => res.json(client))
        .catch(err => res.json({ message: err }));
});

// UPDATE
router.put('/:id',verify, (req, res) => {
    const { id } = req.body;
    const { value, error } = objectId.validate(id);
    if (error) return res.status(401).json({ type: error.details[0].type, message: error.details[0].message });
    Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) return res.send(err);
        if (!client) return res.status(404).send('user not found');
        if (req.body.name) {
            const { value, error } = clientName.validate(id);
            if (error) return res.status(401).json({ type: error.details[0].type, message: error.details[0].message });
            client.name = req.body.name;
        }
        if (req.body.email) {
            const { value, error } = clientEmail.validate(id);
            if (error) return res.status(401).json({ type: error.details[0].type, message: error.details[0].message });
            client.email = req.body.email;
        }
        if (req.body.company) {
            const { value, error } = clientCompany.validate(id);
            if (error) return res.status(401).json({ type: error.details[0].type, message: error.details[0].message });
            client.company = req.body.company;
        }
        if (req.body.company) {
            const { value, error } = clientAddress.validate(id);
            if (error) return res.status(401).json({ type: error.details[0].type, message: error.details[0].message });
            client.address = req.body.address;
        }
        if (req.body.contactNumber) {
            const { value, error } = clientContactNumber.validate(id);
            if (error) return res.status(401).json({ type: error.details[0].type, message: error.details[0].message });
            client.contactNumber = req.body.contactNumber;
        }
        client.save()
            .catch(err => res.status(500).send(err))
            .then(client => res.send(client));
    });
});

// DELETE
router.delete('/:id',verify, (req, res) => {
    const { id } = req.body;
    const { value, error } = objectId.validate(id);
    if (error) return res.status(401).json({ type: error.details[0].type, message: error.details[0].message });
    Client.findOne({ _id: id }, (err, client) => {
        if (err) return res.send(err);
        if (!client) return res.sendStatus(404).send('user not found')
        client.remove()
            .catch(err => res.status(500).send(err))
            .then(deletedClient => res.send(deletedClient))
    });
});

module.exports = router;