module.exports = {
	name: 'kick',
	description: 'Kicks a member from the server.',
	guildOnly: true,
	async execute(message, args) {

		// Current problem: The command won't read the JSON file the command works
		/*
        If the kick function will be disabled, use this
        message.channel.send('Sorry babe, it\'s disabled.');
         */

		const member = message.mentions.members.first() || message.guild.members.get(args[0]);

		const fs = require('fs');
		const fetchJSON = fs.readFileSync('./strings/strings.json');
		const string = JSON.parse(fetchJSON);

		if (!member) {
			return message.reply(string.InvalidMember);
		}

		if (!member.kickable) {
			return message.reply(string.KickError);
		}

		if (message.member.hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])) {
			try {
				// slice(1) removes the first part, which here should be the user mention or ID
				// join(' ') takes all the various parts to make it a single string.
				let reason = args.slice(1).join(' ');
				if (!reason) reason = 'No reason provided.';

				// Kicking the member
				await member.kick(reason)
					.catch(error => message.reply(`Sorry ${message.author}, I couldn't kick because of: ${error}`));
				message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason} \nHow rough~`);

			}

			catch {
				return message.reply(string.NoPerms);
			}
		}

		/* Kicking with a gif

        let member = message.mentions.members.first();
        member.kick().then((member) => {

            // Searching giphy for gifs
            // where q: "searchTerm"
            giphy.search('gifs', {"q": "fail"})
                .then((response) => {
                    var totalResponses = response.data.length;
                    var responseIndex = Math.floor((Math.random() * 10) +1) % totalResponses;
                    var responseFinal = response.data[responseIndex];


                    // Message sent to discord after kicking
                    message.channel.send(":wave: " + member.displayName + " has been kicked!", {
                        // The gif image sent
                        files: [responseFinal.images.fixed_height.url]
                    })

                })
                .then((response) =>{
                message.channel.send(":wave: " + member.displayName + " has been kicked!"
                )}

                // If an error occured while kicking
                .catch(() => {
                    message.channel.send("Error Kicking!");
                })


            })
        }
        */
	},
};