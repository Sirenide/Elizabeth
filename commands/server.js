module.exports = {
	name: 'server',
    description: 'Shows the server info.',
    guildOnly: true,
	execute(message, args) {
		message.channel.send(`Server name: ${message.guild.name}
        \n
        Total Members: ${message.guild.memberCount}
        \n
        Creation Date: ${message.guild.createdAt}`);
	},
};