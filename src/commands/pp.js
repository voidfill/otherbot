const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
const { getUID } = require("../utils/functions/commons")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            const uid = getUID(args)
            if (uid) {
                const pp = Math.floor(parseInt(uid.slice(2, 4))) * 27/100 - 4
                sendContent(channelId,
                    "<@!" + uid + ">´s pp is " + pp + "cm long " + (pp > 10 ? "c:" : ":c")
                    , message.id)
                    return
            }
            const pp = Math.floor(parseInt(author.id.slice(2, 4))) * 27/100 - 4
            sendContent(channelId, 
                "Your pp is " + pp + "cm long " + (pp > 10 ? "c:" : ":c")
                , message.id)
        },

        "about": "Get your (totally real btw) penis length.",
        "syntax": prefix + "pp [userid/mention]",
        "restricted": false
    }
}