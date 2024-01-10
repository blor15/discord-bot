import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
const TOKEN = process.env.BOT_TOKEN;

client.login(TOKEN);

// on function let's us listen to an event
client.on("ready", () => {
  console.log(`${client.user.username} has logged in!`);
});

client.on("messageCreate", (message) => {
  console.log(message.content);
  console.log(message.createdAt.toDateString());
  console.log(message.author.tag);
});
