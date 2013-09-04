var WebSocket = require('ws')
  , ws = new WebSocket('ws://localhost:8000/?id=hello');
ws.on('open', function() {
    ws.send('something');
});
ws.on('message', function(message) {
    console.log('received: %s', message);
});