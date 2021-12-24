const PREFIX = process.env['PREFIX'];
const { createProfile } = require('../../helper/database/profile');
const { createGuildSetting, getSetting } = require('../../helper/database/guildSetting');
const { getVC, speakVC } = require("../../helper/voice");

const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
  const prefix = process.env.PREFIX;
  const gid = message.guild.id;
  const obj = await getSetting(gid);
  client.settings.set(gid, obj);
  const settings = client.settings.get(gid);
  
  if (!message.content.startsWith(prefix) || message.author.bot) {
    if (message.author.bot) return;
    if (!message.member.voice) return;
    const tmp = await getVC(message.member.voice);
    if (!tmp) return;
    if (message.channel.id != settings.drChannel) return;
    await speakVC(message, message.content);
    return;
  }

  try {
    await createProfile(message.author.id, gid);
  } catch (err) {
    console.log(err);
  }

  var args = message.content.slice(prefix.length).split(/ +/);
  args = args.map((item) => {
    return item.toLowerCase()
  });
  const cmd = args.shift().toLowerCase();
  const command =
    await client.commands.get(cmd) ||
    await client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  if (!command) {
    message.reply(`Command: "${PREFIX+cmd}" not found!`);
    return;
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
    await command.execute(client, message, args, cmd, Discord);
  } catch (err) {
    message.reply('There was an error trying to execute this command! Error Log: \n' + err);
    console.log(err);
  } finally {
    // message.delete(5).catch((err) => {
    //   console.log(err);
    // })
  }
};
