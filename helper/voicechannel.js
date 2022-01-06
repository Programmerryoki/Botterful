const Voice = require("@discordjs/voice");

var createVC = (voiceChannel) => {
  const connection = Voice.joinVoiceChannel({
    channelId: voiceChannel.channelId,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    selfMute: false,
  });
  return connection;
}

var getVC = (voiceChannel) => {
  return Voice.getVoiceConnection(voiceChannel.guild.id);
};

var accessVC = (voiceChannel) => {
  var connection = getVC(voiceChannel);
  if (connection) return connection;
  connection = createVC(voiceChannel);
  return connection;
}

var deleteVC = (voiceChannel) => {
  const connection = getVC(voiceChannel);
  if (connection) {
    connection.destroy();
  }
}

module.exports = { createVC, accessVC, deleteVC, getVC };