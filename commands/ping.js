module.exports = {
	name: 'ping',
	cooldown: 5,
	description: 'Ping?',
	async execute(message, args) {
		const m = await message.channel.send("Ping?");
    	m.edit(`Pong~ Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
	},
};