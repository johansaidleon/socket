const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// Configurar el directorio público
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Función para generar datos aleatorios
function generateRandomData() {
  const temperature = (Math.random() * (30 - 20) + 20).toFixed(2);
  const humidity = (Math.random() * (60 - 40) + 40).toFixed(2);
  return `Temperatura: ${temperature}°C, Humedad: ${humidity}%`;
}

// Manejar las conexiones de Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Manejar comandos del cliente
  socket.on('command', (command) => {
    console.log(`Comando recibido: ${command}`);

    // Procesar el comando y enviar una respuesta
    let response;
    switch (command) {
      case 'status':
        response = 'El sistema está funcionando correctamente.';
        break;
      case 'data':
        response = generateRandomData();
        break;
      default:
        response = 'Comando no reconocido.';
    }

    // Enviar la respuesta al cliente
    socket.emit('response', response);
  });

  // Manejar la desconexión del cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});