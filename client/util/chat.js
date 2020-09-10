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
      case 'activeUsers':
        msgJSON.users.forEach((u) => {
          addUserToList(u);
        });
        break;
      case 'addUser':
        systemMessage($chat, `${msgJSON.msg}`);
        addUserToList(msgJSON.user);
        break;
      case 'removeUser':
        systemMessage($chat, `${msgJSON.user.name} disconnected.`);
        removeUserToList(msgJSON.user);
        break;
      case 'chat':
        let color = `hsl(${msgJSON.user.hue}, 80%, 50%)`;
        msgFromOthers($chat, msgJSON.msg, color, msgJSON.user.name, msgJSON.dateStr);
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

export const getDateTimeToString = (dateObj) => {
  return [dateObj.toLocaleDateString()," ",
    dateObj.getHours(), ":",
    dateObj.getMinutes(), ":",
    dateObj.getSeconds()].join("");
}

export const msgFromOthers = ($chat, msg, color, username, dateStr) => {
  var dateObj = new Date(dateStr);
  var datetime = getDateTimeToString(dateObj);

  var $br = $('<br />');
  var $i = $(`<i style="color:${color};">${username} ${datetime}</i>`);
  var $triangle = $('<em class="triangle"></em>');
  var $span = $('<span></span>').text(msg);
  $span.append($br).append($i).append($triangle);

  var $p = $('<p></p>').append($span);
  $chat.append($p);
}

export const msgFromMe = ($chat, msg, dateObj) => {
  var datetime = getDateTimeToString(dateObj);

  var $br = $('<br />');
  var $i = $(`<i>${datetime}</i>`);
  var $triangle = $('<em class="triangle"></em>');
  var $span = $('<span class="your-msg"></span>').text(msg);
  $span.append($br).append($i).append($triangle);

  var $p = $('<p class="your-msg"></p>').append($span);
  $chat.append($p);
}