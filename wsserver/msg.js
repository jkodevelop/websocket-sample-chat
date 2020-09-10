// msg.js

var msg = {
  systemMsg: function(msg){
    return JSON.stringify({
      "type": "server",
      msg 
    });
  },
  newUserMsg: function(user){
    return JSON.stringify({
      "type": "addUser",
      "msg": `Please welcome: ${user.name}`,
      user
    }); 
  },
  delUserMsg: function(user){
    return JSON.stringify({
      "type": "removeUser",
      user
    }); 
  },
  listActiveUsersMsg: function(activeUsers){
    return JSON.stringify({
      "type": "activeUsers",
      "users": activeUsers
    });
  }
};

module.exports = msg;