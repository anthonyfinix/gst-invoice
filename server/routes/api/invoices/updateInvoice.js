const Product = require("../../../models/clients");
const validator = require("../../../util/validation");
module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { _id, recipient, products, total, draft } = req.body;
  const { error } = validator.name.validate(_id);
  if (error) return res.json({ error: error.details[0].message });
  let invoice = await Product.findOne({ _id });
  if (recipient) invoice.recipient = recipient;
  if (products) invoice.products = products;
  if (total) invoice.total = total;
  if (draft) invoice.draft = draft;
  if (!draft) {
    invoice.invoiceNo = await generateInvoiceNumber(req.user);
    invoice.issuedOn = Date.now();
  }
  let update = invoice.save();
  res.json({ msg: "success", details: update });
};
