var RelayServer = require('../');
var portfinder  = require('portfinder');
portfinder.getPort(function (err, port) {
	var relay = new RelayServer({port: port}, true);
	console.log("listening on "+port);
});