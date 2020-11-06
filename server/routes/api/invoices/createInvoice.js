const Invoice = require("../../../models/invoice");
const validator = require("../../../util/validation/index");

module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { invoiceNo, recipient, products, issuedOn, total, draft } = req.body;
  let { error } = validator.invoice.validate({
    invoiceNo,
    recipient,
    products,
    issuedOn,
    total,
    draft,
  });
  if (error) return res.json({error:error.details[0].message});
  let invoice = new Invoice({ invoiceNo, recipient, products, issuedOn, total, draft });
  let newInvoice = await invoice.save();
  res.status(200).json(newInvoice);
};
