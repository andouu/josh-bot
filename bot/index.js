const fs = require('fs');
const { Client, Collection, Intents, CommandInteractionOptionResolver } = require('discord.js');
const { token } = require('./config.json');
const utils = require('./components/utils');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const acronyms = require('./data/replies.json').data.acronyms;

const prefix = '$';

client.once('ready', () => {
    console.log('ready');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.content[0] === prefix) {
        const isCommand = message.content.split(' ')[0].slice(1);
        
        if (!isCommand) return;
        
        const args = message.content.slice(1).split(' ');
        if (!args) return;

        if (message.type === 'REPLY') {
            if (args.length > 1) return;

            const acronym = args[0].toUpperCase();

            if(acronyms[acronym]) {
                try {
                    console.log(acronym);
                    const allMessages = acronyms[acronym];
                    const randomIndex = utils.randomInt(0, allMessages.length);
                    const messageToReply = await message.channel.messages.fetch(message.reference.messageId);
                    await messageToReply.reply({
                        content: utils.momentBuilder(acronyms[acronym][randomIndex]),
                        allowedMentions: {
                            repliedUser: false
                        }
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        } else {
            const command = client.commands.get(args[0]);

            if (!command) return;

            try {
                await command.execute(message);
            } catch (error) {
                console.error(error);
                await message.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    }
});

client.login(token);
