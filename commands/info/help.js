module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const { prefix } = require('../../config.json');
		const fs = require('fs');
		const fetchJSON = fs.readFileSync('./strings/strings.json');
		const string = JSON.parse(fetchJSON);
		const data = [];
		const { commands } = message.client;

		// Pre-made help from discordjs.guide => To rewrite

		if (!args.length) {
			data.push(`Hello, I\'m Elizabeth and I'm still under construction. My prefix is \`${prefix}\`.`);
			data.push('Here\'s a list of all my commands:');
			data.push(commands.map(command => command.name).join('\n'));
			data.push(`\nYou can send \`${prefix}help commandname\` to get info on a specific command.`);

			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.react('✅');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply(string.cantDM);
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command.');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};