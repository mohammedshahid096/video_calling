const user_emit_listeners = {
  joinRoom: "joinRoom",
  me: "me",
  newUserJoined: "newUserJoined",
  userDisconnected: "userDisconnected",
};

const user_receive_listeners = {};

module.exports = {
  user_emit_listeners,
  user_receive_listeners,
};
