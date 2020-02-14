const showFeedback = document.createElement('section');
const messageContainer = document.createElement('section');
const messageForm = document.createElement('form');
const messageInput = document.createElement('input');
const submitMessage = document.createElement('button');
const disconnectButton = document.createElement('button');

submitMessage.innerText = 'Send';
disconnectButton.innerText = 'X';

messageContainer.classList.add('message-container');
messageForm.classList.add('send-container');
messageInput.classList.add('message-input');
submitMessage.classList.add('send-button');
disconnectButton.classList.add('disconnect-button');

const addMessageForm = () => {
  showFeedback.classList.add('hide');
  messageContainer.classList.remove('hide');
  messageForm.classList.remove('hide');
  disconnectButton.classList.remove('hide');
  messageForm.appendChild(messageInput);
  messageForm.appendChild(submitMessage);
  container.appendChild(disconnectButton);
  container.appendChild(messageContainer);
  container.appendChild(messageForm);
  appendMessage('You joined');
};

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} left the chat`);
});

socket.on('user-inactivity-disconnected', name => {
  appendMessage(`${name} was disconnected due to inactivity`);
});

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('send-chat-message', message);
  if (message !== '') {
    appendMyMessage(`You: ${message}`);
  }
  messageInput.value = '';
});

const appendMessage = message => {
  const messageElement = document.createElement('section');
  messageElement.innerText = message;
  messageElement.classList.add('messages');
  messageContainer.append(messageElement);
};

const appendMyMessage = message => {
  const myMessageElement = document.createElement('section');
  myMessageElement.innerText = message;
  myMessageElement.classList.add('myMessage');
  messageContainer.append(myMessageElement);
};

const feedbackBox = message => {
  showFeedback.innerText = message;
  showFeedback.classList.add('feedback-I-disconnect');
  showFeedback.classList.remove('hide');
  container.appendChild(showFeedback);
};

disconnectButton.addEventListener('click', event => {
  if (event.target.classList.contains('disconnect-button')) {
    socket.disconnect();
    messageContainer.innerHTML = '';
    messageContainer.classList.add('hide');
    messageForm.classList.add('hide');
    disconnectButton.classList.add('hide');
    appendForm();
    feedbackBox('You disconnected from the chat');
    socket.connect();
  }
});

socket.on('inactive', () => {
  socket.emit('disconnected');
  messageContainer.classList.add('hide');
  messageForm.classList.add('hide');
  disconnectButton.classList.add('hide');
  appendForm();
  feedbackBox('Disconnected by the server due to inactivity');
});
