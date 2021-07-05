const Invoice = require("../../../models/invoice");
const User = require("../../../models/user");
const validator = require("../../../util/validation/index");
const generateInvoiceNumber = require('../../../util/generateInvoiceNo');

module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { recipient, products, total, draft } = req.body;
  // validate
  let { error } = validator.invoice.validate({recipient,products,total,draft});
  // handle validation error
  if (error) return res.json({ error: error.details[0].message });

  let invoice = new Invoice({recipient,products,total,draft})
  if(!draft) {
    let invoiceNo = await generateInvoiceNumber(req.user);
    let issuedOn = Date.now();
    invoice.invoiceNo = invoiceNo;
    invoice.issuedOn = issuedOn;
    await User.updateOne({ username: req.user.username },{ $inc: { invoiceIssuedCount: 1 } });
  }
  let newInvoice = await invoice.save();
  res.json(newInvoice);
};
