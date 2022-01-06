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
    } else if (args[0] == "readname") {
      if (args[1] == "on") await editSetting(gid, { readName: true });
      else if (args[1] == "off") await editSetting(gid, { readName: false });
    } else if (args[0] == "view") {
      const setting = await getSetting(gid);
      var msg = "Settings :";
      Object.keys(setting["_doc"]).map(key => {
        if (personal.has(key)) return
        msg += "\n" + key + " : " + setting[key];
      });
      message.reply(msg);
      return;
    } else if (args[0] == "customvoice" || args[0] == "cv") {
      if (args[1] == "random") {
        const pitch = Math.random() * (20) - 10;
        const speed = Math.random() * (4 - 0.25) + 0.25;
        const volume = Math.random() * (12) - 6;
      } else {

      }
    } else {
      message.channel.send("Invalid Setting");
      return;
    }
    message.channel.send("Successfully Changed.");
  },
};
