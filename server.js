const express = require('express');
const { startTelegramClient } = require('.');


const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola desde tu servidor local!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  startTelegramClient();
});
