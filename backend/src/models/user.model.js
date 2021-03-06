const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.set('timestamps', true); 

module.exports = mongoose.model('UserSchema', UserSchema);
