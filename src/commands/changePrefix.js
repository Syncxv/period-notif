const data = require('../../data.json')
const path = require('path')
const write = require('../utils/wirteJson')
module.exports = {
    name: 'prefix',
    aliases: ['p'],
    usage: "{c} [ -change / none ] [ prefix ]",
    description: 'Lets you change the prefix of the bot :D',
    execute(client, message, args) {
        if(!args.length) return message.channel.send("current prefix is: " + data.prefix)
        if(args[0] === "-change") {
            data.prefix = args[1]
            client.user.setActivity(data.prefix+'help');
            message.channel.send("DONE :D new prefix: " + args[1])
            
        }
    },
  };