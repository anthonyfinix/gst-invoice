const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongooose');
const bcrypt = require('bcrypt');
const User = require('../modals/user');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, email, password, done) => {
            User.findOne({ username: username })
                .catch(err => console.log(err))
                .then(user => {
                    if (!user) return done(null, false,{message: 'no user found'})
                    bcrypt.compare(password, user.password, (err, isMacth) => {
                        if (err) throw err;
                        if (!isMacth) return done(null, false,{message: 'Password Incorrect'})
                        if (isMacth) return done(null, user)
                    })
                })
        })
    )
}