const mongoose = require('mongoose');

const guildSettingSchema = new mongoose.Schema({
  serverID: { type: String, require: true, unique: true },
  autoRead: { type: Boolean, require: true },
  drChannel: { type: String, require: true },
  readName: { type: Boolean, require: true },
});

const model = mongoose.model('GuildSettings', guildSettingSchema);

module.exports = model;
