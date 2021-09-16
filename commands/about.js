const { getModule } = require("powercord/webpack")

module.exports = {
	executor(main) {
		const { ezreply } = main
		const getDate = (snowflake) => {
			return Math.floor(new Date(snowflake / 4194304 + 1420070400000).getTime() / 1000)
		};
		var guildNames = [];
		Object.values(this.guilds).forEach(element => {
			guildNames.push(element.name)
		});
		ezreply(
			this.botUser.username + "#" + this.botUser.discriminator +"\n" +
			"Account created: <t:" + getDate(this.botUser.id) + ":d>\n" +
			"Last reload: <t:" + getDate(this.reloadState.msgid) + ":R>\n" +
			"Guilds: " + Object.keys(this.guilds).length + " [" + guildNames.join(", ") +"]\n" +
			"\nUsing <https://github.com/voidfill/otherbot>"
		)
	},

	getDate(snowflake) {
		return Math.floor(new Date(snowflake / 4194304 + 1420070400000).getTime() / 1000)
	},

	"about": "Returns info about the bot."
}