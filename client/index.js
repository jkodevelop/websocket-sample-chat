import "./style.scss";
import * as $ from 'jquery';
import { getUserId, saveUserName } from './util/user.js';
import { userConnected, userDisconnected } from './util/uistate.js';
import { systemMessage } from './util/chat.js';

// local variable declarations
let ws;
let $btnConnect, $btnDisconn, $btnMsgSend;
let $inputName, $inputMsg;
let $chatContent;

// this function runs the websocket connection and event handlers
function connectToWS(e){
  e.preventDefault();
  
  // make sure we have a name chosen for our connection
  let name = $inputName.val();
  if(name.trim().length == ""){
    alert('Give me a display name please.');
  }else{

    // getting a unique id for this client, use for later to restore connection
    const userId = getUserId();
    saveUserName(name);

    // WS_PORT = 61337 / IP_ADDRESS = local machine ip // defined in webpack.definePlugin
    // step 1: create websocket object
    ws = new WebSocket(`ws://${IP_ADDRESS}:${WS_PORT}`);

    // step 2: open a connection with our web-socket server
    ws.addEventListener('open', () => {
      // Send a message to the WebSocket server
      ws.send(JSON.stringify({
        "userId": userId,
        "name": name,
      }));
      systemMessage($chatContent,'connecting to chat....');
      userConnected(name);
    });
    
    // step 3(continuous): now we wait for messages from server
    ws.addEventListener('message', event => {
      // The `event` object is a typical DOM event object, and the message data sent
      // by the server is stored in the `data` property
      systemMessage($chatContent, `${event.data}`);
    });

  }
}

// this function handles closing WebSocket connection when unloading or Disconnect button click
function disconnectWS(){
  if(ws){
    ws.onclose = function () {}; // disable onclose handler first
    ws.close();
    return true;
  }
  return false;
}

function clickDisconnect(){
  if(confirm('you want to disconnect?')){
    if(disconnectWS()){
      systemMessage($chatContent, 'disconnected');
      userDisconnected();
    }
  }
}

function setupHandlers(){
  $btnConnect.on( "click", connectToWS );
  $btnDisconn.on( "click", clickDisconnect );
}


function windowLoaded(e){

  $btnConnect= $('#NameConnect');
  $inputName = $('#Name');
  $btnMsgSend= $('#Send');
  $inputMsg  = $('#MsgInput');
  $chatContent=$('#ChatContent');
  $btnDisconn= $('#Disconnect');

  setupHandlers();
} // windowLoaded 
// Wait till html/js/css is loaded, technically not needed since all sources are bundled
window.onload = windowLoaded;


window.onbeforeunload = disconnectWS;