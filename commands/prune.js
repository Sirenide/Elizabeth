module.exports = {
	name: 'prune',
    description: 'Prunes x number of messages.',
    guildOnly: true,
	execute(message, args) {
        const amount = parseInt(args[0]) + 1;
    
        if (isNaN(amount)) {
            return message.reply('That doesn\'t seem to be a valid number.');
        } 
        else if (amount <= 1 || amount > 100) {
            return message.reply('You need to input a number between 2 and 100.');
        }
        
        // Proceed pruning if the argument is valid
        message.channel.bulkDelete(amount, true).catch(err => {
            // If there was an error
			console.error(err);
            message.channel.send('There was an error trying to prune messages in this channel!');
            
        });

        message.channel.send('I deleted ' + (amount - 1) + ' messages.').then(msg => {
			msg.delete(1500)
		  });
                      
    },
};