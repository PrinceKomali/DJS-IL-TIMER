//IMPORT MODULES
const ffprobe = require('ffprobe'),
    ffprobeStatic = require('ffprobe-static');
const ffmpeg = require("fluent-ffmpeg")
const extractFrames = require('ffmpeg-extract-frame')
const fs = require('fs')
//OTHER VARIABLES
const timeReactions = ["◀️", "▶️", "⬅️", "➡️", "⏪", "⏩", "🟩", "🏁", "⛔"]
const auth = require('./auth.json')
const dumpingchannel = auth.dumpingchannel
//RUN THE SCRIPT
exports.run = (client, message, file, Discord) => {
    var frame = 0
    var st = 0
    var nd = 0
    var total = 0
    message.channel.send("Please wait...").then(msg => {
        //GET THE VIDEO INFO
        ffprobe(file, {
            path: ffprobeStatic.path
        }, function (err, info) {
            if (err) {
                return
                }
                var totalframes = info.streams[0].nb_frames
                message.channel.send("TIMER WILL BE LAGGY! Please wait if necessary").then(msg2 => {
                    var attachment = new Discord.MessageAttachment('./testimg.jpg', 'testimg.jpg')
                const embedThing = new Discord.MessageEmbed()
                    .setTitle("PLEASE WAIT FOR ALL REACTIONS TO LOAD!")
                    .attachFiles(attachment)
                    .setImage('attachment://testimg.jpg');
                    msg2.edit({ embed: embedThing });
                    //ADD THE REACTIONS
                    msg2.react("◀️")
                    msg2.react("▶️")
                    msg2.react("⬅️")
                    msg2.react("➡️")
                    msg2.react("⏪")
                    msg2.react("⏩")   
                    msg2.react("🟩")
                    msg2.react("🏁")
                    msg2.react("⛔").then(async () => {
                        msg.edit("Controls:\n:arrow_forward: = Frame Advance   :arrow_backward: = Go back a frame\n:arrow_right: = Forward 15f          :arrow_left: = Backwards 15f\n:fast_forward: = Forward 5s           :rewind: = Back 5s\n:green_square: = Set Start                :checkered_flag: = Set End\n:no_entry: = Cancel / End")
                        await extractFrames({
                            input: file,
                            output: './files/img.png',
                            offset: (1000 * frame / 30)
                        })
                        client.channels.cache.get(dumpingchannel).send({ files: ['./files/img.png'] }).then(imgmsg => {
                            const exampleEmbed = new Discord.MessageEmbed()
                                .setTitle((frame / 30).toFixed(3))
                                .addFields(
                                    { name: 'Start Time', value: st.toFixed(3), inline: true },
                                    { name: 'End time', value: nd.toFixed(3), inline: true },
                                    { name: 'Total', value: total.toFixed(3) },
                                )
                                .setImage(imgmsg.attachments.array()[0].url)



                            msg2.edit(exampleEmbed).then(() => {
                                fs.unlinkSync('./files/img.png')
                            });

                        })
                        const filter = (reaction, user) => {
                        return timeReactions.includes(reaction.emoji.name) && user != client.user;
                    }
                    var countdowntimer = 60000
                    setInterval(function () {
                        if (countdowntimer <= 0) {
                        } else {
                            countdowntimer--
                            
                        }
                    }, 1)
                    
                    const collector = msg2.createReactionCollector(filter, {
                        time: 999999999
                    });
                    
                        var testnum = 0
                        collector.on("collect", async (reaction, user) => {
                            console.log(`Collected ${reaction.emoji.name}  from ${user.tag}.`);

                            //GET EACH COMMAND
                            switch (reaction.emoji.name) {

                                case '◀️':
                                    countdowntimer = 60000
                                    frame = frame - 1
                                    await extractFrames({
                                        input: file,
                                        output: './files/img.png',
                                        offset: (1000 * frame / 30)
                                    })
                                    client.channels.cache.get(dumpingchannel).send({ files: ['./files/img.png'] }).then(imgmsg => {
                                        const exampleEmbed = new Discord.MessageEmbed()
                                            .setTitle((frame / 30).toFixed(3))
                                            .addFields(
                                                { name: 'Start Time', value: st.toFixed(3), inline: true },
                                                { name: 'End time', value: nd.toFixed(3), inline: true },
                                                { name: 'Total', value: total.toFixed(3) },
                                            )
                                            .setImage(imgmsg.attachments.array()[0].url)



                                        msg2.edit(exampleEmbed).then(() => {
                                            fs.unlinkSync('./files/img.png')
                                        });

                                    })
                                    msg2.reactions.resolve("◀️").users.remove(user.id);
                                    break;
                                case '▶️':
                                    countdowntimer = 60000
                                    msg2.reactions.resolve("▶️").users.remove(user.id)
                                    frame = frame + 1
                                    await extractFrames({
                                        input: file,
                                        output: './files/img.png',
                                        offset: (1000 * frame / 30)
                                    })
                                    client.channels.cache.get(dumpingchannel).send({ files: ['./files/img.png'] }).then(imgmsg => {
                                        const exampleEmbed = new Discord.MessageEmbed()
                                            .setTitle((frame / 30).toFixed(3))
                                            .setImage(imgmsg.attachments.array()[0].url)
                                            .addFields(
                                                { name: 'Start Time', value: st.toFixed(3), inline: true },
                                                { name: 'End time', value: nd.toFixed(3), inline: true },
                                                { name: 'Total', value: total.toFixed(3) },
                                            )



                                        msg2.edit(exampleEmbed).then(() => {
                                            fs.unlinkSync('./files/img.png')
                                        });

                                    })

                                    break;
                                case '⬅️':

                                    msg2.reactions.resolve("⬅️").users.remove(user.id)
                                    frame = frame - 15
                                    await extractFrames({
                                        input: file,
                                        output: './files/img.png',
                                        offset: (1000 * frame / 30)
                                    })
                                    client.channels.cache.get(dumpingchannel).send({ files: ['./files/img.png'] }).then(imgmsg => {
                                        const exampleEmbed = new Discord.MessageEmbed()
                                            .setTitle((frame / 30).toFixed(3))
                                            .setImage(imgmsg.attachments.array()[0].url)
                                            .addFields(
                                                { name: 'Start Time', value: st.toFixed(3), inline: true },
                                                { name: 'End time', value: nd.toFixed(3), inline: true },
                                                { name: 'Total', value: total.toFixed(3) },
                                            )


                                        msg2.edit(exampleEmbed).then(() => {
                                            fs.unlinkSync('./files/img.png')
                                        });

                                    })
                                    break;
                                case '➡️':
                                    msg2.reactions.resolve("➡️").users.remove(user.id)
                                    frame = frame + 15
                                    await extractFrames({
                                        input: file,
                                        output: './files/img.png',
                                        offset: (1000 * frame / 30)
                                    })
                                    client.channels.cache.get(dumpingchannel).send({ files: ['./files/img.png'] }).then(imgmsg => {
                                        const exampleEmbed = new Discord.MessageEmbed()
                                            .setTitle((frame / 30).toFixed(3))
                                            .setImage(imgmsg.attachments.array()[0].url)
                                            .addFields(
                                                { name: 'Start Time', value: st.toFixed(3), inline: true },
                                                { name: 'End time', value: nd.toFixed(3), inline: true },
                                                { name: 'Total', value: total.toFixed(3) },
                                            )



                                        msg2.edit(exampleEmbed).then(() => {
                                            fs.unlinkSync('./files/img.png')
                                        });

                                    })
                                    break;
                                case '⏪':
                                    msg2.reactions.resolve("⏪").users.remove(user.id)
                                    frame = frame - 150
                                    await extractFrames({
                                        input: file,
                                        output: './files/img.png',
                                        offset: (1000 * frame / 30)
                                    })
                                    client.channels.cache.get(dumpingchannel).send({ files: ['./files/img.png'] }).then(imgmsg => {
                                        const exampleEmbed = new Discord.MessageEmbed()
                                            .setTitle((frame / 30).toFixed(3))
                                            .setImage(imgmsg.attachments.array()[0].url)
                                            .addFields(
                                                { name: 'Start Time', value: st.toFixed(3), inline: true },
                                                { name: 'End time', value: nd.toFixed(3), inline: true },
                                                { name: 'Total', value: total.toFixed(3) },
                                            )


                                        msg2.edit(exampleEmbed).then(() => {
                                            fs.unlinkSync('./files/img.png')
                                        });

                                    })
                                    break;
                                case '⏩':
                                    msg2.reactions.resolve("⏩").users.remove(user.id)
                                    frame = frame + 150
                                    await extractFrames({
                                        input: file,
                                        output: './files/img.png',
                                        offset: (1000 * frame / 30)
                                    })
                                    client.channels.cache.get(dumpingchannel).send({ files: ['./files/img.png'] }).then(imgmsg => {
                                        const exampleEmbed = new Discord.MessageEmbed()
                                            .setTitle((frame / 30).toFixed(3))
                                            .setImage(imgmsg.attachments.array()[0].url)
                                            .addFields(
                                                { name: 'Start Time', value: st.toFixed(3), inline: true },
                                                { name: 'End time', value: nd.toFixed(3), inline: true },
                                                { name: 'Total', value: total.toFixed(3) },
                                            )


                                        msg2.edit(exampleEmbed).then(() => {
                                            fs.unlinkSync('./files/img.png')
                                        });

                                    })
                                    break




                                case '🟩':
                                    
                                    msg2.reactions.resolve("🟩").users.remove(user.id)
                                    st = frame / 30
                                    total = nd - st + (1/30)
                                    await extractFrames({
                                        input: file,
                                        output: './files/img.png',
                                        offset: (1000 * frame / 30)
                                    })
                                    client.channels.cache.get(dumpingchannel).send({ files: ['./files/img.png'] }).then(imgmsg => {
                                        const exampleEmbed = new Discord.MessageEmbed()
                                            .setTitle((frame / 30).toFixed(3))
                                            .setImage(imgmsg.attachments.array()[0].url)
                                            .addFields(
                                                { name: 'Start Time', value: st.toFixed(3), inline: true },
                                                { name: 'End time', value: nd.toFixed(3), inline: true },
                                                { name: 'Total', value: total.toFixed(3) },
                                            )



                                        msg2.edit(exampleEmbed).then(() => {
                                            fs.unlinkSync('./files/img.png')
                                        });

                                    })
                                    
                                    break;
                                case '🏁':
                                    msg2.reactions.resolve("🏁").users.remove(user.id)
                                    nd = frame / 30
                                    total = nd - st + (1 / 30)
                                    await extractFrames({
                                        input: file,
                                        output: './files/img.png',
                                        offset: (1000 * frame / 30)
                                    })
                                    client.channels.cache.get(dumpingchannel).send({ files: ['./files/img.png'] }).then(imgmsg => {
                                        const exampleEmbed = new Discord.MessageEmbed()
                                            .setTitle((frame / 30).toFixed(3))
                                            .setImage(imgmsg.attachments.array()[0].url)
                                            .addFields(
                                                { name: 'Start Time', value: st.toFixed(3), inline: true },
                                                { name: 'End time', value: nd.toFixed(3), inline: true },
                                                { name: 'Total', value: total.toFixed(3) },
                                            )



                                        msg2.edit(exampleEmbed).then(() => {
                                            fs.unlinkSync('./files/img.png')
                                        });

                                    })
                                    break;
                                case '⛔':

                                    msg2.reactions.resolve("⛔").users.remove(user.id)
                                    collector.stop()
                                    break;
                            }

                        });
                    
                    collector.on("end", (collected) => {
                        console.log(`Collected ${collected.size} items.`)
                    })
                });
            })
        });
    })

}
