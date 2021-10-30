const { SlashCommandBuilder } = require('@discordjs/builders');
const replyData = require('../data/replyData.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('acronyms')
        .setDescription('Lists information about acronyms'),
    async execute(message) {
        let adjDetails = 'All adjectives:\n';
        const adjectives = replyData.data.adjectives;
        Object.keys(adjectives).forEach(adj => {
            adjDetails += `**${adj}**:\n- ${adjectives[adj].join(', ')}\n`;
        });
        
        let peopleDetails = 'All people:\n';
        const people = replyData.data.people;
        Object.keys(people).forEach(firstLetter => {
            peopleDetails += `**${firstLetter}**:\n- ${people[firstLetter].join(', ')}\n`;
        });

        const combinedMsg = `**Do $help for info on how to activate an acronym.**\n\n${adjDetails}\n${peopleDetails}`;
        await message.channel.send(combinedMsg);
    }
}