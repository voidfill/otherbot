const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const getChannel = (e) => getModule(["getChannel"], false).getChannel(e)


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
		this.owner = "579731384868798464"
		this.responders = this.settings.get("responders")
	}

	async startPlugin() {
		this.commands.reload.startup.call(this)
		getModule(["dirtyDispatch"], false).subscribe("MESSAGE_CREATE", this.handleMessage);
		getModule(["dirtyDispatch"], false).subscribe("MESSAGE_DELETE", this.handleDeletion);
	}

	async handleMessage({ channelId, message }) {
		if (!this.messageCache[channelId]) {
			this.messageCache[channelId] = {};
		}
		this.messageCache[channelId][message.id] = message
		if (message.author.id == this.botUser.id) { return }

		if (this.allowedUsers.has(message.author.id) && message.content.toLowerCase().startsWith(this.prefix.toLowerCase()) && message.content.length > 2) {
			const contentNoPref = message.content.substr(this.prefix.length);
			const args = contentNoPref.split(" ").filter(arg => arg !== "");
			const cmd = args[0].toLowerCase()

			if (this.commands[cmd]) {
				const contentNoCmd = contentNoPref.replace(args[0], "")
				args.shift()
				const subargs = args

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
				this.commands[cmd].executor.call(this, main)
			}
			return
		}

		const guildResponders = this.responders[getChannel(channelId).guild_id]
		if (!guildResponders) { return }
		const guildRespondersArray = guildResponders.array
		const contentNew = " " + message.content.toLowerCase().split(" ").filter(arg => arg !== "").join(" ") + " "
		const responderindex = guildRespondersArray.findIndex(e => contentNew.includes(e))
		if (responderindex != -1) {
			this.commands.send.reply(channelId, message.id, guildResponders[guildRespondersArray[responderindex]])
		}
	}

	async handleDeletion(args) {
		this.deletedCache[args.channelId] = args.id;
	}

	pluginWillUnload() {
		getModule(["dirtyDispatch"], false).unsubscribe("MESSAGE_CREATE", this.handleMessage)
		getModule(["dirtyDispatch"], false).unsubscribe("MESSAGE_DELETE", this.handleDeletion)
	}

};
