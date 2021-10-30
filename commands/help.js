const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Sends the user information about the Joosh bot.'),
    async execute(message) {
        await message.author.send(
            `:computer: **Commands**:
        - **$help**: Sends the user information about the Joosh bot.
        - **$acronyms**: Lists currently available adjectives and names.
        - **$[acronym]**: Only works when **replying** to a message. Joosh will reply to the message you replied to with an [acronym] moment! Note: this command isn't case sensitive.`
        );
    }
}