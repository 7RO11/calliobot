require("dotenv").config();
// REMEMBER TO CHANGE TEST
// REMEMBER TO CHANGE TEST
// REMEMBER TO CHANGE TEST
// REMEMBER TO CHANGE TEST
// REMEMBER TO CHANGE TEST
// REMEMBER TO CHANGE TEST
const TEST = false;
const {
	Client,
	GatewayIntentBits,
	SlashCommandBuilder,
	Routes,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const cron = require("node-cron");
const axios = require("axios").default;
const mongoose = require("mongoose");
const os = process.platform;
// const bullshit = os === "linux" ? require("/mnt/c/Users/thesl/Documents/callio/beta/Wrapper-Offline/wrapper/_ASSETS/database.json") : require("/Users/thesl/Documents/callio/beta/Wrapper-Offline/wrapper/_ASSETS/database.json")
const channelGroups = require("./channels.json");
const clientId = "1020416137395195975";
const channels = TEST ? channelGroups.devChannel : channelGroups.channels;

try {
	mongoose.connect(process.env.db);
} catch (err) {
	console.log(err);
}

const quoteSchema = new mongoose.Schema({
	name: String,
	content: String,
});

const Quote = mongoose.model("Quote", quoteSchema);
async function getQuote() {
	try {
		const quote = await Quote.aggregate([{ $sample: { size: 1 } }]);
		return quote;
	} catch (err) {
		console.log(err);
	}
}

//for transferring the quotes from the local database.json prolly use it later

// for (const item in bullshit.assets) {
// 	if (bullshit.assets[item].title.match(/.*]/g) === null) {
// 		continue
// 	}
// 	if (bullshit.assets[item].title.match(/.*]/g).slice(1, -1) === "ul") {
// 		continue
// 	}
// 	const test = new Quote({
// 		name: `${bullshit.assets[item].title.match(/.*]/g)}`.slice(1, -1),
// 		content: `${bullshit.assets[item].title.match(/].*/g)}`.slice(2),
// 	})

// 	test.save()
// }

const commands = [
	new SlashCommandBuilder().setName("grounded").setDescription("get grounded"),
	new SlashCommandBuilder().setName("quote").setDescription("get quoted"),
	new SlashCommandBuilder().setName("bank").setDescription("get banked"),
	// new SlashCommandBuilder().setName('request').setDescription('get requested').addStringOption(option =>
	// 	option.setName('username')
	// 		.setDescription('ur mincecraft username for java version NOT MICROSOFT USERNAME')
	// 		.setRequired(true)),
	// new SlashCommandBuilder().setName('whitelist').setDescription('get white'),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.token);

rest
	.put(Routes.applicationCommands(clientId), { body: commands })
	.then((data) =>
		console.log(`Successfully registered ${data.length} application commands.`)
	)
	.catch(console.error);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
	cron.schedule("10 8 * * *", () => {
		axios
			.get(
				`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLfSAyHiioVrgrzyUM0s5Edl04hDK4-F0u&5&pageToken=EAAaB1BUOkNQb0I&key=${process.env.yt}`
			)
			.then((res) => {
				data = res.data.items.filter((item) => {
					return item.snippet.title !== "Private video";
				});
				for (let channelId of channels) {
					let channel = client.channels.cache.get(channelId);
					channel.send(
						`https://www.youtube.com/watch?v=${data[data.length - 1].snippet.resourceId.videoId
						} time for your daily dose of caillio cancer`
					);
				}
			});
	});
	// for getting next page
	// axios
	// 	.get(
	// 		`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLfSAyHiioVrgrzyUM0s5Edl04hDK4-F0u&5&pageToken=EAAaB1BUOkNQb0I&key=${process.env.yt}`
	// 	)
	// 	.then((res) => {
	// 		data = res.data.items.filter((item) => {
	// 			return item.snippet.title !== "Private video";
	// 		});

	// 		console.log(res)
	// 		console.log(
	// 			`https://www.youtube.com/watch?v=${data[data.length - 1].snippet.resourceId.videoId
	// 			} time for your daily dose of caillio cancer`
	// 		);
	// 	});
});

client.on("interactionCreate", (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const times = [
		"planck units",
		"nanoseconds",
		"milliseconds",
		"seconds",
		"minutes",
		"hours",
		"days",
		"weeks",
		"months",
		"years",
		"decades",
		"centuries",
		"millenniums",
		"eterneties",
	];

	var randNum = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;
	var randTime = times[Math.floor(Math.random() * times.length)];

	const { commandName } = interaction;

	if (commandName === "grounded") {
		interaction.reply(
			`how dare you use the grounded command thats fucking it you are grounded grounded grounded for ${randNum} ${randTime}!`
		);
	} else if (commandName === "quote") {
		getQuote().then((res) => {
			interaction.reply(res[0].content);
		});
		// let randombull = bullshit.assets[Math.floor(Math.random() * bullshit.assets.length)]
		// while (randombull.title === "Untitled") {
		// 	randombull = bullshit.assets[Math.floor(Math.random() * bullshit.assets.length)]
		// }
		// interaction.reply(randombull.title)
	} else if (commandName === "bank") {
		try {
			Quote.estimatedDocumentCount().then((res) => {
				interaction.reply(
					`there is currently ${res} possible quotes to pick from`
				);
			})
		} catch (err) {
			console.log(err)
		}
	}
	// } else if (commandName === 'request') {
	// 	let user = interaction.options.getString("username")
	// 	if (users.includes(interaction.member.user.username)) {
	// 		return
	// 	} else {
	// 		users.push(interaction.member.user.username)
	// 	}
	// 	client.channels.cache.get("1031249645223018648").send(user)
	// 	interaction.reply(`added "${user}" to whitelist queue`)
	// } else if (commandName === "whitelist") {
	// 	import("./whitelist.json", {assert: {type: "json"}}).then((whitelist) => interaction.reply(whitelist.default.members.join(", ")))
	// }
});

client.login(process.env.token);
