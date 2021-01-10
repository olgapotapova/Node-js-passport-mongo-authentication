const express = require("express");
const router = express.Router();
const passport = require('passport');
const login_controller = require("../controllers/login.js");
const register_controller = require("../controllers/register.js");
const home_controller = require("../controllers/home.js");
const secret_controller = require("../controllers/submit.js");
const submit_controller = require("../controllers/submit.js");
const authenticate = require('../authenticate');

router.get('/login',login_controller.getLoginPage);
router.post('/login', passport.authenticate("local"), login_controller.postLog);

router.get('/register',register_controller.getRegisterPage);
router.post('/register', register_controller.postRegister);

router.get('/submit', submit_controller.getSubmitPage);
router.post('/submit',  submit_controller.postSubmit);

router.get('/home', home_controller.getHomePage);

router.get('/secrets', secret_controller.getSecretPage);


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


module.exports = router;