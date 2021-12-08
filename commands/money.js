const { pmMoneyBronze, pmMoneySilver, pmMoneyGold, getMoney } = require("../helper/money");
const { createEmbed, createField } = require("../helper/embed");

module.exports = {
  name: 'money',
  aliases: ["m"],
  description: 'Modify money',
  example: '',
  cooldown: 5,
  async execute(client, message, args, cmd, Discord, profileData) {
    if (args.length == 0) throw "Not enough arguments";
    
    if (args[0] == "get") {
      var profile = await getMoney(message.author.id, message.guild.id);
      var embed = createEmbed(message.author.username, "Money", [
        createField("Bronze", profile.bronze | 0, false),
        createField("Silver", profile.silver | 0, false),
        createField("Gold", profile.gold | 0, false),
      ]);
      message.channel.send({ embed: embed });
    }
  },
};
