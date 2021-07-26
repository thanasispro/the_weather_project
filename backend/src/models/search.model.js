let mongoose  = require( 'mongoose');
let Schema =  mongoose.Schema;
let searchSchema = new Schema({
    id: {type: Number, required: true},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    countryCode: {type: String, required: true},
    username: {type: String, required: true},
});
searchSchema.set('timestamps', true); 

module.exports = mongoose.model('Search', searchSchema);