const { createEmbed, createField } = require('../helper/embed');

module.exports = {
  name: 'help',
  aliases: ["h"],
  description: 'Shows all the command this bot has. ',
  example: '',
  cooldown: 10,
  execute(client, message, args, cmd, Discord, profileData) {
    var embed = createEmbed("List of Commands", "Here are the list of commands that you can use.", client.commands.map((file) => createField(file.name, file.description, false)));
    message.channel.send({ embed: embed });
  },
};
