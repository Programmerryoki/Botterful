const profileModel = require('../models/profileSchema');

const pmMoneyBronze = async (memberID, guildID, amount) => {
  let profile = await profileModel.findOneAndUpdate(
    {
      userID: memberID,
      serverID: guildID
    },
    {
      $inc: {
        bronze: amount,
      },
    }
  );
  return profile;
};

const pmMoneySilver = async (memberID, guildID, amount) => {
  let profile = await profileModel.findOneAndUpdate(
    {
      userID: memberID,
      serverID: guildID
    },
    {
      $inc: {
        silver: amount,
      },
    }
  );
  return profile
};

const pmMoneyGold = async (memberID, guildID, amount) => {
  let profile = await profileModel.findOneAndUpdate(
    {
      userID: memberID,
      serverID: guildID
    },
    {
      $inc: {
        gold: amount,
      },
    }
  );
  return profile
};

const getMoney = async (memberID, guildID) => {
  let profileData = await profileModel.findOne({ userID: memberID, serverID: guildID });
  return profileData;
}

module.exports = {
  pmMoneyBronze,
  pmMoneySilver,
  pmMoneyGold,
  getMoney,
};
