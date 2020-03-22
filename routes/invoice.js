const express = require('express');
const router = express.Router();
const Invoice = require('../modals/invoice');
// VIEW ALL
router.get('/', (req, res) => {
    Invoice.find({}, (err, invoices) => {
        if (err) {
            res.send(err)
        } else {
            res.send(invoices)
        };

    });
});

// ADD NEW
router.post('/', (req, res) => {
    let newInvoice = new Invoice({
        client:{
            name :req.body.client.name,
            id: req.body.client.id,
        },
        productsId: req.body.productsId
    });
    newInvoice.save()
        .then(invoice => res.json(invoice))
        .catch(err => res.json({ message: err }));
});

// router.put('/:id', (req, res) => {
//     Invoice.findOne({ _id: req.params.id }, (err, oldInvoice) => {
//         if (err) { 
//             res.send(err)
//         } else {
//             if (req.body.clientId) {
//                 oldInvoice.clientId = req.body.clientId;
//             }
//             if (req.body.productsId) {
//                 oldInvoice.price = req.body.price;
//             }
//             oldInvoice.save().then(invoice => res.send(invoice));
//         }
//     });
// });

router.delete('/:id', (req, res) => {
    Invoice.findOne({ _id: req.params.id }, (err, invoice) => {
        if (err) {
            res.send(err)
        } else {
            invoice.remove().then(deletedInvoice => res.send(deletedInvoice))
        }
    });
});


module.exports = router;