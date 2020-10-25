module.exports = (req, res) => {
    if(!req.user) return res.status(401).send('You are not Authorized')
    res.status(200).send('will get all products')
};
