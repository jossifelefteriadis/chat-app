const nameValidator = require('../helpers/nameValidator');
const logger = require('../logger');

const newUser = (name, users, socket) => {
  //3-13 characters, a-z A-Z 0-9 . _ are allowed
  if (!nameValidator(name)) {
    logger.error(`${name} was invalid. Try again`);
    socket.emit('invalid-name', name);
  } else if (Object.values(users).includes(name)) {
    logger.error(`${name} was already taken`);
    socket.emit('name-taken', name);
  } else if (!Object.values(users).includes(name)) {
    logger.info(`${name} just joined the chat`);
    users[socket.id] = name;
    socket.emit('user-accepted');
    socket.broadcast.emit('user-connected', name);
  }
};

module.exports = newUser;
