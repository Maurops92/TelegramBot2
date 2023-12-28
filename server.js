const express = require('express');
const { startTelegramClient } = require('.');
const { default: axios } = require('axios');
const path = require('path')

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')))

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  //startTelegramClient();


  setInterval( async () => {
    console.log('Servidor vivo');
    await axios.get('https://telegrambot-mauro.onrender.com')
  }, 180000);
});
