const express = require('express');
const router = express.Router();
const Client = require('../modals/clients');

// VIEW ALL
router.get('/', (req, res) => {
    Client.find({}, (err, clients) => {
        if (err) {
            res.send(err)
        } else {
            res.send(clients)
        };

    });
});

// GET SINGLE
router.get('/:id', (req, res) => {
    Client.find({ _id: req.params.id }, (err, client) => {
        if (err) {
            res.send(err)
        } else if (!client) {
            res.status(404).send('user not found')
        } else if (client) {
            res.send(client)
        } else {
            res.status(500).send('Error')
        }
    });
});

// ADD NEW
router.post('/', (req, res) => {
    let newClient = new Client({
        name: req.body.name,
        company: req.body.company,
        address: req.body.address,
        contactNumber: req.body.contactNumber,
    });
    newClient.save()
        .then(client => res.json(client))
        .catch(err => res.json({ message: err }));
});

// UPDATE
router.put('/:id', (req, res) => {
    Client.findOne({ _id: req.params.id }, (err, oldClient) => {
        if (err) {
            res.send(err);
        } else if (!oldClient) {
            res.status(404).send('user not found')
        } else if (oldClient) {
            if (req.body.name) {
                oldClient.name = req.body.name;
            }
            if (req.body.company) {
                oldClient.company = req.body.company;
            }
            oldClient.save().then(client => res.send(client));
        } else {
            res.status(500).send(error);
        }
    });
});

// DELETE
router.delete('/:id', (req, res) => {
    Client.findOne({ _id: req.params.id }, (err, client) => {
        if (err) {
            res.send(err)
        } else if (!client) {
            res.send(404).send('user not found')
        } else if (client) {
            client.remove().then(deletedClient => res.send(deletedClient))
        } else {
            res.status(500).send('Error')
        }
    });
});
// SEARCH WITH NAME
router.get('/search/:name', (req, res) => {
    Client.find({ name: { $regex: req.params.name } }, (err, client) => {
        if (err) {
            res.send(err)
        } else if (!client) {
            res.status(404).send('user not found')
        } else if (client) {
            res.send(client)
        } else {
            res.status(500).send('Error')
        }
    });
});

module.exports = router;