module.exports = {
	name: 'kick',
    description: 'Kicks a member from the server.',
    guildOnly: true,
	execute(message, args) {
        if(message.member.hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])){
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
                
                // If an error occured while kicking
                .catch(() => {
                    message.channel.send("Error Kicking!");
                })

            })
        }
    },
};