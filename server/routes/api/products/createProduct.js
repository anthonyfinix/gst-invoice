const Product = require("../../../models/product");
const validator = require("../../../util/validation");
module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { name, price } = req.body;
  const { error } = validator.product.validate({ name, price });
  if (error) return res.json({ error: error.details[0].message });
  let product = new Product({ name,price });
  let newProduct = await product.save();
  res.status(200).json(newProduct);
};
