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
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`with ${client.guilds.size} wonderful girls`);
})

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });
  
  client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`with ${client.guilds.size} beautiful women`);
  });

client.on('message', async message => {

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