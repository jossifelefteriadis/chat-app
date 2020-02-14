const container = document.querySelector('.container');
const nameContainer = document.createElement('section');
const title = document.createElement('h1');
const form = document.createElement('form');
const nameInput = document.createElement('input');
const submitName = document.createElement('button');

title.innerText = 'Enter Your Name';
submitName.innerText = 'Connect';

const getName = () => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = nameInput.value;
    socket.emit('new-user', name);
    nameInput.value = '';
    //socket.off('invalid-name');
    /*socket.on('invalid-name', () => {
      feedbackBox(
        "Make sure you don't have space or other funky characters in your name \n \n Must be between 3-13 characters"
      );
    });*/
    socket.off('name-taken');
    socket.on('name-taken', () => {
      feedbackBox('Nickname already taken');
    });
    socket.off('user-accepted');
    socket.on('user-accepted', () => {
      title.classList.add('hide');
      nameContainer.classList.add('hide');
      addMessageForm();
    });
  });
};

const appendForm = () => {
  nameInput.classList.add('name_input');
  form.appendChild(nameInput);
  submitName.classList.add('submit_name');
  form.appendChild(submitName);
  nameContainer.appendChild(form);
  nameContainer.classList.add('name_container');
  nameContainer.classList.remove('hide');
  title.classList.remove('hide');
  title.classList.add('name_title');
  container.appendChild(title);
  container.appendChild(nameContainer);
  getName();
};
