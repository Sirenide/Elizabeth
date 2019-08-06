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

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log('Ready!');
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(`with ${client.guilds.size} wonderful maidens`);
})

client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setActivity(`with ${client.guilds.size} wonderful maidens`);
  });
  
  client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`with ${client.guilds.size} beautiful maidens`);
  });

client.on('message', async message => {

    // Only allow commands in #bot-cave
    if (!msg.channel.id === '512985991620067368') return;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
    		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    	}

        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('I can\'t execute that command inside DMs.');
        }
    
    if (!cooldowns.has(command.name)) {
	    cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const cdtimestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (cdtimestamps.has(message.author.id)) {
        const expirationTime = cdtimestamps.get(message.author.id) + cooldownAmount;
    
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
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