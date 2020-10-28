const Client = require('../../../models/clients')
module.exports = async (req, res) => {
    if(!req.user) return res.status(401).send('You are not Authorized')
    let Clients = await Client.find({});
    res.status(200).json(Clients)
};
