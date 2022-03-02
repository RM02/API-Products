var mongoose = require('mongoose');
        
var Schema = mongoose.Schema;

var User = new Schema({
    name: String,
    last_name: String,
    phone: String,
    email: String,
    address: String,
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
