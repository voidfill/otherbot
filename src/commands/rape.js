const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
const { getUID } = require("../utils/functions/commons")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channel, message, author, contentRaw, content, args }) {
            const uid = getUID(args)
            sendContent(channel, `<@${author.id}> rapes ${uid ? "<@" + uid + ">" : "themself????"}`, message.id)
        },

        "about": "rape someone o-o",
        "syntax": prefix + "rape [userid/mention]",
        "restricted": false
    }
}