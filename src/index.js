const { Client, Collection } = require('discord.js');
const keepAlive = require("./utils/server");
const commands = require("./commands")
const Classes = require("./classes")
const calcTime = require('./utils/timeIST')
const data = require('../data.json')
require('dotenv').config();
const fs = require('fs')

const token = process.env['token']
const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();

function init() {
    Object.values(commands).forEach(command => {
        client.commands.set(command.name, command);
        if (command.aliases) {
            for (const alias of command.aliases) {
              client.aliases.set(alias, command.name);
            }
        }
    })
}
init()
const send = (text) => {
    const channel = client.channels.cache.get(data.channel);
    channel.send(`<@&${data.role}> ` + text)
}
const notif = () => {
        if(!data.enabled) clearInterval(interval)
        var ok = calcTime().getHours()
        if (!(ok >= 8 && ok <= 14)) {
            console.log("DONE FOR THE DAY")
            return; 
        }
        var time = calcTime()
        var day = time.getDay()
        var formatedStartEndTImes = Classes.formatAllTimes()
        var period = formatedStartEndTImes[0].indexOf(Classes.formatTimeHM(time));
        if(period > -1) {
          send(`HEY SKOOL TIME :O\nDay:\`${time.toLocaleString('en-us', {  weekday: 'long' })}\`\nClass: \`${Classes.timeTable[day][period]}\`\nTimes:\`${Classes.formatTimeHM(Classes.startTimes[period])} - ${Classes.formatTimeHM(Classes.endTimes[period])}\``)
        }
        console.log(Classes.formatTimeHM(time));
    }

client.on('ready', (e) => {
    console.log('Bot is ready...', e);
    client.user.setActivity(data.prefix+'help');
    if (data.enabled) {
      notif()
      global.interval = setInterval(notif, 60000)
    }
  })
  .on('message', (message) => {
    if (!message.content.startsWith(data.prefix)) return;
    if (message.author.bot) return;
    const messageSplit = message.content.split(/\s+/g);
    const cmd = messageSplit[0].slice(data.prefix.length);
    const args = messageSplit.slice(1);
    try {
      let command;
      if (client.commands.has(cmd)) {
        command = client.commands.get(cmd);
      } else if (client.aliases.has(cmd)) {
        command = client.commands.get(client.aliases.get(cmd));
      }
      if (!command) return;
      if(command.depends) return command.execute(client, message, args, Classes); 
      command.execute(client, message, args);
    } catch (err) {
      console.error(err);
      fs.writeFileSync("../debug.log", err.toString(), 'utf8')
    }
});
keepAlive();
client.login(token);