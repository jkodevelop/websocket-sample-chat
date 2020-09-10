// uistate
import * as $ from 'jquery';

var activeUsers = {};

export const userConnected = (name, hue) => {
  $('.user-step-1').addClass('hide');
  $('.user-step-2').removeClass('hide');
  $('#YourName').text(name);
  $('#YourDot').css({'background-color':`hsl(${hue}, 80%, 50%)`});
  $('#MsgInput').prop('disabled',false);
  $('#Send').prop('disabled',false);
}

export const userDisconnected = (name) => {
  $('.user-step-1').removeClass('hide');
  $('.user-step-2').addClass('hide');
  $('#MsgInput').prop('disabled',true);
  $('#Send').prop('disabled',true);
}

export const addUserToList = (user) => {
  // append user to $('#UserList')
  var $span = $('<span class="dot"></span>').css({'background-color':`hsl(${user.hue}, 80%, 50%)`});
  var $li = $(`<li data-uid="${user.userId}" class="pad-five"></li>`)
    // .data('uid',user.userId)
    .text(`${user.name}`)
    .prepend($span);
  $('#UserList').append($li);
}

export const removeUserToList = (user) => {
  // remove user from $('#UserList')
  $('#UserList').find(`li[data-uid="${user.userId}"]`).remove();
}