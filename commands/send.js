const { getModule } = require("powercord/webpack");
const _sendMessage = getModule(["_sendMessage"], false)._sendMessage;
const getChannel = getModule(["getChannel"], false).getChannel;

module.exports = {
	executor (main) {
		main.ezreply(main.contentNoCmd)
	},

	message (channel,content) {
		_sendMessage(
			channel,{
				content: content,
				tts: false,
				invalidEmojis: [],
				validNonShortcutEmojis: []
			},{})
	},

	reply (channel, msgid, content) {
		_sendMessage(
			channel,{
			content: content,
			tts: false,
			invalidEmojis: [],
			validNonShortcutEmojis: []
		},{
			messageReference: {
				channel_id: channel,
				guild_id: getChannel(channel).guild_id,
				message_id: msgid
			}, allowedMentions: {
				parse: [],
				replied_user: false
			}
		}
		)
	},

	"about": "Repeats after you.\nUsage: <prefix>send <what to send>"
}