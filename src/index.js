import { config } from "dotenv";
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { REST } from "@discordjs/rest";

config();
const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(TOKEN);

// on function let's us listen to an event
client.on("ready", () => {
  console.log(`${client.user.username} has logged in!`);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand()) {
    console.log("Hello");
    interaction.reply({
      content: `You ordered ${interaction.options.get("food").value}`,
    });
  }
});

async function main() {
  const commands = [
    {
      name: "order",
      description: "Order something...",
      options: [
        {
          name: "food",
          description: "the type of food",
          type: 3,
          required: true,
        },
      ],
    },
  ];

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    client.login(TOKEN);
  } catch (err) {
    console.log(err);
  }
}

main();
