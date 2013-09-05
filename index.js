

var url = require('url');

WebSocketServer = require('ws').Server;


var RelayServer = function(options){
	var self = this;
	this._wss = new WebSocketServer(options, function(){
		console.log(arguments);
	});
	this._connections = {};

	this._wss.on('connection', function(ws) {
		// console.log(ws);
		var id = url.parse(ws.upgradeReq.url, true).query.id;
		console.log("registering ", id);
		self._connections[id] = ws;
		ws.onclose = function(){
			self._connections[id] = null;
			delete self._connections[id];
		}
	    ws.on('message', function(message) {
	    	console.log(message);
	        //get id
	        try{
	        	var data = JSON.parse(message);
	        	console.log(data.to);
	        	self._connections[data.to].send(message);
	        } catch(e){
	        	console.log(e);
	        	ws.send("Bad Message", e);
	        }

	        //send to id
	        //connections[id].send message
	    });
	    // ws.send('something');
	});
}

module.exports = RelayServer;