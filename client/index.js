import "./style.scss";
import * as $ from 'jquery';
import { getUserId } from './util/user.js';

// getting a unique id for this client
const userId = getUserId();
console.log("userId:",userId);

// let WS_PORT = 61337; // defined in webpack.definePlugin
const ws = new WebSocket(`ws://${IP_ADDRESS}:${WS_PORT}`);

// step 1: open a connection with our web-socket server
ws.addEventListener('open', () => {
  // Send a message to the WebSocket server
  ws.send(JSON.stringify({
    "userId": userId
  }));
  $('#ChatBox').append(`<p>connecting to chat ... </p>`);
});
 
ws.addEventListener('message', event => {
  // The `event` object is a typical DOM event object, and the message data sent
  // by the server is stored in the `data` property
  console.log('Received:', event.data);
  $('#ChatBox').append(`<p>${event.data}</p>`);
});