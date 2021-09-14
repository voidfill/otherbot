const { getModule } = require("powercord/webpack");
const _sendMessage = getModule(["_sendMessage"], false)._sendMessage;
const getChannel = getModule(["getChannel"], false).getChannel;

module.exports = {

	executor: (main) => {
		_sendMessage(main.channelId, {
			content: main.contentNoCmd,
			tts: false,
			invalidEmojis: [],
			validNonShortcutEmojis: []
		},{})
	},
	message: (channel,content) => {
		_sendMessage(
			channel,{
				content: content,
				tts: false,
				invalidEmojis: [],
				validNonShortcutEmojis: []
			},{})
	},
	reply: (channel, msgid, content) => {
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
	}
}