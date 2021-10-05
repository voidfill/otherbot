const { getAllModules, getModule } = require("powercord/webpack");
const _sendMessage = getModule(["_sendMessage"], false)._sendMessage;
const getChannel = getModule(["getChannel"], false).getChannel;

const messageQueue = getAllModules(arg => arg.enqueue)[0]
const fromTimestamp = getModule(["fromTimestamp"], false).fromTimestamp

module.exports = {
	executor(main) {
		if (main.contentNoCmd == "") {
			main.ezreply(
				"Not sending an empty message dummy."
			)
			return
		}
		main.ezreply(main.contentNoCmd)
	},

	reply(channel, msgid, content) {
		messageQueue.enqueue({
			"type": 0,
			"message": {
				"channelId": channel,
				"content": content,
				"allowed_mentions": {
					"parse": [],
					"replied_user": false
				},
				"tts": false,
				"nonce": fromTimestamp(Date.now()),
				"message_reference": {
					"message_id": msgid,
					"channel_id": channel,
					"guild_id": getChannel(channel).guild_id,
					"fail_if_not_exists": false
				}
			}
		}, r => {
			return;
		})
	},

	embed(channel, embed) {
		messageQueue.enqueue({
			"type": 0,
			"message": {
				"channelId": channel,
				"content": "",
				"tts": false,
				"nonce": fromTimestamp(Date.now()),
				"embed": embed,
			}
		}, r => {
			return;
		})
	},


	"about": "Repeats after you.\nUsage: <prefix>send <what to send>"
}