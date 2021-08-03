const data = require('../../data.json')
const write = require('../utils/wirteJson')
module.exports = {
    name: 'toggle',
    usage: "{c}",
    description: 'toggles on / off the notifer',
    execute(client, message, args) {
        data.enabled = !data.enabled
        write(data)
        message.channel.send(`\`State: ${data.enabled}\``)
        return
    },
  };