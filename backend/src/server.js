const http = require('http');
const app = require('./index.js');
const db = require('./db.js')

const server = http.createServer(app);

server.listen(8081);