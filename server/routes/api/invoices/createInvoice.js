const Invoice = require("../../../models/invoice");
module.exports = async (req, res) => {
  if (!req.user) return res.send({error:"You are not Authorized"});
  let { recipient } = req.body;
  let invoice = new Invoice({recipient});
  let newInvoice = await invoice.save();
  res.status(200).json(newInvoice);
};
