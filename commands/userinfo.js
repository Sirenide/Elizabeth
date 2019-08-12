module.exports = {
	name: 'userinfo',
	description: 'Shows user info',
	guildOnly: true,
	execute(message) {
		message.channel.send(`Username: ${message.author.username}\nAccount ID: ${message.author.id}`);
	},
};