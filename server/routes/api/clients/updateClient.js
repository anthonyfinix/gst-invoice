const Client = require("../../../models/clients");
const validator = require("../../../util/validation");
module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { _id, name, email } = req.body;
  const { error } = validator.client.validate({ name, email });
  if (error) return res.json({ error: error.details[0].message });
  try{
      await Client.updateOne({ _id }, { $set: { name, email } });
      res.json({msg:"Success"})
  }catch(error){
    res.json({error:error.message})
  }
};
