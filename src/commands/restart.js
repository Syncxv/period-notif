const restart = require('../utils/restart')
module.exports = {
    name: 'restart',
    usage: "{c}",
    description: 'Restarts the bot :|',
    execute(client, message, args) {
      restart(client, message)
    },
  };