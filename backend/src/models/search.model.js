let mongoose  = require( 'mongoose');
let Schema =  mongoose.Schema;
let searchSchema = new Schema({
    id: {type: Number, required: true},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    countryCode: {type: String, required: true},
    submitted: {type : Date, default: Date.now}
});
module.exports = mongoose.model('Search', searchSchema);