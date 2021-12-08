var Cron = require('cron');
var CronJob = Cron.CronJob;
const Moment = require('moment');
var jobs = [];
const { createEmbed, createField } = require('../helper/embed');


const create = async (Discord, msg, rem, s = 0, m = 1, h = 0, d = 0) => {
  console.log(rem);
  s = s ? s : 0; m = m ? m : 1; h = h ? h : 0; d = d ? d : 0;


  let bd = d > 0;
  let bh = bd || h > 0;
  let bm = bh || m > 0;
  let bs = bm || s > 0;
  // console.log(bd,bh,bm,bs);

  let schedule = `${s > 0 ? "*/" + s.toString() : bs ? "00" : "*"} ${m > 0 ? "*/" + m.toString() : bm ? "00" : "*"} ${h > 0 ? "*/" + h.toString() : bh ? "00" : "*"} ${d > 0 ? "*/" + d.toString() : bd ? "00" : "*"} * *`;
  console.log(schedule);
  // return;k

  var job = new CronJob(schedule, () => {
    console.log('You will see this message every minute');
    let em = createEmbed("テストメッセージ", "説明文ここ！", [createField("テスト", "例文？", false)]);
    msg.channel.send({ embed: em });
  }, null, true, 'Asia/Tokyo');
  jobs.push(job);


  if (rem) {
    let embed = createEmbed(
      "カウントダウン",
      "0:00:00:00"
    );
    var countdown = await msg.channel.send({ embed: embed });
    // let countdown = null;

    var see = new CronJob('*/5 * * * * *', async () => {
      let next = job.nextDate();
      console.log(next);
      let diff = Math.ceil(next.diff(Moment(new Date()), 's', true));
      let second = (diff % 60).toString();
      let minute = (Math.floor(diff / 60)).toString();
      let hour = (Math.floor(diff / (60 * 60))).toString();
      let day = (Math.floor(diff / (24 * 60 * 60))).toString();
      console.log(diff, "\n", day, hour, minute, second);
      let time = day + ":";
      if (hour.length < 2) time += "0";
      time += hour + ":";
      if (minute.length < 2) time += "0";
      time += minute + ":";
      if (second.length < 2) time += "0";
      time += second;

      if (d.toString() === day && h.toString() === hour && m.toString() === minute && s.toString() === second) {
        if (countdown) {
          await countdown.delete().catch((err) => {
            console.log(err);
          });
        }

        countdown = await msg.channel.send({ embed: embed });
      }

      embed = { ...embed, description: time };
      // console.log(embed);
      await countdown.edit({ embed: embed }).then(() => {
        console.log("edited");
      }).catch((err) => {
        console.log(err);
      });
    }, null, true, 'Asia/Tokyo');
    jobs.push(see);
  }
};


const createSchedule = async (Discord, msg, rem, schedule) => {
  let [s, m, h, d] =
    console.log(rem);
  console.log(schedule);

  var job = new CronJob(schedule, () => {
    console.log('You will see this message every minute');
    let em = createEmbed("テストメッセージ", "説明文ここ！", [createField("テスト", "例文？", false)]);
    msg.channel.send({ embed: em });
  }, null, true, 'Asia/Tokyo');
  jobs.push(job);


  if (rem) {
    let embed = createEmbed(
      "カウントダウン",
      "0:00:00:00"
    );
    var countdown = await msg.channel.send({ embed: embed });
    // let countdown = null;

    var see = new CronJob('*/5 * * * * *', async () => {
      let next = job.nextDate();
      console.log(next);
      let diff = Math.ceil(next.diff(Moment(new Date()), 's', true));
      let second = (diff % 60).toString();
      let minute = (Math.floor(diff / 60)).toString();
      let hour = (Math.floor(diff / (60 * 60))).toString();
      let day = (Math.floor(diff / (24 * 60 * 60))).toString();
      console.log(diff, "\n", day, hour, minute, second);
      let time = day + ":";
      if (hour.length < 2) time += "0";
      time += hour + ":";
      if (minute.length < 2) time += "0";
      time += minute + ":";
      if (second.length < 2) time += "0";
      time += second;

      if (d.toString() === day && h.toString() === hour && m.toString() === minute && s.toString() === second) {
        if (countdown) {
          await countdown.delete().catch((err) => {
            console.log(err);
          });
        }

        countdown = await msg.channel.send({ embed: embed });
      }

      embed = { ...embed, description: time };
      // console.log(embed);
      await countdown.edit({ embed: embed }).then(() => {
        console.log("edited");
      }).catch((err) => {
        console.log(err);
      });
    }, null, true, 'Asia/Tokyo');
    jobs.push(see);
  }
};

