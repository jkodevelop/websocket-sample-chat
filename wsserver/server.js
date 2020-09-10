// server.js
let wsPortNum = 61337;
const WebSocket = require('ws');
const msg = require('./msg.js');

const wss = new WebSocket.Server({ port: wsPortNum });

var activeUsers = {};

function broadcast(wss, currentClient, data){
  wss.clients.forEach(function each(client) {
    if (client !== currentClient && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// on('connection') handles when a client connects with out websocket server
wss.on('connection', function connection(client) {
  // on('message') handles when the client sends a message
  let uId = Date.now() + Math.floor(Math.random() * 1000);
  client.on('message', function onMsg(message) {
    console.log('received: %s', message);
    // send message to the client that sent the original message
    let user = JSON.parse(message);
    activeUsers[uId] = user;
    
    client.send(msg.systemMsg(`Welcome: ${user.name}`));
    broadcast(wss, client, msg.systemMsg(`Please welcome: ${user.name}`));

    console.log('these people are connected: ', activeUsers);
  });

  client.on('close', function onClose(req) {
    // user disconnected
    console.log('this user is disconnected: ', req, uId);
    delete activeUsers[uId];
    console.log('these people are still connected: ', activeUsers);
  });
  
  // when client connects for first time, the server greets them with .send
  client.send(msg.systemMsg(`You are connected!`));
});