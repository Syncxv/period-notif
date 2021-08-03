const calcTime = require("../utils/timeIST")
const Classes = require('../classes')
module.exports = {
    name: 'time',
    description: 'Tells you the time idk why i made this, OH WAIT now i remember, it was a test to see if the india time zone was working :|',
    execute(client, message, args, _this) {
      const time = calcTime();
      message.channel.send(Classes.formatTimeHM(time));
    },
  };