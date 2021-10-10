const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
//example imports

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            sendContent(channelId, "Example default command with reply.", message.id)
        },

        "about": "Example default command with reply.",
        "syntax": prefix + "example [syntax]",
        "restricted": false
    },

    "non-default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            sendContent(channelId, "Example restricted non-default command without reply.")
        },

        "about": "ballingfffffffffffff.",
        "syntax": prefix + "non-default [syntax]",
        "restricted": true
    }
}