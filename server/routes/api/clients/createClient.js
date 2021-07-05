const Client = require("../../../models/clients");
const validator = require("../../../util/validation");
module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { name, email } = req.body;
  const { error } = validator.client.validate({ name, email });
  if (error) return res.json({ error: error.details[0].message });
  let client = new Client({ name, email });
  let newClient = await client.save();
  res.status(200).json(newClient);
};
