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
	EmbedBuilder,
} = require("discord.js");
const { REST } = require("@discordjs/rest");
const cron = require("node-cron");
const axios = require("axios").default;
const mongoose = require("mongoose");
const os = process.platform;
// 1.3.0 location
// const bullshit = os === "linux" ? require("/mnt/c/Users/thesl/Documents/callio/beta/Wrapper-Offline/wrapper/_ASSETS/database.json") : require("/Users/thesl/Documents/callio/beta/Wrapper-Offline/wrapper/_ASSETS/database.json")
// pre2.0.0 location
// const bullshit = require("/Users/thesl/Documents/callio/Wrapper Offline-win32-x64/resources/app/_SAVED/database.json")
const channelGroups = require("./channels.json");
const clientId = "1020416137395195975";
const channels = TEST ? channelGroups.devChannel : channelGroups.channels;
const names = ["Eric", "Justin (PO)", "Justin (RL)", "Tom", "Aditi", "Joanna", "Julie", "Paul", "Beth", "saul", "Mike", "Ivy (RL)", "Ivy (PO)", "Evan", "Dave"]

try {
	mongoose.set("strictQuery", false)
	mongoose.connect(process.env.db);
} catch (err) {
	console.log(err);
}

const quoteSchema = new mongoose.Schema({
	name: String,
	content: String,
});

const Quote = mongoose.model("Quote", quoteSchema);
async function getQuote(amount) {
	try {
		const quote = await Quote.aggregate([{ $sample: { size: amount } }]);
		return quote;
	} catch (err) {
		console.log(err);
	}
}

