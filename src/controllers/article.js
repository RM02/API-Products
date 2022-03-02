var Article = require('../models/articles');

exports.get_list = async function(req, res) {
    if (req.params) {
        params = req.params
    }
    const data = await Article.find({})
    res.json({
        status: 200,
        result: data
    })
}

exports.delete = async function(req, res) {

    await Article.deleteOne({"_id": req.params.id})

    res.json({
        status: 200,
        msg: "Deleted",
        result: []
    })
}

exports.create = async function(req, res) {

    const { name, description, price, category } = req.body

    var article = new Article({name, description, price, category})
    
    await article.save()
    
    res.json({status: 200, result: "Article created!"})
}
