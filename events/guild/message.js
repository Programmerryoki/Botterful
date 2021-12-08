const PREFIX = process.env['PREFIX'];
const { createProfile } = require('../../helper/database');

const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
  const prefix = process.env.PREFIX;
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let profileData;
  try {
    createProfile(message.author.id, message.guild.id);
  } catch (err) {
    console.log(err);
  }

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();
  const command =
    await client.commands.get(cmd) ||
    await client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  if (!command) {
    message.reply(`Command: "${PREFIX+cmd}" not found!`);
  } 

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const current_time = Date.now();
  const time_stamps = cooldowns.get(command.name);
  const cooldown_amount = command.cooldown * 1000;

  if (time_stamps.has(message.author.id)) {
    const expiration_time =
      time_stamps.get(message.author.id) + cooldown_amount;
    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000;

      return message.reply(
        `Please wait ${time_left.toFixed(1)} more seconds before using ${
          command.name
        }`
      );
    }
  }

  time_stamps.set(message.author.id, current_time);
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

  try {
    await command.execute(client, message, args, cmd, Discord, profileData);
  } catch (err) {
    message.reply('There was an error trying to execute this command!');
    console.log(err);
  } finally {
    message.delete().catch((err) => {
      console.log(err);
    })
  }
};
