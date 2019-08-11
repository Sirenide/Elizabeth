module.exports = {
	name: 'wb',
	description: 'World Boss Goat Timer. No reminder available yet.',
	execute(message, args) {
		const TOKEN_PATH = 'config.json';
		const fs = require('fs');
		const { google } = require('googleapis');
		const fetchJSON = fs.readFileSync('./strings/strings.json');
		const string = JSON.parse(fetchJSON);

		/**
			 * Create an OAuth2 client with the given credentials, and then execute the
			 * given callback function.
			 * @param {Object} credentials The authorization client credentials.
			 * @param {function} callback The callback to call with the authorized client.
			 */
		function authorize(credentials, callback, message) {
			const { client_secret, client_id, redirect_uris } = credentials.installed;
			const oAuth2Client = new google.auth.OAuth2(
				client_id, client_secret, redirect_uris[0]);

			// Check if we have previously stored a token.
			fs.readFile(TOKEN_PATH, (err, token) => {
				if (err) return getNewToken(oAuth2Client, callback);
				oAuth2Client.setCredentials(JSON.parse(token));
				callback(oAuth2Client, message);
			});
		}

		/**
			 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
			 */
		function listNextDay(auth, message) {
			const sheets = google.sheets({ version: 'v4', auth });
			sheets.spreadsheets.values.get({
				// Personal goat sheet
				spreadsheetId: '1wfGp6fZxmFSPIXmgTGxWkJuIzqngGh-PFac8UBsgrEI',
				range: 'Sheet1!A2:D2',
			},
			(err, res) => {
				if (err) return console.log('The API returned an error: ' + err);

				const rows = res.data.values;

				// moment-tz.js
				const moment = require('moment-timezone');
				const formattedTime = moment().tz('America/New_York').format('hh:mm:ss A z');
				const formattedDate = moment().tz('America/New_York').format('dddd, MMMM Do YYYY');

				const Discord = require('discord.js');

				if (rows.length) {

					try {
					// This prints the timer from the sheet
						rows.map((row) => {
							const wb = new Discord.RichEmbed()
								.setTitle('Olympus World Boss Timer Test 0.2 🐐')
								.setColor('#ff5252')
								.setDescription(`🔹**Channel:** ${row[0]} \`(X: 161, Y: 784)\`\n🔹**Next Spawn:** ${row[1]}\n🔹**Countdown:** ${row[2]}\n🔸**Server Time:** ${formattedTime}\n🔸**Server Date:** ${formattedDate}`)
								.addField('Source:', '🔸[Olympus World Boss Sheet](https://tinyurl.com/catalyst-ak)')
								.setFooter(`Requested by ${message.author.tag}`);

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
		fs.readFile('credentials.json', (err, content) => {
			if (err) return console.log('Error loading client secret file:', err);
			// Authorize a client with credentials, then call the Google Sheets API.
			// authorize(JSON.parse(content), authorizationCallback);
			authorize(JSON.parse(content), listNextDay, message);
		}
		);
	},
};