const mongoose = require('mongoose')
require('dotenv').config()

module.exports = mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true  });    
// let conn = mongoose.connection;
