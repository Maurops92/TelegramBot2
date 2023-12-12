require('dotenv').config();
const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions/index.js");
const input = require("input");
const { NewMessage } = require('telegram/events');


const apiId = parseInt(process.env.BOT_API);
const apiHash = process.env.BOT_API_HASH;
const stringSession = new StringSession(process.env.STRING_SESSION);

(async () => {
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
        console.log('Evento', event);
        const channels = [];
        const channelIdfrom = event.message.peerId.userId
        ? event.message.peerId.userId.value
        : event.message.peerId.chatId
          ? event.message.peerId.chatId.value
          : event.message.peerId.channelId.value;
      
        //console.log('Id del channel', channelIdfrom);

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
        //console.log('Cripto Noticias_', criptoNoticias.fullChat.id.value);

        const diarioBitcoin = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "diariobitcoin",
          })
        );
        channels.push(diarioBitcoin.fullChat.id.value);
        //console.log('Diario Bitcoin:', diarioBitcoin.fullChat.id.value);

        const finanzasArgy = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "FinanzasArgy",
          })
        );
        channels.push(finanzasArgy.fullChat.id.value);
        //console.log('Finanzas Argy:', finanzasArgy.fullChat.id.value);

        const investmentNewsEsp = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "investmentNewsEsp",
          })
        );
        channels.push(investmentNewsEsp.fullChat.id.value);
        //console.log('Investment News Esp:', investmentNewsEsp.fullChat.id.value);

        const coinMarketCap = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "CoinMarketCapAnnouncements",
          })
        );
        channels.push(coinMarketCap.fullChat.id.value);
        //console.log('Coin Market Cap Announcements:', coinMarketCap.fullChat.id.value);

        const coinTelegraph = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "cointelegraph_es",
          })
        );
        channels.push(coinTelegraph.fullChat.id.value);
        //console.log('Coin Telegraph:', coinTelegraph.fullChat.id.value);

        const axtronOK = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "AxtronOK",
          })
        );
        channels.push(axtronOK.fullChat.id.value);
        //console.log('AxtronOK:', axtronOK.fullChat.id.value);


        channels.push(4055580763n);
        
        //console.log('Todos los channels', channels);

        const fromId = event.originalUpdate.fromId
        
        //toEntity criptocontador1
        
        if (channels.some(i => i === channelIdfrom)) {
          const toEntity = await client.getEntity("Maurops");
          const fromEntity = await client.getInputEntity(fromId)
          const forwardMessages = await client.invoke(
            new Api.messages.ForwardMessages({

              fromPeer: fromEntity,
              id: [event.message.id],
              toPeer: toEntity

            }))
          console.log('Mensaje enviado de forward');;
        }
        
      } catch (error) {
        console.error('Error en el handler:', error);
      }
    }, new NewMessage({}));

  } catch (error) {
    console.error('Error de coneccion:', error);
  }
})();


// fromId: Integer { value: 1062229382n },
//chatId: Integer { value: 4082385983n },
// id: Integer { value: 1122502889n }
// id newMauro =  id: Integer { value: 1998056779n },