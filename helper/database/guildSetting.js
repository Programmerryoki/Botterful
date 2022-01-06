const guildSetting = require("../../models/guildSettingSchema");

const createGuildSetting = async (guildID) => {
  guildData = await guildSetting.findOne({ guildID: guildID });
  if (!guildData) {
    let setting = await guildSetting.create({
      serverID: guildID,
      autoRead: false,
      drChannel: "",
      readName: false,
    });
    setting.save();
  }
}

const deleteGuildSetting = async (guildID) => {
  guildData = await guildSetting.findOneAndDelete({ serverID: guildID });
};

const editSetting = async (guildID, setting) => {
  guildData = await getSetting(guildID);
  await guildSetting.findOneAndUpdate(
    { setverID: guildID },
    { 
      autoRead: setting.autoRead == null ? guildData.autoRead : setting.autoRead,
      drChannel: setting.drChannel == null ? guildData.drChannel : setting.drChannel,
      readName: setting.readName == null ? guildData.readName : setting.readName,
    }
  );
}

const getSetting = async (guildID) => {
  guildData = await guildSetting.findOne({ guildID: guildID });
  if (!guildData) {
    await createGuildSetting(guildID);
    guildData = await guildSetting.findOne({ guildID: guildID });
  }
  return guildData
}

module.exports = {
  createGuildSetting,
  deleteGuildSetting,
  editSetting,
  getSetting,
};