var User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

exports.login = async function (req, res) {

    const EXPIRE_TOKEN = "2h"

    const { email, password } = req.body;        

    if (!(email && password)) {
        res.status(400).json({
            msg: 'Invalid data'
        });
    }
    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {

        const token = jwt.sign({ user }, process.env.TOKEN_KEY, { expiresIn: EXPIRE_TOKEN });
        
        user.token = token;

        res.status(200).json({
            "expires_in": EXPIRE_TOKEN,
            "access_token": user.token
        });
    } else {
        res.status(401).json({
            "status": 401,
            "msg": "Invalid credential"
        });
    }

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

    const { email, password } = req.body;

    if (!(email && password)) {
        res.status(400).json({msg: "Los datos son requeridos"});
    }
    const oldUser = await User.findOne({ email });

    if (oldUser) {
        return res.status(409).json({msg: "El usuario ya exite!"});
    }
    
    encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await User.create({
        email: email.toLowerCase(),
        password: encryptedPassword,
    });

    const token = jwt.sign(
        { user },
            process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );
    // save user token
    user.token = token;
    res.status(201).json({
        status: 200,
        data: user
    });

}