module.exports = {
	name: 'wb',
	description: 'World Boss Goat Timer. No reminder available yet.',
	execute(message) {
		const TOKEN_PATH = 'config.json';
		const fs = require('fs');
		const { google } = require('googleapis');
		const fetchJSON = fs.readFileSync('./strings/strings.json');
		const string = JSON.parse(fetchJSON);

		// moment-tz.js
		const moment = require('moment-timezone');
		const formattedTime = moment().tz('America/New_York').format('hh:mm:ss A z');
		const formattedDate = moment().tz('America/New_York').format('dddd, MMMM Do YYYY');

		const Discord = require('discord.js');

		/**
		 * @param {Object} credentials The authorization client credentials.
		 * @param {function} callback The callback to call with the authorized client.
		 */
		function authorize (credentials, callback) {
			const { client_secret, client_id, redirect_uris } = credentials.installed;
			const oAuth2Client = new google.auth.OAuth2 (
				client_id, client_secret, redirect_uris[0]);

			// Previous token present?
			fs.readFile(TOKEN_PATH, (err, token) => {
				if (err) return message.reply(string.wbNoToken);
				// If user needs a new token, enable this statement and add getNewToken function
				/* if (err) {
				 *	return getNewToken(oAuth2Client, callback);
				 * }
				 */
				oAuth2Client.setCredentials(JSON.parse(token));
				callback(oAuth2Client, message);
			});
		}

		/**
		 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
		 */
		function goatPresence(auth) {
			const sheets = google.sheets({ version: 'v4', auth });
			sheets.spreadsheets.values.get({
				// Personal goat sheet
				spreadsheetId: '1wfGp6fZxmFSPIXmgTGxWkJuIzqngGh-PFac8UBsgrEI',
				range: 'Sheet1!A2:D2',
			},

			(err, res) => {
				if (err) return console.log('The API returned an error: ' + err);

				const rows = res.data.values;

				if (rows.length) {

					try {
					// This prints the timer from the sheet
						rows.map((row) => {
							const wb = new Discord.RichEmbed()
								.setTitle('Olympus World Boss Timer Test 0.2 🐐')
								.setDescription(`• **Channel:** ${row[0]} \`(X: 161, Y: 784)\`\n• **Next Spawn:** ${row[1]}\n• **Countdown:** ${row[2]}\n• **Server Time:** ${formattedTime}\n• **Server Date:** ${formattedDate}`)
								.addField('Source:', '• [Olympus World Boss Sheet](https://tinyurl.com/catalyst-ak)')
								.setFooter(`Requested by ${message.author.tag}`, 'https://i.imgur.com/qKiMtIX.png');
							message.channel.send(wb);
						});
					}

					catch {
						message.channel.send(string.wbCantData);
					}
				}
				else {
					message.channel.send(string.wbNoData);
				}

			});
		}

		// This is where the bot executes sending the message
		fs.readFile('config.json', (error, content) => {
			if (error) return console.log('Error loading client secret file:', error);
			authorize(JSON.parse(content), goatPresence, message);
		}
		);
	},
};