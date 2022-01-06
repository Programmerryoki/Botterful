const { createVC, accessVC, deleteVC } = require("../helper/voicechannel");
const { speakVC } = require("../helper/voice");

module.exports = {
  name: 'read',
  aliases: ["r"],
  description: 'Bot reads out the text',
  example: '',
  cooldown: 1,
  async execute(client, message, args, cmd, Discord, profileData) {
    console.log(args);
    if (args.length == 0) throw "Not Enough Arguments";
    if (args[0] == "start" || args[0] == "s") {
      const connection = createVC(message.member.voice);
      client.settings.set("readChannel");
    } else if (args[0] == "e" || args[0] == "end") {
      deleteVC(message.member.voice);
    } else if (args[0] == "out" || args[0] == "o") {
      accessVC(message.member.voice);
      var sentence = args.slice(1).join(" ");
      await speakVC(message, sentence);
      setTimeout(() => deleteVC(message.member.voice), 5_000);
    }
  },
};
