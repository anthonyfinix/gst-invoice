const express = require('express');
const router = express.Router();
const User = require('../modals/user');
const bcrypt = require('bcrypt');

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
    const user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            new User({ ...user }).save()
                .then(user => res.json(user))
                .catch(err => res.json({ message: err }));
        })
    });
})

router.post('/login', (req, res, next) => {
    res.send('login')
});


module.exports = router;