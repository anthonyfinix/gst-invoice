const Invoice = require("../../../models/invoice");
module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { q } = req.query;
  let invoices = await Invoice.find({ recipient: { $regex: q, $options: "i" } });
  res.status(200).json(invoices);
};
