import "./style.scss";
import * as $ from 'jquery';
import { getUserId, saveUserName, saveHue, getUserName, getHue,
removeUserName, removeHue } from './util/user.js';
import { userConnected, userDisconnected } from './util/uistate.js';
import { msgProcessing, systemMessage, msgFromMe } from './util/chat.js';

// local variable declarations
let ws;
let $btnConnect, $btnDisconn, $btnMsgSend;
let $inputName, $inputMsg;
let $chatContent;


function wsSetup(userId, name, hue){
  // WS_PORT = 61337 / IP_ADDRESS = local machine ip // defined in webpack.definePlugin
  // step 1: create websocket object
  ws = new WebSocket(`ws://${IP_ADDRESS}:${WS_PORT}`);

  // step 2: open a connection with our web-socket server
  ws.addEventListener('open', () => {
    // Send a message to the WebSocket server
    ws.send(JSON.stringify({
      "type":"addUser",
      "user": {
        "userId": userId,
        "name": name,
        "hue": hue,
      },
    }));
    systemMessage($chatContent,'connecting to chat....');
    userConnected(name, hue);

  });
  
  // step 3(continuous): now we wait for messages from server
  ws.addEventListener('message', event => {
    // The `event` object is a typical DOM event object, and the message data sent
    // by the server is stored in the `data` property
    msgProcessing($chatContent, event.data);
  });
}

function reconnect(){
  let userName = getUserName();
  if(userName !== null){
    let userId = getUserId();
    let userHue= getHue();
    if(userHue === null){
      userHue = Math.floor(Math.random() * 350);
      saveHue(userHue);
    }
    wsSetup(userId, userName, userHue);
  }
}

// this function runs the websocket connection and event handlers
function connectToWS(e){
  e.preventDefault();
  
  // make sure we have a name chosen for our connection
  let name = $inputName.val();
  if(name.trim().length == 0){
    alert('Give me a display name please.');
  }else{

    // getting a unique id for this client, use for later to restore connection
    const userId = getUserId();
    const hue = Math.floor(Math.random() * 350);
    saveHue(hue);
    saveUserName(name);
    wsSetup(userId, name, hue);
  }
}

// this function handles closing WebSocket connection when unloading or Disconnect button click
function disconnectWS(){
  if(ws){
    ws.onclose = function () {}; // disable onclose handler first
    ws.close();
  }
}

function clickDisconnect(){
  if(confirm('you want to disconnect?')){
    disconnectWS();
    removeHue();
    removeUserName();
    systemMessage($chatContent, 'disconnected');
    userDisconnected();
  }
}

function sendMsg(){
  let message = $inputMsg.val();
  message = message.trim();
  if(message.length !== 0){
    let now = Date.now();
    let nowDate = new Date(now);
    msgFromMe($chatContent, message, nowDate);
    ws.send(JSON.stringify({
      "type":"chat",
      "msg": message,
      "dateStr": now,
    }));
    $inputMsg.val('');
  }
}

function setupHandlers(){
  $btnConnect.on( "click", connectToWS );
  $btnDisconn.on( "click", clickDisconnect );
  $btnMsgSend.on( "click", sendMsg );
}

function windowLoaded(e){

  $btnConnect= $('#NameConnect');
  $inputName = $('#Name');
  $btnMsgSend= $('#Send');
  $inputMsg  = $('#MsgInput');
  $chatContent=$('#ChatContent');
  $btnDisconn= $('#Disconnect');

  setupHandlers();

  // this allows you to reconnect for whatever reason, if you didn't manually disconnect from chat
  reconnect();

} // windowLoaded 
// Wait till html/js/css is loaded, technically not needed since all sources are bundled
window.onload = windowLoaded;


window.onbeforeunload = disconnectWS;