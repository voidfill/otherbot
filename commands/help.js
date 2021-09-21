module.exports = {
	async executor(main) {
		console.log(main)
		const { ezreply } = main
		if (main.subargs.length == 0) {
			ezreply(
				"Available commands: " + Object.getOwnPropertyNames(this.commands).join(", ") +"\nRun " + this.prefix +"help <command> to get more info about a particular command."
			)
			return
		}
		if (this.commands[main.subargs[0]]) {
			ezreply(
				this.commands[main.subargs[0]].about + "\nmodule.exports: " + Object.getOwnPropertyNames(this.commands[main.subargs[0]]).join(", ")
			)
			return
		}
		ezreply(
			"Thats not a valid command. Get a list of all commands by running " +this.prefix +"help"
		)
	},

	"about": "Displays helpful info.\nUsage: <prefix>help <command>"
}