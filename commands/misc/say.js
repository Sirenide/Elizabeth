module.exports = {
	name: 'say',
	description: 'I\'ll repeat what you say.',
	args: true,
	guildOnly: true,
	execute(message, args) {
		const sayMessage = args.join(' ');
		message.delete().catch(() => {});
		message.channel.send(sayMessage);
	},
};