const createCountdown = async (msg, schDay, maintitle, maindescription, mainfields, subfields) => {
  let tmp = mainfields.split(/:\?:/g);
  console.log(tmp);
  let mainField = [];
  for (t of tmp) {
    [title, field, inline] = t.split(/,/g);
    console.log(title,field,inline);
    mainField.push(createField(title.replace(/-/g, " "), field.replace(/-/g, " "), inline === "t"));
  };
  let main = null;
  let job = new CronJob(schDay, async () => {
    // console.log('You will see this message every minute');
    let em = createEmbed(maintitle, maindescription, mainField);
    msg.channel.send({ embed: em });
    // console.log(job);
    job.stop();
  }, null, true, 'Asia/Tokyo');

  tmp = subfields.split(/:\?:/g);
  console.log(tmp);

  let subField = [];
  for (t of tmp) {
    [title, field, inline] = t.split(/,/g);
    subField.push(createField(title.replace(/-/g, " "), field.replace(/-/g, " "), inline === "t"));
  };

  let embed = createEmbed(
    "カウントダウン",
    "0:00:00:00",
    subField
  );
  let countdown = await msg.channel.send({ embed: embed });

  let see = new CronJob('*/5 * * * * *', async () => {
    let next = job.nextDate();
    // console.log(next);
    let diff = Math.ceil(next.diff(Moment(new Date()), 's', true));
    let second = (diff % 60).toString();
    let minute = (Math.floor(diff / 60) % 60).toString();
    let hour = (Math.floor(diff / (60 * 60)) % 24).toString();
    let day = (Math.floor(diff / (24 * 60 * 60))).toString();
    // console.log(diff, "\n", day, hour, minute, second);
    let time = day + ":";
    if (hour.length < 2) time += "0";
    time += hour + ":";
    if (minute.length < 2) time += "0";
    time += minute + ":";
    if (second.length < 2) time += "0";
    time += second;

    if (!job.running) {
      await countdown.delete().catch((err) => {
        console.log(err);
      });
      see.stop();
      return;
    }

    embed = { ...embed, description: time };
    // console.log(embed);
    await countdown.edit({ embed: embed }).then(() => {
      // console.log("edited");
    }).catch((err) => {
      console.log(err);
    });
  }, null, true, 'Asia/Tokyo');
};


module.exports = {
  name: 'reminder',
  aliases: ['rd'],
  description: 'This is a countdown function',
  example: 'rk!rd countdown 00-23-18-*-*-* テスト 説明文 test,hi,t:?:t,h,f countdown,well,f:?:cc,we,t',
  cooldown: 1,
  execute(client, message, args, cmd, Discord, profileData) {
    // console.log(args);
    let [a0, a1, ...rest] = args;
    console.log(rest);
    if (a0 === 'create' && rest.length >= 2) {
      while (rest.length < 6) rest.push(null);
      let [s, m, h, d] = rest.slice(2);
      create(Discord, message, a1 === "t", s, m, h, d);
    } else if (a0 === 'creates') {
      createSchedule(Discord, message, a1 === "t", rest[0].replace(/-/g, " "));
    } else if (a0 === 'countdown') {
      while (rest.length < 6) rest.push(null);
      let [maintitle, maindescription, mainfields, subfields] = rest;
      createCountdown(message, a1.replace(/-/g, " "), maintitle.replace(/-/g, " "), maindescription.replace(/-/g, " "), mainfields, subfields);
    } else if (a0 === 'start') {
      for (job of jobs) {
        job.start();
      }
    } else if (a0 === 'stop') {
      for (job of jobs) {
        job.stop();
      }
    }
  },
};
