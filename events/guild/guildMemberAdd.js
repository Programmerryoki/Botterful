const { createProfile } = require('../../helper/database/profile');

module.exports = async (Discord, client, member) => {
  createProfile(member['user'].id, member.guild.id);
};
