var User = require("../models/users");

exports.login = async function (req, res) {
    const { email, password } = req.body;

    User.findOne({email: email, password: password}, function(req, user) {
        if (user) {
            res.json({status: 200, result: user})
        }
        if (!user) {
            res.json({status: 201, result: "User not found!"})
        }

    })

}

exports.get_users = async function(req, res) {
    User.find({}, function(err, data) {
        if (data) {
            res.json({status: 200, result: data})
        }
    })
}

exports.delete_user = async function(req, res) {
    User.deleteOne({ _id: req.body.id }, function(err, data) {
        if (!err) {
            res.json({status: 200, result: "User deleted"})
        }
    })
}


exports.register = async function(req, res) {

    const { name, last_name, email, password, phone } = req.body;

    const user = new User({name, last_name, email, password, phone})
    await user.save(function(err, data) {
        if (err) {
            res.json({status: 500, result: err})
        }
        res.json({result: data})
    })
}