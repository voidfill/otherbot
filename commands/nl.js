const nekoslife = require("nekos.life")
const neko = new nekoslife()

module.exports = {
	async executor(main) {
		const { ezreply } = main;
		const res = await neko[main.subargs[0]][main.subargs[1]]()
		ezreply(
			res.url
		);

	},

	"about": "Nekos.life api."
}
