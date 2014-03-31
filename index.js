

var url = require('url');

WebSocketServer = require('ws').Server;


var RelayServer = function(options, swarm){
	var self = this;
	this._wss = new WebSocketServer(options, function(){
		console.log(arguments);
	});
	this._connections = {};

	this._wss.on('connection', function(ws) {
		// console.log(ws.readyState);
		if(swarm){
	    	// console.log(Object.keys(self._connections));
	    	ws.send(JSON.stringify({peers: Object.keys(self._connections)}));
	    }
	    var id = url.parse(ws.upgradeReq.url, true).query.id;
		console.log("registering ", id);
		self._connections[id] = ws;
		ws.on('close', function(){
			self._connections[id] = null;
			delete self._connections[id];
		});
	    ws.on('message', function(message) {
	        try{
	        	var data = JSON.parse(message);
	        	console.log("to",data.to);
	        	if(self._connections.hasOwnProperty(data.to)){
	        		self._connections[data.to].send(message);
	        	} else {
	        		throw "Can't find the recipient";
	        	}
	        } catch(e){
	        	console.log(e);
	        	ws.send("Bad Message", e);
	        }
	    });
	});
}

module.exports = RelayServer;