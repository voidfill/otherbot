const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
const settings = require("../utils/functions/settings")
const { softReload } = require("../utils/functions/commons")
const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            if (args.length == 0) {
                sendContent(channelId, "The prefix must be at least one character long.", message.id)
                return
            }
            settings.set("prefix", content.toLowerCase())
            sendContent(channelId, "Set the prefix to " + content.toLowerCase(), message.id)
            softReload()
        },

        "about": "Set the global bot prefix. Can include spaces.",
        "syntax": prefix + "setprefix [prefix]",
        "restricted": "owner"
    }
}