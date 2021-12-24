const { createEmbed, createField } = require('../helper/embed');

module.exports = {
  name: 'help',
  aliases: ["h"],
  description: 'Shows all the command this bot has. ',
  example: '',
  cooldown: 10,
  execute(client, message, args, cmd, Discord, profileData) {
    if (args.length > 0) {

    } else {
      var embed = createEmbed("List of Commands", "Here are the list of commands that you can use. For more information, type h 'commandName'", 
      // [createField(client.commands.map((file) => ))]
      client.commands.map((file) => createField(file.name ? file.name : ".", file.description ? file.description : ".", true)));
      message.channel.send({ embed: embed });
    }
    var embed = createEmbed("List of Commands", "Here are the list of commands that you can use. For more information, type h 'commandName'", client.commands.map((file) => createField(file.name ? file.name : ".", file.description ? file.description : ".", true)));
    console.log(embed);
    message.channel.send({ embed: embed });
  },
};
