const Client = require('../../../models/clients')
module.exports = async (req, res) => {
    if(!req.user) return res.json({error:'You are not Authorized'})
    let Clients = await Client.find({});
    res.status(200).json(Clients)
};
