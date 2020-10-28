const Invoice = require('../../../models/invoice')
module.exports = async (req, res) => {
    if(!req.user) return res.json({error:'You are not Authorized'})
    let Invoices = await Invoice.find({});
    res.status(200).json(Invoices)
};
