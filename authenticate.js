const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

passport.serializeUser(User.serializeUser());
passport.use(new LocalStrategy(User.authenticate()));
passport.deserializeUser(User.deserializeUser());

