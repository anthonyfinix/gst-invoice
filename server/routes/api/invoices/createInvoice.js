const Invoice = require("../../../models/invoice");
module.exports = async (req, res) => {
  if (!req.user) return res.send({error:"You are not Authorized"});
  let { name } = req.body;
  let invoice = new Invoice({name});
  let newInvoice = await invoice.save();
  res.status(200).json(newInvoice);
};
