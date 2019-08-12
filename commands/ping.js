module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'Ping?',
	async execute(message) {
		const ping = await message.channel.send('Ping?');
		ping.edit(`Pong~ Latency is ${ping.createdTimestamp - message.createdTimestamp}ms.`);
	},
};