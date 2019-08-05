module.exports = {
	name: 'wb',
	description: 'World Boss Goat Timer',
	execute(message, args) {
		const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
		const TOKEN_PATH = 'token.json';
		const fs = require('fs');
		const {google} = require('googleapis');

		/**
		 * Create an OAuth2 client with the given credentials, and then execute the
		 * given callback function.
		 * @param {Object} credentials The authorization client credentials.
		 * @param {function} callback The callback to call with the authorized client.
		 */
		function authorize(credentials, callback, message) {
			const {client_secret, client_id, redirect_uris} = credentials.installed;
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
			const sheets = google.sheets({version: 'v4', auth});
			sheets.spreadsheets.values.get({
			  spreadsheetId: '1wfGp6fZxmFSPIXmgTGxWkJuIzqngGh-PFac8UBsgrEI',  // Personal goat sheet
			  range: 'Sheet1!A2:D2',
			}, (err, res) => {
			  if (err) return console.log('The API returned an error: ' + err);
			  const rows = res.data.values;
			  if (rows.length) {
				try{
				// This prints the timer from the sheet
				rows.map((row) => {
					message.channel.send(`**Channel:** ${row[0]}\n**Next Spawn:** ${row[1]}\n**Countdown:** ${row[2]}\n\n**Server Time:** ${row[3]}`);
				})
			}
			catch {
				console.log("ERROR");
			}
			  } else {
				message.channel.send('No data found.');
			  }
			  
			});
        }

		// This is where the bot executes sending the message
				fs.readFile('credentials.json', (err, content) => {
				if (err) return console.log('Error loading client secret file:', err);
				// Authorize a client with credentials, then call the Google Sheets API.
				//authorize(JSON.parse(content), authorizationCallback);
				  authorize(JSON.parse(content), listNextDay, message);
			  }
		)
	}
};