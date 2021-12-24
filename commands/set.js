const { editSetting, getSetting } = require("../helper/database/guildSetting");

const personal = new Set(["_id","serverID","__v"]);

module.exports = {
  name: 'set',
  aliases: ["s"],
  description: 'Set the setting of this bot',
  example: '',
  cooldown: 10,
  async execute(client, message, args, cmd, Discord, profileData) {
    if (args.length == 0) throw "Not enough arguments";
    const gid = message.guild.id;
    if (args[0] == "autoread") {
      if (args[1] == "on") await editSetting(gid, { autoRead: true, drChannel: message.channel.id });
      else if (args[1] == "off") await editSetting(gid, { autoRead: false });
    } else if (args[0] == "readfrom") {
      await editSetting(gid, { drChannel: message.channel.id });
    } else if (args[0] == "view") {
      const setting = await getSetting(gid);
      var msg = "Settings :";
      Object.keys(setting["_doc"]).map(key => {
        if (personal.has(key)) return
        msg += "\n" + key + " : " + setting[key];
      });
      message.reply(msg);
      return;
    } else {
      message.channel.send("Invalid Setting");
      return;
    }
    message.channel.send("Successfully Changed.");
  },
};
