// msg.js

var msg = {
  systemMsg: function(msg){
    return JSON.stringify({
      "type": "server",
      msg 
    });
  }
}

module.exports = msg;