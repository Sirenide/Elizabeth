module.exports = {
	name: 'kick',
	description: 'Kicks a member from the server.',
	guildOnly: true,
	async execute(message, args) {

		const member = message.mentions.members.first() || message.guild.members.get(args[0]);

		const fs = require('fs');
		const fetchJSON = fs.readFileSync('./strings/strings.json');
		const string = JSON.parse(fetchJSON);

				/*
        If the kick function will be disabled, use this
        message.channel.send(string.commandDisabled);
         */

		if (!member) {
			return message.reply(string.invalidMember);
		}

		else if (!member.kickable) {
			return message.reply(string.kickError);
		}

		else if (message.member.hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])) {
			try {
				let reason = args.slice(1).join(' ');
				if (!reason) reason = 'No reason provided.';

				// Kicking the member
				await member.kick(reason)
					.catch(error => message.reply(`Sorry ${message.author}, I couldn't kick because of: ${error}`));
				message.reply(`${member.user.tag} has been kicked by ${message.author.tag}\nReason: ${reason}`);
			}

			catch {
				return message.reply(string.noPerms);
			}
		}
	},
};