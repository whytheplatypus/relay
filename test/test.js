var RelayServer = require('../');

var relay = new RelayServer({port: 1337}, true);
console.log("listening on "+1337);
var WebSocket = require('ws')

var assert = require("assert");
var ws, ws2;
before(function(done2){
	ws = new WebSocket('ws://localhost:1337/?id=hello');
	ws2 = new WebSocket('ws://localhost:1337/?id=world');
	var both = 0;
	ws.on('open', function() {

	    both++;
	    if(both > 1){
	    	done2();
	    }
	});
	ws2.on('open', function() {
		ws2.on('message', function(message) {
			message = JSON.parse(message);
			if(message.peers !== undefined){
				console.log(message.peers);
			}
		});
		both++;
	    if(both > 1){
	    	done2();
	    }
	});
});
describe('RelayServer', function(){
  it("Should forward any messge to the intended recipient", function(done){
   	
	var packet = {to: "world", message:"This is from hello!"};
	ws2.on('message', function(message) {
		// console.log(message);
    	assert.equal(message, JSON.stringify(packet))
    	done();
	});
	
	ws.send(JSON.stringify(packet));

  });
});