module.exports = {
	name: 'server',
    description: 'Shows the server info.',
    guildOnly: true,
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}\nCreation Date: ${message.guild.createdAt}`);
	},
};