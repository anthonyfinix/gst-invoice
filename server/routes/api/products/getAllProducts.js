const Product = require('../../../models/product')
module.exports = async (req, res) => {
    if(!req.user) return res.json({error:'You are not Authorized'})
    let Products = await Product.find({});
    res.status(200).json(Products)
};
