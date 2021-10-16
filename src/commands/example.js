const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
//example imports

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channel, message, author, contentRaw, content, args }) {
            sendContent(channel, "Example default command with reply.", message.id)
        },

        "about": "Example default command with reply.",
        "syntax": prefix + "example [syntax]",
        "restricted": false
    },

    "non-default": {
        executor({ channel, message, author, contentRaw, content, args }) {
            sendContent(channel, "Example restricted non-default command without reply.")
        },

        "about": "ballingfffffffffffff.",
        "syntax": prefix + "non-default [syntax]",
        "restricted": true
    }
}