let mongoose  = require( 'mongoose');
let Schema =  mongoose.Schema;
let historySchema = new Schema({
    id: {type: Number, required: true},
    temperature: {type: Number, required: true},
    countryCode: {type: String, required: true},
    username: {type: String, required: true},
});
historySchema.set('timestamps', true); 
module.exports = mongoose.model('History', historySchema)