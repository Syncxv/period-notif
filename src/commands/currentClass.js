const { currentClass } = require("../classes");

module.exports = {
    name: 'class',
    aliases: ['c', 'period'],
    usage: "{c} [ -next / -perv / none ]",
    description: 'tells you what class it is (IN PROGRESS)',
    depends: true,
    execute(client, message, [type], ClassesModule) {
        if(!type) {
            const _class = ClassesModule.getCurrentClass();
            _class ? message.channel.send(`Class: \`${_class}\``) : message.channel.send("NO CLASS :D")
        }
        if(type == "-next" || type == "next" || "n") {
            const _class = ClassesModule.getCurrentClass("next")
            _class ? message.channel.send(`Class: \`${_class}\``) : message.channel.send("no class after this :O")
        }
    },
  };