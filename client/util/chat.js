// chat update
import * as $ from 'jquery';
import { addUserToList,removeUserToList } from './uistate.js';

export const msgProcessing = ($chat, msg) => {
  try{
    var msgJSON = JSON.parse(msg);
    var type = msgJSON.type;
    switch(type){
      case 'server':
        systemMessage($chat, `${msgJSON.msg}`);
        break;
      case 'addUser':
        systemMessage($chat, `${msgJSON.msg}`);
        addUserToList(msgJSON.user);
        break;
      case 'removeUser':
        systemMessage($chat, `${msgJSON.user.name} disconnected.`);
        removeUserToList(msgJSON.user);
        break;
      default:
        console.log('UNKNOWN: ', msgJSON);
        break;
    }
  }catch(e){
    console.log('ERR: ', e, msg);
  }
}

export const systemMessage = ($chat, msg) => {
  // $chat.append(`<p>${msg}</p>`);
  var $p = $("<p></p>").text(`${msg}`);
  $chat.append($p);
}

export const msgFromOthers = ($chat, msg, color, user, datetime) => {
  // for later
  var htmlBubble = `
  <p>
    <span>${msg}
    <br />
    <i style="color:${color};">${user} ${datetime}</i></span>
    <em class="triangle"></em>
  </p>
  `;
}

export const msgFromMe = ($chat, msg, color, user, datetime) => {
  // for later
  var htmlBubble = `
  <p class="your-msg">
    <span class="your-msg">${msg}
    <br />
    <i>${user} ${datetime}</i></span>
    <em class="triangle"></em>
  </p>
  `;
}