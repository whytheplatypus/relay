


var portfinder = require('portfinder');
var url = require('url');
var connections;
portfinder.getPort(function (err, port) {
	var WebSocketServer = require('ws').Server
	  , wss = new WebSocketServer({port: port}, function(){
	  	console.log(arguments);
	  });
	wss.on('connection', function(ws) {
		// console.log(ws);
		var id = url.parse(ws.upgradeReq.url, true).query.id;
		connections.id = ws;
		ws.onclose = function(){
			connections.id = null;
			delete connections.id;
		}
	    ws.on('message', function(message) {
	        //get id
	        //send to id
	        //connections[id].send message
	    });
	    ws.send('something');
	});
	console.log("listening on "+port);
});