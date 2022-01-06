const { getSetting } = require('../../helper/database/guildSetting');
const { accessVC, deleteVC } = require("../../helper/voicechannel");

module.exports = async (Discord, client, oldState, newState) => {
  const gid = oldState.guild.id;
  if (!client.settings.get(gid)) {
    const obj = await getSetting(gid);
    client.settings.set(gid, obj);
  }
  const settings = client.settings.get(gid);
  if (!oldState.channel && newState.channel) {
    if (settings.autoRead) {
      accessVC(newState);
    }
  } else if (oldState.channel && !newState.channel) {
    const channel = await newState.guild.channels.fetch(oldState.channel.id);
    var botcount = 0;
    for (var member of channel.members) {
      if (member[1].user.bot) botcount += 1;
    }
    if (settings.autoRead && channel.members.size == botcount ){
      deleteVC(channel);
    }
  }
};
