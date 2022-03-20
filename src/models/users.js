var mongoose = require('mongoose');
        
var Schema = mongoose.Schema;

var User = new Schema({
    name: String,
    last_name: String,
    dayOfBirth: String,
    phone: String,
    email: String,
    address: String,
    blood_type: String,
    weight: String,
    height: String,
    insurance_company: String,
    policy_number: String,
    insurance_expiry_date: String,
    password: String,
    created_at: { type: Date, default: Date.now }
})

User.method.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = mongoose.model('User', User)
