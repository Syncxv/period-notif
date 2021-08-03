require('dotenv').config();
const token = process.env['token']
module.exports = (client, message) => {
    message.channel.send('Restarting...')
    // process.on("exit", function () {

    //     require("child_process").spawn(process.argv.shift(), process.argv, {
    //         cwd: process.cwd(),
    //         detached : true,
    //         stdio: "inherit"
    //     });
    // });
    //right now it just turns it off :|
    process.exit(1);
    
}