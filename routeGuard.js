const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('unauthorized');

    try {
        const verified = jwt.verify(token, 'secretKey');
        // if(verified.exp < Date.now().valueOf() /1000) return res.send('token expired please login')
        req.userToken = verified;
        next();
    } catch (err) {
        res.status(401).send('unauthorized')
    }

}