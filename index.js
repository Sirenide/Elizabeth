const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token, giphyToken} = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Giphy
var GphApiClient = require('giphy-js-sdk-core');
giphy = GphApiClient(giphyToken);

// Commands that only takes note of files with .js extension
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
})

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
    		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    	}

        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('I can\'t execute that command inside DMs!');
        }    

    try {
        command.execute(message, args);
    } 
    
    catch (error) {
        console.error(error);
        message.reply('did you drop your cat on the keyboard or something?');
    }
})

client.login(token);