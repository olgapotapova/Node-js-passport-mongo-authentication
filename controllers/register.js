const User = require('../models/User');
const passport = require('passport');

exports.getRegisterPage = (req, res) => {
    res.render('register');
};


exports.postRegister = (req, res) => {
    User.register(new User({ username: req.body.username }),
        req.body.password, (err, user) => {
            if (err) {
                res.redirect('/home');
            }
            else {
                passport.authenticate('passport-local-mongoose')(req, res, () => {
                    res.redirect('/login');
                });
            }
        });
};

