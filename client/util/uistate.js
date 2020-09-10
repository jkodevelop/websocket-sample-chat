// uistate
import * as $ from 'jquery';

export const userConnected = (name) => {
  $('.user-step-1').addClass('hide');
  $('.user-step-2').removeClass('hide');
  $('#YourName').text(name);
  $('#MsgInput').prop('disabled',false);
  $('#Send').prop('disabled',false);
}

export const userDisconnected = (name) => {
  $('.user-step-1').removeClass('hide');
  $('.user-step-2').addClass('hide');
  $('#MsgInput').prop('disabled',true);
  $('#Send').prop('disabled',true);
}