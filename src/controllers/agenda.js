var Agenda = require('../models/agenda');

exports.get_list = async function(req, res) {
    if (req.params) {
        params = req.params
    }
    const data = await Agenda.find({})
    res.json({
        status: 200,
        result: data
    })
}

exports.delete = async function(req, res) {

    await Agenda.deleteOne({"_id": req.params.id})

    res.json({
        status: 200,
        msg: "Deleted",
        result: []
    })
}

exports.create = async function(req, res) {

    const { subject, patient, deparment, description, created_by } = req.body

    var agenda = await new Agenda({ subject, patient, deparment, description, created_by })
    
    await agenda.save()
    
    res.json({status: 200, result: "Agenda creada exitosamente!"})
}
