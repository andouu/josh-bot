const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!'),
    async execute(message) {
        await message.reply({
            content: `Your tag: ${message.author.tag}\nYour id: ${message.author.id}`,
            allowedMentions: {
				repliedUser: false
			}
        });
    },
};