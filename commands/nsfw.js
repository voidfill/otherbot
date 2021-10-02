const nekoslife = require("nekos.life")
const neko = new nekoslife()
const { getModule } = require("powercord/webpack")
const nsfwModules = new Set(Object.keys(neko.nsfw))

module.exports = {
	async executor(main) {
		const { ezreply } = main
		const channel = getModule(["getChannel"], false).getChannel(main.channelId)
		if (channel.nsfw == false && channel.guild_id != null) {
			ezreply(
				"You cant use NSFW commands in SFW channels."
			)
			return
		}
		if (main.subargs.length == 0 || !nsfwModules.has(main.subargs[0].toLowerCase())) {
			ezreply(
				"That subcommand doesnt exist. Heres a full list:\n"
				+ Array.from(nsfwModules).join(", ")
			)
			return
		}
		try {
			ezreply(
				Object.values(await neko.nsfw[main.subargs[0].toLowerCase()]())[0]
			)
		} catch (err) {
			console.log(err)
			ezreply("Something went wrong. Ask the dev.")
		}
	},

	"about": "Nsfw part of Nekos.life api <https://github.com/Nekos-life/nekos-dot-life>\nUsage: <prefix>nsfw <image type>"
}