function boris(embed, item) {
	embed.setAuthor({ name: `Boris (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052735984384606208/boris.png")
	return embed
}

function callio(embed, item) {
	embed.setAuthor({ name: `Caillou (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052733683100045382/callio.png")
	return embed
}

function peter(embed, item) {
	embed.setAuthor({ name: `Peter Griffin (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052751400699973672/peter.PNG")
	return embed
}

function moris(embed, item) {
	embed.setAuthor({ name: `Doris / Miss Martin (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052744530631344128/jo.PNG")
	return embed
}

function rosy(embed, item) {
	embed.setAuthor({ name: `Rosie (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052744970144055337/rosy.PNG")
	return embed
}

function betterBoris(embed, item) {
	embed.setAuthor({ name: `Old Boris (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052750399809015909/oldboris.PNG")
	return embed
}

function prince(embed, item) {
	embed.setAuthor({ name: `The Principal (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052750544873201694/prin.PNG")
	return embed
}

function dora(embed, item) {
	embed.setAuthor({ name: `Dora (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052736903050436609/dora.PNG")
	return embed
}

function coke(embed, item) {
	embed.setAuthor({ name: `Cocaine Cody (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052750693703884950/cody.PNG")
	return embed
}

function cop(embed, item) {
	embed.setAuthor({ name: `The Cop (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052750906627731456/cop.PNG")
	return embed
}

function demon_child(embed, item) {
	embed.setAuthor({ name: `Classic Caillou (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052751170340409454/class.PNG")
	return embed
}

function lily(embed, item) {
	embed.setAuthor({ name: `Lily (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1078459687634227280/lily.PNG")
	return embed
}

function daddy(embed, item) {
	embed.setAuthor({ name: `Dadish Child (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1078461317347811429/dadishchild.PNG")
	return embed
}

function bill(embed, item) {
	embed.setAuthor({ name: `Little Bill (${item.name})` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1078461336809381918/littlebill.PNG")
	return embed
}

function unk(embed, item) {
	embed.setAuthor({ name: `${item.name}` })
	embed.setThumbnail("https://cdn.discordapp.com/attachments/1020421954462818304/1052744969825292368/unk.PNG")
	return embed
}

//for transferring the quotes from the local database.json prolly use it later
// console.log(bullshit.assets)
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
	new SlashCommandBuilder().setName("quoteboris").setDescription("what a guy"),
	new SlashCommandBuilder().setName("quotecallio").setDescription("bald beta"),
	new SlashCommandBuilder().setName("quotepeter").setDescription("fat ass"),
	new SlashCommandBuilder().setName("quotedora").setDescription("green card"),
	new SlashCommandBuilder().setName("quotemoris").setDescription("idk who this is"),
	new SlashCommandBuilder().setName("quoterosy").setDescription("ginger ho"),
	new SlashCommandBuilder().setName("quoteoldboris").setDescription("the better version"),
	new SlashCommandBuilder().setName("quoteprincipal").setDescription("uwu"),
	new SlashCommandBuilder().setName("quotecody").setDescription("i love crack"),
	new SlashCommandBuilder().setName("quotecop").setDescription("oops i killed a man"),
	new SlashCommandBuilder().setName("quotedemonchild").setDescription("hell"),
	new SlashCommandBuilder().setName("quotelily").setDescription("blondy"),
	new SlashCommandBuilder().setName("quotebill").setDescription("im just a bill"),
	new SlashCommandBuilder().setName("quotedaddy").setDescription("im bout to leave to get some milk"),
	new SlashCommandBuilder().setName("quoteunk").setDescription("succ"),
	new SlashCommandBuilder().setName("bank").setDescription("get banked"),
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
				`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC2bso7dShHmrlH9EzGyH-CQ&maxResults=1&order=date&type=video&key=${process.env.yt}`
			)
			.then((res) => {
				let data = res.data.items
				for (let channelId of channels) {
					let channel = client.channels.cache.get(channelId);
					channel.send(
						`https://www.youtube.com/watch?v=${data[data.length - 1].id.videoId
						} wake up honey new callio just dropped`
					);
				}
			});
	});
	cron.schedule("10 16 * * *", () => {
		axios
			.get(
				`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC2bso7dShHmrlH9EzGyH-CQ&maxResults=1&order=date&type=video&key=${process.env.yt}`
			)
			.then((res) => {
				let data = res.data.items
				for (let channelId of channels) {
					let channel = client.channels.cache.get(channelId);
					channel.send(
						`https://www.youtube.com/watch?v=${data[data.length - 1].id.videoId
						} wake up honey new callio just dropped`
					);
				}
			});
	});
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


		getQuote(1).then((res) => {
			let embed = new EmbedBuilder()
				.setDescription(`"*${res[0].content.trim()}*"`)
			switch (res[0].name) {
				case ("Justin (PO)"):
					callio(embed, res[0])
					break
				case ("Justin (RL)"):
					callio(embed, res[0])
					break
				case ("Eric"):
					boris(embed, res[0])
					break
				case ("Aditi"):
					dora(embed, res[0])
					break
				case ("Joanna"):
					moris(embed, res[0])
					break
				case ("Julie"):
					rosy(embed, res[0])
					break
				case ("Paul"):
					betterBoris(embed, res[0])
					break
				case ("Beth"):
					prince(embed, res[0])
					break
				case ("saul"):
					coke(embed, res[0])
					break
				case ("Rich"):
					cop(embed, res[0])
					break
				case ("Mike"):
					demon_child(embed, res[0])
					break
				case ("Tom"):
					peter(embed, res[0])
					break
				case ("Ivy (PO)"):
					lily(embed, res[0])
					break
				case ("Ivy (RL)"):
					lily(embed, res[0])
					break
				case ("Evan"):
					bill(embed, res[0])
					break
				case ("Dave"):
					daddy(embed, res[0])
					break
				default:
					unk(embed, res[0])
			}

			interaction.reply({ embeds: [embed] })
		});
		// let randombull = bullshit.assets[Math.floor(Math.random() * bullshit.assets.length)]
		// while (randombull.title === "Untitled") {
		// 	randombull = bullshit.assets[Math.floor(Math.random() * bullshit.assets.length)]
		// }
		// interaction.reply(randombull.title)
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
	} else if (commandName === "quoteboris") {
		try {
			getQuote(8000).then((res) => {
				for (const item of res) {
					if (item.name === "Eric") {
						let embed = new EmbedBuilder()
							.setDescription(`"*${item.content.trim()}*"`)
						return interaction.reply({ embeds: [boris(embed, item)] })
					}
				}
				interaction.reply({ content: 'no', ephemeral: true });
			})


		} catch (err) {
			console.log(err)
		}
	} else if (commandName === "quotecallio") {
		try {
			getQuote(8000).then((res) => {
				for (const item of res) {
					if (item.name === "Justin (RL)" || item.name === "Justin (PO)") {
						let embed = new EmbedBuilder()
							.setDescription(`"*${item.content.trim()}*"`)
						return interaction.reply({ embeds: [callio(embed, item)] })
					}
				}
				interaction.reply({ content: 'no', ephemeral: true });
			})


		} catch (err) {
			console.log(err)
		}
	} else if (commandName === "quotepeter") {
		try {
			getQuote(8000).then((res) => {
				for (const item of res) {
					if (item.name === "Tom") {
						let embed = new EmbedBuilder()
							.setDescription(`"*${item.content.trim()}*"`)
						return interaction.reply({ embeds: [peter(embed, item)] })
					}
				}
				interaction.reply({ content: 'no', ephemeral: true });
			})


		} catch (err) {
			console.log(err)
		} 
	} else if (commandName === "quotedora") {
		try {
			getQuote(8000).then((res) => {
				for (const item of res) {
					if (item.name === "Aditi") {
						let embed = new EmbedBuilder()
							.setDescription(`"*${item.content.trim()}*"`)
						return interaction.reply({ embeds: [dora(embed, item)] })
					}
				}
				interaction.reply({ content: 'no', ephemeral: true });
			})
		} catch (err) {
			console.log(err)
		}
	
} else if (commandName === "quotemoris") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (item.name === "Joanna") {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [moris(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

} else if (commandName === "quoterosy") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (item.name === "Julie") {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [rosy(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

} else if (commandName === "quoteoldboris") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (item.name === "Paul") {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [betterBoris(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

} else if (commandName === "quoteprincipal") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (item.name === "Beth") {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [prince(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

} else if (commandName === "quotecody") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (item.name === "saul") {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [coke(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

} else if (commandName === "quotecop") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (item.name === "Rich") {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [cop(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

} else if (commandName === "quotedemonchild") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (item.name === "Mike") {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [demon_child(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

} else if (commandName === "quotelily") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (item.name === "Ivy (PO)" || item.name === "Ivy (RL)") {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [lily(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

} else if (commandName === "quotebill") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (item.name === "Evan") {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [bill(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

} else if (commandName === "quotedaddy") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (item.name === "Dave") {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [daddy(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

} else if (commandName === "quoteunk") {
	try {
		getQuote(8000).then((res) => {
			for (const item of res) {
				if (names.includes(item.name)) {
					let embed = new EmbedBuilder()
						.setDescription(`"*${item.content.trim()}*"`)
					return interaction.reply({ embeds: [unk(embed, item)] })
				}
			}
			interaction.reply({ content: 'no', ephemeral: true });
		})
	} catch (err) {
		console.log(err)
	}

}});

client.login(process.env.token);
