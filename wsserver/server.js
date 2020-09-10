// server.js
let wsPortNum = 61337;
const WebSocket = require('ws');
const msg = require('./msg.js');

const wss = new WebSocket.Server({ port: wsPortNum });

const activeUsers = {};

function broadcast(wss, currentClient, data){
  wss.clients.forEach(function each(client) {
    if (client !== currentClient && client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}


function processMsg(uId, message, client){
  console.log('received: %s', message);
  try{
    let msgJSON = JSON.parse(message);
    let type = msgJSON.type;
    switch(type){
      case 'addUser':
        let user = msgJSON.user
        activeUsers[uId] = user;
        // send welcome message back to source
        client.send(msg.systemMsg(`Welcome: ${user.name}`));
        // tell everyone else there is someone new
        broadcast(wss, client, msg.newUserMsg(user));
        break;
      case 'chat':
        let u = activeUsers[uId];
        let message = msgJSON.msg;
        let dateStr = msgJSON.dateStr;
        broadcast(wss, client, msg.chat(u, message, dateStr));
      default:
        console.log('UNKNOWN: ', msgJSON);
        break;
    }
  }catch(e){
    console.log('ERR: ', e, msg);
  }
}


// on('connection') handles when a client connects with out websocket server
wss.on('connection', function connection(client) {
  // on('message') handles when the client sends a message
  let uId = Date.now() + Math.floor(Math.random() * 1000);
  client.on('message', function onMsg(message) {
    processMsg(uId, message, client);
    console.log('these people are connected: ', activeUsers);
  });

  client.on('close', function onClose(req) {
    // user disconnected
    console.log('this user is disconnected: ', req, uId);
    let user = activeUsers[uId];
    delete activeUsers[uId];
    broadcast(wss, client, msg.delUserMsg(user));
    console.log('these people are still connected: ', activeUsers);
  });
  
  // when client connects for first time, the server greets them with .send
  client.send(msg.systemMsg(`You are connected!`));
  var userList = Object.keys(activeUsers).map(function(id) {
    return activeUsers[id];
  });
  client.send(msg.listActiveUsersMsg(userList));

});