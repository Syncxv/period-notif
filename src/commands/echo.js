
module.exports = {
    name: 'echo',
    aliases: ['say', 'repeat'],
    execute(client, message, args) {
        console.log("BRO")
      message.channel.send(args.join(" "));
    },
  };