module.exports = {
  name: 'set',
  aliases: ["s"],
  description: 'Set the setting of this bot',
  example: '',
  cooldown: 10,
  execute(client, message, args, cmd, Discord, profileData) {
    if (args.length == 0) throw "Not enough arguments";
    message.channel.send("No Setting to Set.");
  },
};
