const Discord = require('discord.js');

const Schema = require('../../database/models/userBans');

const webhookClientLogs = new Discord.WebhookClient({
    id: "1053360514090139769",
    token: "kgOR02SDOgp32DGQd6XliXXF6af8Vt7ILV6hWug19VT_rmdqDPHe7v2irp9WHplUo3tX",
});

module.exports = async (client, interaction, args) => {
    const boolean = interaction.options.getBoolean('new');
    const member = interaction.options.getUser('user');

    if (boolean == true) {
        Schema.findOne({ User: member.id }, async (err, data) => {
            if (data) {
                return client.errNormal({
                    error: `<@!${member.id}> (${member.id}) has already been banned from the bot`,
                    type: `editreply`
                }, interaction);
            }
            else {
                new Schema({
                    User: member.id
                }).save();

                client.succNormal({
                    text: `<@!${member.id}> (${member.id}) banned from the bot`,
                    type: 'editreply'
                }, interaction)

                let embedLogs = new Discord.MessageEmbed()
                    .setTitle(`🔨・Ban added`)
                    .setDescription(`<@!${member.id}> (${member.id}) banned from the bot`)
                    .addField('👤┆Banned By', `${interaction.user} (${interaction.user.tag})`, true)
                    .setColor(client.config.colors.normal)
                    .setFooter(client.config.discord.footer)
                    .setTimestamp();
                webhookClientLogs.send({
                    username: 'Bot Bans',
                    embeds: [embedLogs],
                });
            }
        })
    }
    else if (boolean == false) {
        Schema.findOne({ User: member.id }, async (err, data) => {
            if (data) {
                Schema.findOneAndDelete({ User: member.id }).then(() => {
                    client.succNormal({
                        text: `<@!${member.id}> (${member.id}) unbanned from the bot`,
                        type: 'editreply'
                    }, interaction)

                    let embedLogs = new Discord.MessageEmbed()
                        .setTitle(`🔨・Ban removed`)
                        .setDescription(`<@!${member.id}> (${member.id}) unbanned from the bot`)
                        .addField('👤┆Unbanned By', `${interaction.user} (${interaction.user.tag})`, true)
                        .setColor(client.config.colors.normal)
                        .setFooter(client.config.discord.footer)
                        .setTimestamp();
                    webhookClientLogs.send({
                        username: 'Bot Bans',
                        embeds: [embedLogs],
                    });
                })
            }
            else {
                return client.errNormal({
                    error: `<@!${member.id}> (${member.id}) has not been banned from the bot`,
                    type: `editreply`
                }, interaction);
            }
        })
    }
}

 