const express = require('express');
const router = express.Router();
const User = require('../modals/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verify = require('../routeGuard');

const { registrationSchema, loginSchema } = require('../validate');

router.get('/', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.send(err)
        } else {
            res.send(users)
        };

    });
})
router.get('/:username', verify, (req, res) => {
    const userid = req.userToken.userId;
    // res.send(req.userToken.userId)
    User.findOne({ _id: userid }, (err, user) => {
        if (err) return res.json({'error': err })
        res.json({username: user.username,name:user.name,email:user.email})
    })
})

router.delete('/:id', verify, (req, res) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            res.send(err)
        } else {
            user.remove().then(deletedUser => res.send(deletedUser))
        }
    });
});

router.post('/register', (req, res) => {
    const { name, username, email, password } = req.body;
    const { value, error } = registrationSchema.validate({ name, username, password, email });
    if (error) res.status(400).send(error.details[0].message);
    try {
        hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    } catch (err) {
        throw err
    }
    new User({ name, username, email, password: hashedPassword }).save()
        .then(newUser => res.json(newUser))
        .catch(err => res.json({ message: err }))
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const { value, error } = loginSchema.validate({ username, password });
    if (error) return res.status(400).json({ error: error.details[0].message });
    User.findOne({ username })
        .catch(err => {
            res.status(500).res.json({ "error": 'there is some error' })
        })
        .then(user => {
            if (!user) return res.json({ "error": 'no user found!' })
            bcrypt.compare(password, user.password, (err, isMatched) => {
                if (err) return res.status(500).json({ 'error': 'there is some error encoutered' });
                if (!isMatched) return res.json({ "error": 'Password does not match' });
                const token = jwt.sign({ userId: user._id }, 'secretKey');
                let userDetails = {
                    userId: user._id,
                    username: user.username,
                    email: user.email,
                    name: user.name
                }
                return res.set({
                    'auth-token': token,
                    'Access-Control-Expose-Headers': 'auth-token'
                }).json({ ...userDetails })
            })

        })
});


module.exports = router;