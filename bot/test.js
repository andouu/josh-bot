const fs = require('fs');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));

const commands = [];
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    console.log(command.data.name);
}