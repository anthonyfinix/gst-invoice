const Invoice = require('../../../models/invoice')
module.exports = async (req, res) => {
    if(!req.user) return res.status(401).send('You are not Authorized')
    let Invoices = await Invoice.find({});
    res.status(200).json(Invoices)
};
