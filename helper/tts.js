const GOOGLE_PRIVATE_KEY = process.env["GOOGLE_PRIVATE_KEY"].replace(/\\n/g, '\n');
const GOOGLE_CLIENT_EMAIL = process.env["GOOGLE_CLIENT_EMAIL"];
const textToSpeech = require('@google-cloud/text-to-speech');
const Voice = require("@discordjs/voice");

const client = new textToSpeech.TextToSpeechClient({
  credentials: {
    private_key: GOOGLE_PRIVATE_KEY,
    client_email: GOOGLE_CLIENT_EMAIL
  },
  projectId: "botterful"
});

// languages: "en-US", ""
var tts = async (text, language="en-US") => {
  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };
  // console.log(client);
  const [response] = await client.synthesizeSpeech(request);
  // console.log(response);
  return response
};

module.exports = { tts };