const guildSetting = require("../../models/guildSettingSchema");

const createGuildSetting = async (guildID) => {
  guildData = await guildSetting.findOne({ guildID: guildID });
  if (!guildData) {
    let setting = await guildSetting.create({
      serverID: guildID,
      autoRead: false,
      drChannel: "",
    });
    setting.save();
  }
}

const deleteGuildSetting = async (guildID) => {
  guildData = await guildSetting.findOneAndDelete({ serverID: guildID });
};

const editSetting = async (guildID, setting) => {
  await getSetting(guildID);
  await guildSetting.findOneAndUpdate(
    { setverID: guildID },
    { 
      autoRead: setting.autoRead == null ? false : setting.autoRead,
      drChannel: setting.drChannel == null ? "" : setting.drChannel,
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