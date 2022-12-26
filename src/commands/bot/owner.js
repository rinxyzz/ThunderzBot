const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `・Owner information`,
        desc: `I'm a software developer in my free time and student living in UK, I like to make android apps, websites, discord bots. I'm good in Html, Css, Kotlin, Java, & JavaScript.`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "<:blue_crown:1012017210992115812> ┆ Owner name",
            value: `RinSCH`,
            inline: true,
        },
        {
            name: "<:discord:1012017257158824027> ┆ Discord tag",
            value: `RinSchariacs#4797`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 