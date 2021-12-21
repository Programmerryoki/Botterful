const Discord = require('discord.js');
const keepAlive = require("./server");
const DISCORD_TOKEN = process.env['DISCORD_TOKEN']
const MONGODB_SRV = process.env['MONGODB_SRV']

const client = new Discord.Client({
  intents:
    0b1111111111111111
});
const mongoose = require('mongoose');

const fs = require('fs');

console.log(process.version);

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

fs.readdirSync('./handlers/').forEach((handler) => {
  require(`./handlers/${handler}`)(client, Discord);
});

mongoose
  .connect(MONGODB_SRV, {})
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(err);
  });

keepAlive();
client.login(DISCORD_TOKEN);
