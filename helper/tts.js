const GOOGLE_PRIVATE_KEY = process.env["GOOGLE_PRIVATE_KEY"].replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env["GOOGLE_CLIENT_EMAIL"];
const textToSpeech = require('@google-cloud/text-to-speech');
const { createAudioResource, StreamType } = require("@discordjs/voice");
const util = require("util");
const fs = require("fs");

const fileName = "../tmp.mp3";

const client = new textToSpeech.TextToSpeechClient({
  credentials: {
    private_key: GOOGLE_PRIVATE_KEY,
    client_email: GOOGLE_CLIENT_EMAIL
  },
  projectId: "botterful"
});

// languages: "en-US", "ja-JP"
var tts = async (text, language = "ja-JP") => {
  const request = {
    input: { text: text },
    voice: { languageCode: language, ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3', 
    pitch: 0 },
  };
  const [response] = await client.synthesizeSpeech(request);
  await writeToFile(fileName, response);
  return createAudioResource(fileName,
    {
      inputType: StreamType.Arbitrary,
    });
};

var writeToFile = async (filename, data) => {
  const writeFile = util.promisify(fs.writeFile);
  var tmp = await writeFile(filename, data.audioContent, 'binary');
}

module.exports = { tts };