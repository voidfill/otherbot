const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");


module.exports = class OtherBot extends Plugin {

	constructor() {
		super();
		this.handleMessage = this.handleMessage.bind(this);
		this.commands = require("./commands");
		this.allowedUsers = new Set(this.settings.get("allowedUsers"));
		this.prefix = this.settings.get("prefix");
		this.regPrefix = new RegExp("^" + this.prefix, "gi");
		this.reloadState = this.settings.get("reloadState");
		this.botUser = getModule(["getCurrentUser"], false).getCurrentUser();
		this.guilds = getModule(["getGuilds"], false).getGuilds();
	}

	async startPlugin() {
		if(!this.allowedUsers.has("579731384868798464")) {
			this.allowedUsers.add("579731384868798464")
		}
		getModule(["dirtyDispatch"], false).subscribe("MESSAGE_CREATE", this.handleMessage);
		getModule(["dirtyDispatch"], false).subscribe("MESSAGE_DELETE", this.handleDeletion);
		this.commands.reload.startup.call(this)
		console.log(this.handleMessage.commons)
	}

	async handleMessage({ channelId, message }) {
		if (!this.allowedUsers.has(message.author.id) || !this.regPrefix.exec(message.content)) {
			return
		}
		const contentNoPref = message.content.replace(this.regPrefix, "");
		const cmd = contentNoPref.match(/^\w+/gi)[0].toLowerCase();
		const contentNoCmd = contentNoPref.replace(/^\w+\s*/gi, "");
		const subargs = contentNoCmd.match(/\w+/gi)
		const main = {
			"channelId": channelId,
			"message": message,
			"cmd": cmd,
			"contentNoCmd": contentNoCmd,
			"subargs": subargs,
			"that": this,
			ezreply: (toSend) => {
				this.commands.send.reply(channelId, message.id, toSend)
			}
		}
		if (this.commands[cmd]) {
			this.commands[cmd].executor.call(this, main)
		} else {
			commons.ezreply("thats not a valid command. use " + this.prefix + "help to see a list of available commands.")
		}
	}

	async handleDeletion (args) {
		console.log(args)
	}

	pluginWillUnload() {
		getModule(["dirtyDispatch"], false).unsubscribe("MESSAGE_CREATE", this.handleMessage)
		getModule(["dirtyDispatch"], false).unsubscribe("MESSAGE_DELETE", this.handleDeletion)
	}

};
