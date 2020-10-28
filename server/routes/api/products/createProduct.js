const Product = require("../../../models/product");
module.exports = async (req, res) => {
  if (!req.user) return res.send({error:"You are not Authorized"});
  let { name } = req.body;
  let product = new Product({name});
  let newProduct = await product.save();
  res.status(200).json(newProduct);
};
