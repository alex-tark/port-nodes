var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    login : {
        type: String,
        unique: true,
        required: true,
        default: "username"
    },
    password : {
        type: String,
        required: true,
        default: "defender"
    },
    role : {
        type: Number,
        required: false,
        default: 0
    },
    email : {
        type: String,
        unique: true,
        required: true,
        default: "user@user.ru"
    },
    buff: Buffer
});
 
module.exports = mongoose.model('user', UserSchema);