module.exports = {
	name: 'setgame',
	description: 'Set the bot\'s game overlay.',
	args: true,
	guildOnly: true,
	execute (message, args) {
		const { ownerID } = require('../config.json');
		const fs = require('fs');
		const fetchJSON = fs.readFileSync('./strings/strings.json');
		const string = JSON.parse(fetchJSON);
		const gameName = args.slice(' ');

		if (message.author.id !== ownerID) {
			message.reply(string.notOwner);
			return console.warn('Bot owner command was used: ' + error);
		}

		switch (gameName[0].slice(0)) {
			case 'playing': {
				message.client.user.setPresence({ game: { name: `${gameName.slice(1).join(' ')}`, type: 0 } });
				message.reply(string.setGameSuccess);
				console.info(`Game status set to \"$${gameName.slice(1).join(' ')}\" by ${message.author.tag}`);
				break;
			}
			case 'streaming': {
				message.client.user.setPresence({ game: { name: `${gameName.slice(1).join(' ')}`, type: 1 } });
				message.reply(string.setGameSuccess);
				console.info(`Game status set to \"${gameName.slice(1).join(' ')}\" by ${message.author.tag}`);
				break;
			}

			case 'listening': {
				message.client.user.setPresence({ game: { name: `${gameName.slice(1).join(' ')}`, type: 2 } });
				message.reply(string.setGameSuccess);
				console.info(`Game status set to \"${gameName.slice(1).join(' ')}\" by ${message.author.tag}`);
				break;
			}

			case 'watching': {
				message.client.user.setPresence({ game: { name: `${gameName.slice(1).join(' ')}`, type: 3 } });
				message.reply(string.setGameSuccess);
				console.info(`Game status set to \"${gameName.slice(1).join(' ')}\" by ${message.author.tag}`);
				break;
			}
		}
	}
};