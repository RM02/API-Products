var mongoose = require('mongoose');
//var Article = require('../models/articles');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    status : String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    total : Number,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema); 
