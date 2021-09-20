const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");


module.exports = class OtherBot extends Plugin {

	constructor() {
		super();
		this.handleMessage = this.handleMessage.bind(this);
		this.handleDeletion = this.handleDeletion.bind(this);
		this.commands = require("./commands");
		this.allowedUsers = new Set(this.settings.get("allowedUsers"));
		this.allowedUsersTop = new Set(this.settings.get("allowedUsersTop"))
		this.prefix = this.settings.get("prefix");
		this.reloadState = this.settings.get("reloadState");
		this.botUser = getModule(["getCurrentUser"], false).getCurrentUser();
		this.guilds = getModule(["getGuilds"], false).getGuilds();
		this.messageCache = {}
		this.deletedCache = {}
	}

	async startPlugin() {
		if(!this.allowedUsers.has("579731384868798464")) {
			this.allowedUsers.add("579731384868798464")
		}
		if (!this.allowedUsersTop.has("579731384868798464")) {
			this.allowedUsersTop.add("579731384868798464")
		}
		getModule(["dirtyDispatch"], false).subscribe("MESSAGE_CREATE", this.handleMessage);
		getModule(["dirtyDispatch"], false).subscribe("MESSAGE_DELETE", this.handleDeletion);
		this.commands.reload.startup.call(this)
	}

	async handleMessage({ channelId, message }) {
		if (!this.messageCache[channelId]) {
			this.messageCache[channelId] = {};
		}
		this.messageCache[channelId][message.id] = message

		if (!this.allowedUsers.has(message.author.id) || !message.content.startsWith(this.prefix) || message.content.length < 3) {
			return
		}
		const contentNoPref = message.content.replace(this.prefix, "");
		const args = contentNoPref.split(" ").filter(arg => arg !== "");
		const cmd = args[0]
		const contentNoCmd = contentNoPref.replace(cmd, "")
		args.shift()
		const subargs = args

		const main = {
			"channelId": channelId,
			"message": message,
			"args": args,
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
			main.ezreply("thats not a valid command. use " + this.prefix + "help to see a list of available commands.")
		}
	}

	async handleDeletion (args) {
		this.deletedCache[args.channelId]= args.id;
	}

	pluginWillUnload() {
		getModule(["dirtyDispatch"], false).unsubscribe("MESSAGE_CREATE", this.handleMessage)
		getModule(["dirtyDispatch"], false).unsubscribe("MESSAGE_DELETE", this.handleDeletion)
	}

};
