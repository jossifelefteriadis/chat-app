const messageValidator = require('../helpers/messageValidator');
const logger = require('../logger');

const newMessage = (message, users, socket) => {
  logger.info(`${users[socket.id]} just sent a new message: ${message}`);
  if (!messageValidator(message)) {
    return;
  } else {
    clearTimeout(socket.inactivityTimeout);
    socket.broadcast.emit('chat-message', {
      message: message,
      name: users[socket.id]
    });
    socket.inactivityTimeout = setTimeout(
      () => socket.emit('inactive'),
      1000 * 10
    );
  }
};

module.exports = newMessage;
