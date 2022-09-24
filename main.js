require("dotenv").config()
// REMEMBER TO CHANGE TEST
// REMEMBER TO CHANGE TEST
// REMEMBER TO CHANGE TEST
// REMEMBER TO CHANGE TEST
// REMEMBER TO CHANGE TEST
// REMEMBER TO CHANGE TEST
const TEST = false
const { Client, GatewayIntentBits, SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const cron = require('node-cron');
const axios = require('axios').default;
const bullshit = require("/Users/thesl/Documents/callio/beta/Wrapper-Offline/wrapper/_ASSETS/database.json")
const channelGroups = require("./channels.json")
const clientId = "1020416137395195975"
const channels = TEST ? channelGroups.devChannel : channelGroups.channels

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
	cron.schedule("10 8 * * *", () => {
		axios.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLfSAyHiioVrgrzyUM0s5Edl04hDK4-F0u&5&pageToken=EAAaB1BUOkNKWUI&key=${process.env.yt}`).then((res) => {
		data = res.data.items.filter((item) => {
			return item.snippet.title !== "Private video"
		})
		for (let channelId of channels) {
			let channel = client.channels.cache.get(channelId)
			channel.send(`https://www.youtube.com/watch?v=${data[data.length - 1].snippet.resourceId.videoId} time for your daily dose of caillio cancer`)
		}
	})
	});
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
