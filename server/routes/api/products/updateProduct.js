const Product = require("../../../models/product");
const validator = require("../../../util/validation");
module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { _id, name, price } = req.body;
  const { error } = validator.product.validate({ name, price });
  if (error) return res.json({ error: error.details[0].message });
  try{
      await Product.updateOne({ _id }, { $set: { name, price } });
      res.json(res.json({msg:"Success"}))
  }catch(error){
    res.json({error:error.message})
  }
};
