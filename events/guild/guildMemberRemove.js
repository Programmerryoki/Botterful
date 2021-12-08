const { deleteProfile } = require('../../helper/database');

module.exports = async (Discord, client, member) => {
  deleteProfile(member['user'].id, member.guild.id);
};
