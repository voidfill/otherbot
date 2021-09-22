const nekoslife = require("nekos.life")
const neko = new nekoslife()
const { getModule } = require("powercord/webpack")
const sfwModules = new Set(Object.keys(neko.sfw))
const inputRequired = new Set(["owoify", "spoiler"])

module.exports = {
	async executor(main) {
		const { ezreply } = main;
		if (main.subargs.length == 0 || !sfwModules.has(main.subargs[0].toLowerCase())) {
			ezreply(
				"That subcommand doesnt exist. Heres a full list:\n"
				+ Array.from(sfwModules).join(", ")
			)
			return
		}
		try {
			if (!inputRequired.has(main.subargs[0])) {
				ezreply(
					Object.values(await neko.sfw[main.subargs[0].toLowerCase()]())[0]
				)
				return
			}
			ezreply(
				Object.values(
					await neko.sfw[main.subargs[0].toLowerCase()](
						{
							text: main.contentNoCmd.replace(main.contentNoCmd.match(/^\s*\w+\s+/gi)[0], "")
						}
					)
				)[0]
			)

		} catch (err) {
			console.log(err)
			ezreply("Something went wrong. Ask the dev.")
		}
	},

	"about": "Sfw part of Nekos.life api <https://github.com/Nekos-life/nekos-dot-life>\nUsage: <prefix>sfw <image type>"
}