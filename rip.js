const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const sql = require("sqlite");
client.on("ready", () => {
  sql.open("./deaths.sqlite");
  console.log("I am ready!");
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args[0];

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args, sql);
  } catch (err) {
    console.error(err);
  }
});

client.on('disconnect', (message) => {
    // Reconnect after timing out
    console.log(message);
    bot.connect();
});
client.login(config.token);
