var RelayServer = require('../');
var port = process.env.PORT || 1337;
var relay = new RelayServer({port: port}, true);
console.log("listening on "+port);
