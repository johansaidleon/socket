const socket = io();

const outputContainer = document.getElementById('output');
const commandInput = document.getElementById('command-input');
const sendCommandButton = document.getElementById('send-command');

// Manejar la recepción de respuestas del servidor
socket.on('response', (response) => {
  const outputMessage = document.createElement('div');
  outputMessage.textContent = response;
  outputContainer.appendChild(outputMessage);
});

// Enviar comandos al servidor
sendCommandButton.addEventListener('click', () => {
  const command = commandInput.value.trim();
  if (command) {
    socket.emit('command', command);
    commandInput.value = '';
  }
});