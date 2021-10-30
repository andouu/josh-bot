const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Replies with server info!'),
    async execute(message) {
        await message.reply({
            content: `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`,
            allowedMentions: {
				repliedUser: false
			}
        });
    },
};