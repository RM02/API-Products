const jwt = require("jsonwebtoken");

const config = require('../config/index');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
        return res.status(403).json({
            status: 403,
            msg: 'Acceso denegado'
        })
    }
    try {
        const decoded = jwt.verify(token, config.token_key);
        req.user = decoded;
    } catch (e) {
        return res.status(401).json({
            status: 401,
            msg: 'Token invalido!'
        })
    }
    return next();
}
module.exports = verifyToken;