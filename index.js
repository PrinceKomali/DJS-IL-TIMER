 //IMPORT MODULES
const Discord = require('discord.js')
const ffmpeg = require('ffmpeg')
const ffprobe = require('ffprobe'),
    ffprobeStatic = require('ffprobe-static');
const ytdl = require('ytdl-core')
//IMPORT JSONS/DATA
const auth = require('./auth.json')
const filetypes = ["mp4", "mov", "flv", "mpeg"]
const window = require('./window.js')
//INITIALIZE THE CLIENT
const client = new Discord.Client()
client.login(auth.token)
client.on("ready", () => {
    client.user.setActivity('TESTING')
    console.log('Ready!')
})
//MESSAGE HANDLER
client.on("message", async message => {
    const { attachments, content, guild } = message
    if (message.content.startsWith("!time")) {
        if (message.attachments.size > 0) {
            //VIA FILE
            var file = attachments.array()[0]
            var filename = (file.name).split('.')
            filename = filename[filename.length - 1]
            if (!filetypes.includes(filename)) {
                message.channel.send("Please provide a valid file!");
                return
            }
                window.run(client, message, file.url, Discord)

        } else {
            //VIA YT
            const vid = ytdl(message.content.replace('!time', '').trim(), { filter: format => format.container === 'mp4' })
            const info = await ytdl.getInfo(message.content.replace('!time', '').trim());
            const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
            window.run(client, message, format.url, Discord)
        }
    }
})