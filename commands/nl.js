const nekoslife = require("nekos.life")
const neko = new nekoslife()
const { getModule } = require("powercord/webpack")

module.exports = {
	async executor(main) {
		const { ezreply } = main;
		if (main.subargs.length == 0) {
			main.subargs = ["nl"];
			this.commands.help.executor.call(this, main)
			return
		}
		if (main.subargs[0] != "sfw" && main.subargs[0] != "nsfw") {
			ezreply("First argument needs to be either sfw nsfw.")
			return
		}
		const channel = getModule(["getChannel"], false).getChannel(main.channelId)
		if (main.subargs[0] == "nsfw" && channel.nsfw == false) {
			ezreply("You cant use NSFW commands in SFW channels.")
			return
		}
		try {
			const res = await neko[main.subargs[0]][main.subargs[1]]()
			ezreply(
				res.url
			);
		} catch(err) {
			ezreply("Something went wrong. Either that command doesnt exist or it doesnt return a URL.\nFull list of commands: <https://github.com/Nekos-life/nekos-dot-life#sfw> (i only do URLs because its easier \:CBT\:)")
		}
	},

	"about": "Nekos.life api <https://github.com/Nekos-life/nekos-dot-life>\nUsage: <prefix>nl <sfw/nsfw> <image type>"
}
