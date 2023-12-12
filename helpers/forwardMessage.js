const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions/index.js");

const apiId = parseInt(process.env.BOT_API);
const apiHash = process.env.BOT_API_HASH;
const stringSession = new StringSession(process.env.STRING_SESSION);

async function addChannel(channelname, channels) {
  try {
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
    await client.connect();
    let channelAdd = await client.invoke(
      new Api.channels.GetFullChannel({
        channel: channelname,
      })
    );
    channels.push(channelAdd.fullChat.id.value);
    return channels
  } catch (error) {
    console.error("Error adding channel:", error);
  }
}

module.exports = { addChannel };
