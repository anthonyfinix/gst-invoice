const Client = require("../../../models/clients");
module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { q } = req.query;
  let clients = await Client.find({ name: { $regex: q, $options: "i" } });
  res.status(200).json(clients);
};
