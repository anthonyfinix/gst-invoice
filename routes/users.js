const express = require('express');
const router = express.Router();
const User = require('../modals/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
router.delete('/:id', (req, res) => {
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
    const { values, error } = loginSchema.validate({ username, password });
    if (error) return res.status(400).send(error.details[0].message);
    User.findOne({ username })
        .catch(err => {
            res.status(500).res.send('there is some error')
            console.log(err)
        })
        .then(user => {
            if (!user) return res.send('no user found!')
            bcrypt.compare(password, user.password, (err, isMatched) => {
                if (err) return res.status(500).send('there is some error encoutered');
                if (!isMatched) return res.send('Password does not match');
                const token = jwt.sign({userId: user._id},'secretKey');
                return res.header('auth-token',token).send({userId: user._id,username: user.username,email:user.email,name: user.name})
            })

        })
});


module.exports = router;