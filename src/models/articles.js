var mongoose = require('mongoose');
        
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    name : String,
    description : String,
    category : String,
    price : Number,
    filename: String,
    created_at: { type: Date, default: Date.now }
});


// by default the collection created in the db would be the first parameter we use (or the plural of it)    
module.exports = mongoose.model('Article', ArticleSchema); 

