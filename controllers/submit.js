const User = require('../models/User');
const passport = require('passport');

exports.getSubmitPage = (req, res) => {
    user = req.user;
    res.render('submit', { secret: secret });
};

exports.getSecretPage = (req, res) => {
    if (passport.authenticate()) {
        User.find({ "secret": { $ne: null } }, (error, usersFound) => {
            if (error) {
                console.log(error);
            } else {
                passport.authenticate('passport-local-mongoose')(req, res, () => {
                    user = req.user;
                    secret = user.get('secret');
                    res.render('secrets', { usersSecrets: usersFound });
                });
            }
        });
    } else {
        res.redirect('/login');
    }
}


exports.postSubmit = (req, res) => {
    const submittedSecret = req.body.secret;
    if (req.isAuthenticated(req, res)) {
        User.findById(req.user.id, (error, UserFound) => {
            if (error) {
                console.log(error);
            } else {
                UserFound.secret = submittedSecret;
                UserFound.save(function (err) {
                    if (err) console.log('err');
                    res.redirect('/secrets');
                });
            }
        })
    };
};



