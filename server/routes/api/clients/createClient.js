const Client = require("../../../models/clients");
module.exports = async (req, res) => {
  if (!req.user) return res.send({error:"You are not Authorized"});
  let { name } = req.body;
  let client = new Client({name});
  let newClient = await client.save();
  res.status(200).json(newClient);
};
