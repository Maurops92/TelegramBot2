// server.js

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const { startTelegramClient } = require('./index');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/',async (req, res) => {
  const { apiId: reqApiId, apiHash: reqApiHash ,stringSession="", phoneNumber: reqPhoneNumber, password: reqPassword} = req.body;
  apiId = Number(reqApiId);
  apiHash = reqApiHash;
  phoneNumber = reqPhoneNumber;
  password = reqPassword;
  
  try {
    startTelegramClient(apiId, apiHash, phoneNumber, password);
    res.json({ status: 'success' }); 
  } catch (error) {
    console.error('Error during Telegram client startup:', error);
    res.status(500).json({ status: 'error', error: 'Internal Server Error' });
  } 
});

app.post('/code', (req, res) => {
  const { phoneCode: reqPhoneCode } = req.body;
  phoneCode = reqPhoneCode;
  res.json({ status: 'success' }); 
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);

  setInterval(async () => {
    console.log('Servidor vivo');
    await axios.get('https://telegrambot-mauro.onrender.com');
  }, 180000);
});
