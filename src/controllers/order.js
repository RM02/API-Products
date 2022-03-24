var Order = require("../models/orders");
var Agenda = require("../models/agenda");

exports.get = async function(req, res) {
    Order.find({}, function(err, data) {
        if (data) {
            res.json({status: 200, result: data})
        }
    })
}

exports.create = async function(req, res) {

    const order = await Order.create({
        status: req.body.status,
        user: req.body.user,
        total: req.body.total
    })
    await order.save()

    req.body.products.forEach(async function (item) {
        const product = await Agenda.findById(item)
        order.products.push(product)
        order.save()
    });

    res.json({status: 200, result: []})
}