const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
const { getUID } = require("../utils/functions/commons")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            const uid = getUID(args)
            if (uid) {
                const gay = Math.floor(parseInt(uid.slice(12, 14))) * 1.25 - 25
                sendContent(channelId,
                    "<@!" + uid + "> is " + gay + "% gay " + (gay> 50 ? "c:" : ":c")
                    , message.id)
                    return
            }
            const gay = Math.floor(parseInt(author.id.slice(12, 14))) * 1.25 - 25
            sendContent(channelId, 
                "You are " + gay + "% gay " + (gay > 50 ? "c:" : ":c")
                , message.id)
        },

        "about": "Find out how gay you really are.",
        "syntax": prefix + "gay [userid/mention]",
        "restricted": false
    }
}