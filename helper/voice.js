const Voice = require("@discordjs/voice");
const { joinVoiceChannel, entersState, VoiceConnectionStatus, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus, NoSubscriberBehavior, generateDependencyReport } = require("@discordjs/voice");
const { tts } = require("./tts");

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
  const connection = getVC(voiceChannel);
  if (connection) return connection;
  return createVC(voiceChannel);
}

var deleteVC = (voiceChannel) => {
  const connection = getVC(voiceChannel);
  if (connection) {
    connection.destroy();
  }
}

var speakVC = async (message, sentence, lang="ja-JP") => {
  const audioResource = await tts(sentence, lang);
  const connection = accessVC(message.member.voice);
  if (connection == undefined) {
    console.log("Error");
    return
  }
  playAudio(audioResource, connection);
}

var playAudio = (audio, connection) => {
  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  });
  const subscription = connection.subscribe(player);
  if (subscription) {
    player.play(audio);
  }
}

var isSpeaking = () => {
  
}

module.exports = { createVC, accessVC, deleteVC, playAudio, speakVC, getVC };