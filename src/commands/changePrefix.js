const data = require('../../data.json')
const path = require('path')
const fs = require('fs')
module.exports = {
    name: 'prefix',
    aliases: ['p'],
    execute(client, message, args) {
        if(!args.length) return message.channel.send("current prefix is: " + data.prefix)
        if(args[0] === "-change") {
            data.prefix = args[1]
            fs.writeFileSync(path.resolve(__dirname, '..', '..', 'data.json'), JSON.stringify(data), 'utf8');
            message.channel.send("DONE :D new prefix: " + args[1])

        }
    },
  };