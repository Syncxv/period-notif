const { Client, Collection } = require('discord.js');
const commands = require("./commands")
const Classes = require("./classes")
const calcTime = require('./timeIST')
require('dotenv').config();
const token = process.env['token']
const client = new Client();
client.commands = new Collection();
client.aliases = new Collection();
const prefix = "!"
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
    const channel = client.channels.cache.get('773024516200595496');
    channel.send(text)
}
const notif = () => {
        var ok = calcTime().getHours()
        if (!(ok >= 8 && ok
            <= 14)) {
            console.log("DONE FOR THE DAY")
            return; 
        }
        var time = calcTime()
        var formatedStartEndTImes = Classes.formatAllTimes()
        // formatedStartEndTImes[0].push(Classes.formatTimeHM(Classes.addMinutes(new Date(), 1)))
        if(formatedStartEndTImes[0].indexOf(Classes.formatTimeHM(time))) {
          send("HEY SKOOL TIME :O")
        }
        console.log(Classes.formatTimeHM(time), formatedStartEndTImes[0]);
        // console.log(calcTime().getTime())
    }

client.on('ready', (e) => {
    console.log('Bot is ready...', e);
    notif()
    var interval = setInterval(notif, 60000)
  })
  .on('message', (message) => {
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;
    if (message.channel.type !== 'text') return;
    const messageSplit = message.content.split(/\s+/g);
    const cmd = messageSplit[0].slice(prefix.length);
    const args = messageSplit.slice(1);
    try {
      let command;
      if (client.commands.has(cmd)) {
        command = client.commands.get(cmd);
      } else if (client.aliases.has(cmd)) {
        command = client.commands.get(client.aliases.get(cmd));
      }
      console.log(message.author.presence[0])
      if (!command) return;
      command.execute(client, message, args);
    } catch (err) {
      console.error(err);
    }
  });

client.login(token);