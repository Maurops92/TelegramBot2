require('dotenv').config();
const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions/index.js");
const input = require("input");
const { NewMessage } = require('telegram/events');



const apiId = parseInt(process.env.BOT_API);
const apiHash = process.env.BOT_API_HASH;
const stringSession = new StringSession(process.env.STRING_SESSION);

const startTelegramClient = async () => {
  try {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.start({
      phoneNumber: '+5492615534440',
      password: process.env.PASSWORD,
      phoneCode: async () =>
        await input.text("Please enter the code you received: "),
      onError: (err) => console.log(err),
    });

    await client.connect();

    client.addEventHandler(async (event) => {
      try {
        const channels = [];
        const userId = event.message.peerId?.userId?.value
        const chatId = event.message.peerId?.chatId?.value
        const channelId = event.message.peerId?.channelId?.value
        let identifier = ''
        let fromId = ''
        
        const newBotMauro = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "newBotMauro",
          })
        );
        channels.push(newBotMauro.fullChat.id.value);

        const criptoNoticias = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "criptonoticias",
          })
        );
        channels.push(criptoNoticias.fullChat.id.value);

        const diarioBitcoin = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "diariobitcoin",
          })
        );
        channels.push(diarioBitcoin.fullChat.id.value);

        const finanzasArgy = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "FinanzasArgy",
          })
        );
        channels.push(finanzasArgy.fullChat.id.value);

        const investmentNewsEsp = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "investmentNewsEsp",
          })
        );
        channels.push(investmentNewsEsp.fullChat.id.value);

        const coinMarketCap = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "CoinMarketCapAnnouncements",
          })
        );
        channels.push(coinMarketCap.fullChat.id.value);

        const coinTelegraph = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "cointelegraph_es",
          })
        );
        channels.push(coinTelegraph.fullChat.id.value);

        const axtronOK = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "AxtronOK",
          })
        );
        channels.push(axtronOK.fullChat.id.value);

        channels.push(4055580763n);
        //toEntity criptocontador1
        
        if (userId) {
          identifier = userId;
          fromId = event.message.fromId.userId;
          console.log('Viene del userID');
        } else if (chatId) {
          identifier = chatId
          fromId = event.message.fromId.userId;
          console.log('Viene del chatID');
        } else {
          identifier = channelId,
          fromId = channelId
          console.log('Viene del channelId');
        }

        console.log('identifier:', identifier);
        console.log('fromId:', fromId);


        if (channels.some(i => i === identifier)) {
          const toEntity = await client.getEntity("Maurops");
          const fromEntity = await client.getInputEntity(fromId)
          const forwardMessages = await client.invoke(
            new Api.messages.ForwardMessages({
              fromPeer: fromEntity,
              id: [event.message.id],
              toPeer: toEntity
            }))
          console.log(`Mensaje reenviado con exito!!! `);;
        }

      } catch (error) {
        console.error('Error en el handler:', error);
      }
    }, new NewMessage({}));

  } catch (error) {
    console.error('Error de coneccion:', error);
  }
};

module.exports = {startTelegramClient}