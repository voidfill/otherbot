const { getModule } = require("powercord/webpack")

module.exports = {
	executor(main) {
		const { ezreply } = main
		var guildNames = [];
		Object.values(this.guilds).forEach(element => {
			guildNames.push(element.name)
		});
		const build = window.GLOBAL_ENV.RELEASE_CHANNEL;
		const buildId = window.GLOBAL_ENV.SENTRY_TAGS.buildId
		const buildType = window.GLOBAL_ENV.SENTRY_TAGS.buildType
		ezreply(
			this.botUser.username + "#" + this.botUser.discriminator +"\n" +
			"Account created: <t:" + this.commands.about.getDate(this.botUser.id) + ":d>\n" +
			"Started: <t:" + Math.floor(this.reloadState.time/1000) + ":R>\n" +
			"Guilds: " + Object.keys(this.guilds).length + " [" + guildNames.join(", ") +"]\n" +
			"Platform: " + build + " " + buildId + " " + buildType +
			"\nUsing <https://github.com/voidfill/otherbot>"
		)
	},

	getDate(snowflake) {
		return Math.floor(new Date(snowflake / 4194304 + 1420070400000).getTime() / 1000)
	},

	"about": "Returns info about the bot."
}