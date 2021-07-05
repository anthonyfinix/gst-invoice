const Client = require("../../../models/clients");
module.exports = async (req, res) => {
  if (!req.user) return res.json({ error: "You are not Authorized" });
  let { id } = req.query;
  let client = await Client.findOne({ _id: id });
  if (!client) return res.json({ error: "No Client Found" });
  await client.remove();
  res.json(client);
};
