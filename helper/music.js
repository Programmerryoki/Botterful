const ytdl = require('ytdl-core');

const url = message.content.split(' ')[1];
if (!ytdl.validateURL(url)) return message.reply(`${url}は処理できません。`);
const stream = ytdl(ytdl.getURLVideoID(url), {
  filter: format => format.audioCodec === 'opus' && format.container === 'webm', 
  quality: 'highest',
  highWaterMark: 32 * 1024 * 1024
});
const resource = createAudioResource(stream, {
  inputType: StreamType.WebmOpus
});