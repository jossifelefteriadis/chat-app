const logger = require('../logger');

const disconnectUser = (socket, users) => {
  logger.info(`${users[socket.id]} got disconnected due to inactivity`);
  socket.broadcast.emit('user-inactivity-disconnected', users[socket.id]);
  delete users[socket.id];
};

module.exports = disconnectUser;
