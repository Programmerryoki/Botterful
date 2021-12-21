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

var accessVC = (voiceChannel) => {
  const connection = Voice.getVoiceConnection(voiceChannel.guild.id);
  if (connection) return connection;
  return createVC(voiceChannel);
}

var deleteVC = (channel) => {
  const connection = accessVC(channel);
  if (connection) {
    connection.destroy();
  }
}

var speakVC = async (message, sentence) => {
  const audio = await tts(sentence)
  const resource = createAudioResource(audio["audioContent"],
    {
      inputType: StreamType.Raw,
    });
  const connection = accessVC(message.member.voice);
  if (connection == undefined) {
    console.log("Error");
    return
  }
  playAudio(resource, connection);
}

var playAudio = (audio, connection) => {
  const player = createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  });
  const subscription = connection.subscribe(player);
  if (subscription) {
    setTimeout(() => subscription.unsubscribe(), 5_000);
    player.play(audio);
  }
}

module.exports = { createVC, accessVC, deleteVC, playAudio, speakVC };