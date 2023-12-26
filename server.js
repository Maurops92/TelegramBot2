const express = require('express');
const { startTelegramClient } = require('.');

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('¡Hola este es el front end!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  startTelegramClient();


  setInterval(() => {
    console.log('Servidor vivo');
  }, 180000);
});
