const io = require('socket.io-client')('http://localhost:3000');

const DEVICE_ID = 'sensor_001';

// Conectar al servidor de Socket.IO
io.on('connect', () => {
  console.log('Conectado al servidor de Socket.IO');

  // Enviar datos al servidor de manera periódica
  setInterval(() => {
    const temperature = Math.random() * (30 - 20) + 20;
    const humidity = Math.random() * (60 - 40) + 40;
    const data = `${DEVICE_ID}: Temperatura: ${temperature.toFixed(2)}°C, Humedad: ${humidity.toFixed(2)}%`;

    // Enviar los datos al servidor web a través de Socket.IO
    io.emit('sensor-data', data);
    console.log(`Datos enviados al servidor: ${data}`);
  }, 5000);
});

// Manejar eventos de error
io.on('error', (error) => {
  console.error('Error en la conexión Socket.IO:', error);
});

// Manejar eventos de desconexión
io.on('disconnect', () => {
  console.log('Desconectado del servidor de Socket.IO');
});
