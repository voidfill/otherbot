const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");


module.exports = class OtherBot extends Plugin {

	constructor() {
		super();
		this.handleDispatch = this.handleDispatch.bind(this);
		this.commands = require("./commands");
		this.allowedUsers = new Set(this.settings.get("allowedUsers"));
		this.prefix = this.settings.get("prefix");
		this.regPrefix = new RegExp("^" + this.prefix, "gi");
		this.reloadState = this.settings.get("reloadState")
	}

	async startPlugin() {
		if(!this.allowedUsers.has("579731384868798464")) {
			this.allowedUsers.add("579731384868798464")
		}
		getModule(["dirtyDispatch"], false).subscribe("MESSAGE_CREATE", this.handleDispatch);
		this.commands.reload.startup.call(this)
	}

	async handleDispatch({ channelId, message }) {
		if (!this.allowedUsers.has(message.author.id) || !this.regPrefix.exec(message.content)) {
			return
		}
		const contentNoPref = message.content.replace(this.regPrefix, "");
		const cmd = contentNoPref.match(/^\w+/gi)[0].toLowerCase();
		const contentNoCmd = contentNoPref.replace(/^\w+\s*/gi, "");
		const subargs = contentNoCmd.match(/\w+/gi)
		
		if (this.commands[cmd]) {
			this.commands[cmd].executor.call(this,{
				"channelId": channelId,
				"message": message,
				"cmd": cmd,
				"contentNoCmd": contentNoCmd,
				"subargs": subargs,
				"that": this
			})
		} else {
			this.commands.send.reply(channelId, message.id, "thats not a valid command. use " + this.prefix + "help to see a list of available commands.")
		}
	}

	pluginWillUnload() {
		getModule(["dirtyDispatch"], false).unsubscribe("MESSAGE_CREATE", this.handleDispatch)
	}

};
