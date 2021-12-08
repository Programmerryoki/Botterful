module.exports = {
  name: 'directmessage',
  aliases: ['DM', 'dm'],
  description: 'This is a DM command!',
  example: 'dm [@User] You wanna eat lunch?',
  example: 'dm [@User1,@User2] You wanna eat lunch?',
  cooldown: 10,
  execute(client, message, args, cmd, Discord, profileData) {
    message.delete({ reason: 'For Testing' }).catch(console.error);
    let tmp = args.join(' ');
    let temp = tmp.slice(0, tmp.indexOf(']'));
    let msg = tmp.slice(tmp.indexOf(']') + 1);
    let targetMembers = temp.slice(1).split(/ +/);
    if (!targetMembers)
      return message.reply('you need to tag a user with [] to DM them!');
    for (const id of targetMembers) {
      if (!id) continue;
      let member = message.mentions.members.get(id.slice(3, id.length - 1))[
        'user'
      ];
      member.send(`From ${message.author}:\n${msg}`);
    }
  },
};
