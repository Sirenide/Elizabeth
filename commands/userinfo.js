module.exports = {
	name: 'userinfo',
    description: 'Shows user info',
    guildOnly: true,
	execute(message, args) {
		message.channel.send(`Username: ${message.author.username}\nAccount ID: ${message.author.id}`);
	},
};