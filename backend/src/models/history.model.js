let mongoose  = require( 'mongoose');
let Schema =  mongoose.Schema;
let historySchema = new Schema({
    id: {type: Number, required: true},
    temperature: {type: Number, required: true},
    countryCode: {type: String, required: true},
    created: {type : Date, default: Date.now}
});
module.exports = mongoose.model('History', historySchema)