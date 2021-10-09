const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
const { getUID } = require("../utils/functions/commons")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            const uid = getUID(args)
            if (uid) {
                const cute = Math.floor(parseInt(uid.slice(1, 3))) * 1.25 - 25
                sendContent(channelId,
                    "<@!" + uid + "> is " + cute + "% cute " + (cute> 50 ? "<3" : "</3")
                    , message.id)
                    return
            }
            const cute = Math.floor(parseInt(author.id.slice(1, 3))) * 1.25 - 25
            sendContent(channelId, 
                "You are " + cute + "% cute " + (cute > 50 ? "<3" : "</3")
                , message.id)
        },

        "about": "Find out how cute you are ;>",
        "syntax": prefix + "cute [userid/mention]",
        "restricted": false
    }
}