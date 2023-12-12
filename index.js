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
        const channels = [];
        const channelIdfrom = event.message.peerId.chatId? event.message.peerId.chatId.value : event.originalUpdate.message.peerId.channelId.value
       // console.log('Evento enviado por uno mismo' , event);
       // console.log('Id del channel', channelIdfrom);

        const newBotMauro = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "newBotMauro",
          })
        );
        channels.push(newBotMauro.fullChat.id.value);
        

        const finanzasArgy = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "FinanzasArgy",
          })
        );
        channels.push(finanzasArgy.fullChat.id.value);
        
        const coinTelegraph = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "cointelegraph_es",
          })
        );
        channels.push(coinTelegraph.fullChat.id.value);
        
        const criptoNoticias = await client.invoke(
          new Api.channels.GetFullChannel({
            channel: "criptonoticias",
          })
        );
        channels.push(criptoNoticias.fullChat.id.value);
        console.log('cripto noticias ID' , criptoNoticias.fullChat.id.value);

        channels.push(4055580763n);

        const mauroBotId = { value: 4082385983n };

        const grupo = await client.invoke(new Api.messages.GetFullChat({
          chatId: mauroBotId.value
        }));

        console.log(channels);

        if (channels.some(i => i === channelIdfrom)) {
          client.sendMessage(
            newBotMauro.fullChat.id.value,
            {
              message: `Enviando mensaje copiado  ${event.message.message}  `,
              file: event.message.media
            });
          console.log('Mensaje copiado y enviado con exito');
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