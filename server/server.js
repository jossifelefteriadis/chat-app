const PORT = 3000;
const io = require('socket.io')(PORT);
const express = require('express');
const app = express();

const socketListeners = require('./sockets/socketListeners');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => socketListeners(socket, io));

process.on('SIGINT', () => {
  io.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  io.close(() => {
    process.exit(0);
  });
});
