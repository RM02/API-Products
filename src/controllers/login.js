var User = require("../models/users");

exports.login = async function (req, res) {
    const { email, password } = req.body;

    User.findOne({email: email, password: password}, function(req, user) {
        if (user) {
            res.status(200).json({status: 200, result: user})
        }
        if (!user) {
            res.status(400).json({status: 400, result: "User not found!"})
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


exports.edit_user = function(req, res) {

    User.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name } },
    function(err, user) {
        if (err) {
            res.json({status: 500})
        } 
        res.json({status: 200, result: user})
    })
}

exports.register = async function(req, res) {

    const { 
        name,
        last_name,
        dayOfBirth,
        phone,
        email,
        address,
        blood_type,
        weight,
        height,
        insurance_company,
        policy_number,
        insurance_expiry_date,
        password
    } = req.body;

    const user = await new User({
        name,
        last_name,
        dayOfBirth,
        phone,
        email,
        address,
        blood_type,
        weight,
        height,
        insurance_company,
        policy_number,
        insurance_expiry_date,
        password
    })
    await user.save(function(err, data) {
        if (err) {
            res.json({status: 500, result: err})
        }
        res.json({result: data})
    })
}