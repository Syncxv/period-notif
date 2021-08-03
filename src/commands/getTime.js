const calcTime = require("../timeIST")
const Classes = require('../classes')
module.exports = {
    name: 'time',
    execute(client, message, args, _this) {
      const time = calcTime();
      message.channel.send(Classes.formatTimeHM(time));
    },
  };