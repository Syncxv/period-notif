module.exports = {
    name: 'remind',
    aliases: ['rem', 'r'],
    execute(client, message, args) {
        console.log("BRO")
        console.log(message.author.id)
        let user = client.users.fetch(message.author.id)
        let statusUser = user.presence.status
        console.log(user, statusUser)
    },
  };