const cmds = require('./index')
const data = require('../../data.json')
module.exports = {
    name: 'help',
    aliases: ['halp', 'h'],
    usage: "{c} [ command ]",
    description: 'It sends the arguments you provide it hehe',
    execute(client, message, [commandName]) {
      const commands = Object.values(cmds);
      console.log(commandName)
      if(!commandName) {
        const getPropLength = (command) => command.name.length;
        const longestCommandName = getPropLength(commands.sort((a, b) => getPropLength(b) - getPropLength(a))[0])
    //     const embed = new MessageEmbed().setTitle('All Commands')
    //     .setDescription(commands.map(({ name, description }) =>
    //     `\`${name.padEnd((longestCommandName * 2) - name.length, ' \u200b')} |\` \u200b \u200b*${description}*`
    //   )
    //   .join('\n'))
    //   .setFooter(`Try ${data.prefix}help <command_name> hehe`);
    // OBJECT > ThaT GARBAGE MESSAGE EMBED THING ABOVE
    const embed = {
        type: 'rich',
        title: 'Help',
        description: `**__Status:__**\n\n**Running:** ${data.enabled}\n**Guild ID:** \`${data.guild}\`\n**Channel:** <#${data.channel}>/\`${data.channel}\`\n**Role:** <@&${data.role}>\n\n**__List Of Commands:__**\n\n${commands.map
            (({ name, description }) =>
                `\`${name.padEnd((longestCommandName * 2) - name.length, ' \u200b')} |\` \u200b \u200b*${description}*`
              )
              .join('\n')}`,
        footer: {
          text: `Try \`${data.prefix}help <commandName>\` hehe`
        }
      };
      message.channel.send({embed});
      } 
      else {
        const command = commands.find(c => [ c.name, ...(c.aliases || []) ].includes(commandName));
        if(!command) return message.channel.send("command doesnt exist :|")
        const embed = {
            type: 'rich',
            title: `\`${commandName}\``,
            description: "**__Description:__**\n"+command.description,
            fields: [ {
              name: '**__Usage:__**',
              value: command.usage ? `\` ${data.prefix}${command.usage.replace("{c}", command.name)} \`` : `\`${data.prefix}${command.name}\``,
              inline: false
            } ],
            footer: {
              text: `:D`
            }
          };
          message.channel.send({embed});
        }
      }
}
