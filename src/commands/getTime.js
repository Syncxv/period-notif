const calcTime = require("../timeIST")

module.exports = {
    name: 'time',
    aliases: ['t'],
    execute(client, message, args, _this) {
      const time = calcTime();
      const min = time.getMinutes().toString()
      message.channel.send(`${time.getHours()}:${min.length <= 1 ? "0"+ min : min}`);
    },
  };