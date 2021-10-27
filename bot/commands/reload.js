const { SlashCommandBuilder } = require('@discordjs/builders');
const api = require('../components/api.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reloads acronyms for the command $moment'),
    async execute(message) {
        try {
            const acros = await api.getAcronyms();
            message.reply('Reloaded Successfully! The acronyms are currently: ' + acros.join(', '));
        } catch(e) {
            console.error(e);
            message.reply('Something went wrong when trying to reload...');
        }
    }
}