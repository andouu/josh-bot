const { SlashCommandBuilder } = require('@discordjs/builders');
const api = require('../components/api.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads acronyms for the command $moment'),
    async execute(message) {
        try {
            const acros = await api.getAcronyms();
            await message.reply({
                content: 'Reloaded Successfully! The acronyms are currently: ' + acros.join(', '),
                allowedMentions: {
                    repliedUser: false
                }
            });
        } catch (error) {
            console.error(error);
            await message.reply({
                content: 'Something went wrong when trying to reload...',
                allowedMentions: {
                    repliedUser: false
                }
            });
        }
    }
}