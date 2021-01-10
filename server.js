require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const encrypt = require('mongoose-encryption');
const passport = require('passport');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//initialize session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(`mongodb://localhost:27017/secretDB`, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema;

userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ['password'] });

const homePage = require('./routes/rout');
const loginPage = require('./routes/rout');
const registerPage = require('./routes/rout');
const secretsPage = require('./routes/rout');
const submitPage = require('./routes/rout');

app.use(homePage);
app.use(loginPage);
app.use(registerPage);
app.use(secretsPage);
app.use(submitPage);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})