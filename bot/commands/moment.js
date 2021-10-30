const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moment')
        .setDescription('Replies with a moment!'),
    async execute(message) {
        await message.reply({
			content: 'Moment!',
			allowedMentions: {
				repliedUser: false
			}
		});
    },
};