const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }, 
    designation: {
        type: String
    },
    mobileNo: {
        type: Number
    }
    
})

mongoose.plugin(uniqueValidator, {message: 'This email is already in use.'});
module.exports = mongoose.model('User', userSchema);