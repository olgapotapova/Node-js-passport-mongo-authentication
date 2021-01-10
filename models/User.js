const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const encrypt = require('mongoose-encryption');

const userSchema = new Schema({
    user: {
    type: String, // Unique Nickname for signup
    unique: true
    }, 
    password:
    {
        type: String, // Password
        select: true
    },
    secret:
    {
        type: String, // Password
        select: true
    },
});
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);
module.exports =  User;
