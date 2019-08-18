module.exports = {
	name: 'setgame',
	description: 'Set the bot\'s status.',
	args: true,
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
		
		else {
			try {
				message.client.user.setPresence({ game: { name: `${gameName.join(' ')}`, type: 0 } });
				message.reply(string.setGameSuccess);
				console.info(`Game status set to \"${gameName.join(' ')}\" by ${message.author.tag}`);
			}
		
			catch {
				message.reply(string.setGameError);
				return console.error(error);
			}
		}
	}
};