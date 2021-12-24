const { deleteProfile } = require('../../helper/database/profile');

module.exports = async (Discord, client, member) => {
  deleteProfile(member['user'].id, member.guild.id);
};
