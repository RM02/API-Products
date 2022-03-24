var mongoose = require('mongoose');
        
var Schema = mongoose.Schema;

var AgendaSchema = new Schema({
    subject : String,
    patient : String,
    deparment: String,
    description : String,
    created_by: String,
    created_at: { type: Date, default: Date.now }
});


// by default the collection created in the db would be the first parameter we use (or the plural of it)    
module.exports = mongoose.model('Agenda', AgendaSchema); 

