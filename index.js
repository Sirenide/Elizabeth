const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

// console time stamp
require('console-stamp')(console, '[hh:MM:ss TT]' || options.include());

// moment-tz.js
const moment = require('moment-timezone');
const formattedDate = moment().tz('America/New_York').format('dddd, MMMM Do YYYY hh:mm:ss A z');

// Commands that only takes note of files with .js extension
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log(`Awakened: ${formattedDate}`);
	console.log(`\"${client.user.tag} is ready to feast.\"`);
	console.log(`Started with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);
});


client.on('guildCreate', guild => {
	// This event triggers when the bot joins a guild.
	console.log(`I joined something new~\nServer Name: ${guild.name} (${guild.id})\nMaiden Count: ${guild.memberCount}\nCreation Date: ${guild.createdAt}`);
});

client.on('guildDelete', guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`Removed from:\nServer: ${guild.name} (${guild.id})`);
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	// Returns a console message if a user uses a bot command
	console.info(`${formattedDate}\nCommanded with the following request:\nUser: ${message.author.tag} (${message.author.id})\nServer: ${message.guild.name} (${message.guild.id})\nChannel: ${message.channel.name} (${message.channel.id})\nMessage: ${prefix}${command.name} ${args.join(' ')}`);

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	// If guildOnly commands were sent to DMs
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs.');
	}

	// For command cooldowns
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
		message.reply(`did you drop your cat on the keyboard or something?\n(Type \`${prefix}help\` for commands)`);
	}

});

client.login(token);