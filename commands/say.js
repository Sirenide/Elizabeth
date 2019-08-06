module.exports = {
	name: 'say',
    description: 'I\'ll repeat what you say.',
    args: true,
	execute(message, args) {
		// makes the bot say something and delete the message. As an example, it's open to anyone to use. 
        // To get the "message" itself we join the `args` back into a string with spaces: 
        const sayMessage = args.join(" ");
        // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
        message.delete().catch(message => {}); 
        // And we get the bot to say the thing: 
        message.channel.send(sayMessage);
        },
};