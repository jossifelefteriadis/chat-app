const newUser = require('./newUser');
const newMessage = require('./newMessage');
const disconnectUser = require('./disconnectUser');
const disconnectedUser = require('./disconnectedUser');
const users = {};

const socketListeners = socket => {
  socket.on('new-user', name => newUser(name, users, socket));
  socket.on('send-chat-message', message => newMessage(message, users, socket));
  socket.on('disconnect', () => disconnectUser(socket, users));
  socket.on('disconnected', () => disconnectedUser(socket, users));
};

module.exports = socketListeners;
