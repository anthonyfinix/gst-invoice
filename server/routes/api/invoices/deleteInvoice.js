const Invoice = require("../../../models/invoice");
module.exports = async (req, res) => {
  if (!req.user) return res.json({ error: "You are not Authorized" });
  let { id } = req.body;
  let invoice = await Invoice.findOne({ _id: id });
  if (!invoice) return res.json({ error: "No Invoice Found" });
  await invoice.remove();
  res.json(invoice);
};
