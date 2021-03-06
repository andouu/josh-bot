require('dotenv').config();
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const utils = require('./components/utils');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const prefix = '$';

client.once('ready', () => {
    client.user.setActivity('yo mama', { type: 'PLAYING' });
    client.user.setStatus('dnd');
    console.log('Locked and cocked!');
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

            if(acronym.length > 2) return;

            try {
                const messageToReply = await message.channel.messages.fetch(message.reference.messageId);
                await messageToReply.reply({
                    content: utils.momentBuilder(acronym),
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            } catch (error) {
                console.error(error);
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

client.login(process.env.BOT_TOKEN);
