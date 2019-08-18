module.exports = {
	name: 'serverinfo',
	description: 'Shows the server info.',
	guildOnly: true,
	execute(message) {
		const fs = require('fs');
		const fetchJSON = fs.readFileSync('./strings/strings.json');
		const string = JSON.parse(fetchJSON);
		const Discord = require('discord.js');

		let serVL = [
			"None",
			"Low",
			"Medium",
			"(╯°□°）╯︵  ┻━┻",
			"┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"
		];

		const serverInfo = new Discord.RichEmbed()
			.setTitle(string.serverInfo)
			.setThumbnail(message.guild.iconURL)
			.addField(string.serverName, message.guild.name, true)
			.addField(string.serverID, message.guild.id, true)
			.addField(string.serverOwner, `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
			.addField(string.serverCreation, message.guild.createdAt.toUTCString().substr(0, 16), true)
			.addField(string.serverMembers, message.guild.members.filter(member => !member.user.bot).size, true)
			.addField(string.serverBots, message.guild.members.filter(member => member.user.bot).size, true)
			.addField(string.serverVerif, serVL[message.guild.verificationLevel], true)
			.addField(string.serverChannels, message.guild.channels.size, true)
			.setFooter(`Requested by ${message.author.tag}`, 'https://i.imgur.com/qKiMtIX.png')
		message.channel.send(serverInfo);
	},
};