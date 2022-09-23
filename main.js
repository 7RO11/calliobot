require("dotenv").config()
const { Client, GatewayIntentBits, Message } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder, Routes } = require('discord.js');
const clientId = "1020416137395195975"
var cron = require('node-cron');
const axios = require('axios').default;
const bullshit = require("/Users/thesl/Documents/callio/beta/Wrapper-Offline/wrapper/_ASSETS/database.json")

const commands = [
	new SlashCommandBuilder().setName('grounded').setDescription('get grounded'),
	new SlashCommandBuilder().setName('quote').setDescription('get quoted'),
	new SlashCommandBuilder().setName('bank').setDescription('get banked'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
	const channel = client.channels.cache.get("1019107379293458493")
	const garbage = client.channels.cache.get("519205600979189762")

    axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLfSAyHiioVrgrzyUM0s5Edl04hDK4-F0u&5&pageToken=EAAaB1BUOkNKWUI&key=${process.env.yt}`).then((res) => {
        data = res.data.items[res.data.items.length - 1];
    })


    cron.schedule("10 8 * * *", () => {
        channel.send(`https://www.youtube.com/watch?v=${data.snippet.resourceId.videoId} time for your daily dose of caillio cancer`)
		garbage.send(`https://www.youtube.com/watch?v=${data.snippet.resourceId.videoId} time for your daily dose of caillio cancer`)
    });

	// cron.schedule("29 18 * * *", () => {
    //     // channel.send(`https://www.youtube.com/watch?v=${data.snippet.resourceId.videoId} time for your daily dose of caillio cancer`)
	// 	garbage.send(`https://www.youtube.com/watch?v=${data.snippet.resourceId.videoId} time for your daily dose of caillio cancer`)
    // });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

    const times = ["planck units", "nanoseconds", "milliseconds", "seconds", "minutes", "hours", "days", "weeks", "month", "years", "decades", "centuries", "millenniums", "eterneties"]

    var randNum =  Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;
    var randTime = times[Math.floor(Math.random() * times.length)]

	const { commandName } = interaction;

	if (commandName === 'grounded') {
		await interaction.reply(`how dare you use the grounded command thats fucking it you are grounded grounded grounded for ${randNum} ${randTime}!`);
	} else if (commandName === 'quote') {
		let randombull = bullshit.assets[Math.floor(Math.random() * bullshit.assets.length)]
		while (randombull.title === "Untitled") {
			randombull = bullshit.assets[Math.floor(Math.random() * bullshit.assets.length)]
		}
		await interaction.reply(randombull.title)
	} else if (commandName === 'bank') {
		await interaction.reply(`there is currently ${bullshit.assets.length} possible quotes to pick from`)
	}
});

client.login(process.env.token);
