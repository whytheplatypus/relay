var RelayServer = require('../');
var portfinder  = require('portfinder');
portfinder.getPort(function (err, port) {
	var relay = new RelayServer({port: port});
	console.log("listening on "+port);
});