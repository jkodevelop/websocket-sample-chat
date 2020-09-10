// chat update
import * as $ from 'jquery';

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