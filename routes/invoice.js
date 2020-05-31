const express = require("express");
const router = express.Router();
const Invoice = require("../modals/invoice");
const Joi = require("@hapi/joi");
const verify = require("../routeGuard");
const {
  objectId,
  Name,
  Email,
  Date,
  Status,
  Number,
  invoiceSchema,
} = require("../validate");
// VIEW ALL
router.get("/", verify, (req, res) => {
  Invoice.find({}, (err, invoices) => {
    if (err) {
      res.send(err);
    } else {
      res.send(invoices);
    }
  });
});
// VIEW ONE
router.get("/:id", verify, (req, res) => {
  const { id } = req.params;
  const { value, error } = objectId.validate(id);
  if (error)
    return res
      .status(400)
      .json({ type: error.details[0].type, message: error.details[0].message });
  Invoice.find({ _id: id }, (err, invoices) => {
    if (err) return res.status(500).send(err);
    res.send(invoices);
  });
});

// ADD NEW
router.post("/", verify, (req, res) => {
  // const { client, products, created, dueDate, status, total } = req.body;
  // if (invoiceSchema.validate({
  //     name: client.name,
  //     id: client.id,
  //     created: created,
  //     dueDate: dueDate,
  //     status: status,
  //     total: total
  // }).error) return res.status(400).json({ type: error.details[0].type, message: error.details[0].message })
  let newInvoice = new Invoice({
    client: {
      name: req.body.client.name,
      id: req.body.client.id,
    },
    products: req.body.products,
    created: req.body.created,
    dueDate: req.body.dueDate,
    status: req.body.status,
    total: req.body.total,
  });
  newInvoice
    .save()
    .then((invoice) => res.json(invoice))
    .catch((err) => res.json({ message: err }));
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

router.delete("/:id", verify, (req, res) => {
  Invoice.findOne({ _id: req.params.id }, (err, invoice) => {
    if (err) {
      res.send(err);
    } else {
      invoice.remove().then((deletedInvoice) => res.send(deletedInvoice));
    }
  });
});

module.exports = router;
