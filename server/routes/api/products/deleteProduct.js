const Product = require("../../../models/product");
module.exports = async (req, res) => {
  if (!req.user) return res.json({ error: "You are not Authorized" });
  let { id } = req.query;
  let product = await Product.findOne({ _id: id });
  if (!product) return res.json({ error: "No Product Found" });
  await product.remove();
  res.json(product);
};
