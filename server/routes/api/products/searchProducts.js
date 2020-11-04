const Product = require("../../../models/product");
module.exports = async (req, res) => {
  if (!req.user) return res.send({ error: "You are not Authorized" });
  let { q } = req.query;
  let products = await Product.find({ name: { $regex: q, $options: "i" } });
  res.status(200).json(products);
};
