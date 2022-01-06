const Voice = require("@discordjs/voice");
const { joinVoiceChannel, entersState, VoiceConnectionStatus, createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus, NoSubscriberBehavior, generateDependencyReport } = require("@discordjs/voice");
const { tts } = require("./tts");
const { TSArray } = require("./tsarray");
const { createVC, accessVC, deleteVC, getVC } = require("./voicechannel");

const que = new TSArray();

var speakVC = async (message, sentence, lang = "ja-JP") => {
  sentence.forEach(sen => que.push([sen, lang]));
  if (!interval) startVC(message.member.voice);
}

var interval = null;
const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});

var speaking = false;

var startVC = async (voiceChannel) => {
  if (interval) return;
  interval = setInterval(async () => {
    var connection = await accessVC(voiceChannel);
    if (connection && que.length && !speaking) {
      speaking = true;
      await speakup(connection);
      await entersState(player, AudioPlayerStatus.Idle);
      speaking = false;
      if (que.length == 0) stopVC(voiceChannel);
    }
  }, 100);
}

var stopVC = async (voiceChannel) => {
  clearInterval(interval);
  interval = null;
}

var speakup = async (connection) => {
  var [sentence, lang] = await que.shift();
  const audioResource = await tts(sentence, lang);
  playAudio(audioResource, connection);
}

var playAudio = (audio, connection) => {
  const subscription = connection.subscribe(player);
  if (subscription) {
    player.play(audio);
  }
}

module.exports = { playAudio, speakVC, getVC, startVC, stopVC };