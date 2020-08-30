// server.js
let wsPortNum = 61337;
const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: wsPortNum });

// on('connection') handles when a client connects with out websocket server
wss.on('connection', function connection(ws) {
  // on('message') handles when the client sends a message
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    // send message to the client that sent the original message
    ws.send(`Got your message: ${message}`);
  });
  
  // when client connects for first time, the server greets them with .send
  ws.send('you are connected!!!!');
});