const User = require('../models/User');
const passport = require('passport');

exports.getLoginPage = (req, res) => {
    res.render('login');          
};

exports.postLog = (req, res,  ) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    
    console.log(user);

    req.login(user, (error) => {
        if (error) {
            console.log(error);
        } else {
            passport.authenticate("passport-local-mongoose")(user, res, () => {            
                res.redirect('/secrets');               
            });
        
        }
    });
};


