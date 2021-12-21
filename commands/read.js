const { createVC, accessVC, deleteVC, playAudio, speakVC } = require("../helper/voice");

module.exports = {
  name: 'read',
  aliases: ["r"],
  description: 'Bot reads out the text',
  example: '',
  cooldown: 1,
  execute(client, message, args, cmd, Discord, profileData) {
    console.log(args);
    if (args.length == 0) throw "Not Enough Arguments";
    if (args[0].toLowerCase() == "start" || args[0].toLowerCase() == "s") {
      // console.log(message.member.voice);
      const connection = createVC(message.member.voice);
      // console.log(connection);
    } else if (args[0].toLowerCase() == "e" || args[0].toLowerCase() == "end") {
      deleteVC(message.member.voice.channel);
    } else if (args[0].toLowerCase() == "out" || args[0].toLowerCase() == "o") {
      const connection = accessVC(message.member.voice);
      var sentence = args.slice(1).join(" ");
      speakVC(message, sentence);
    }
  },
};
