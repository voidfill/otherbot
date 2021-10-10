const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
const fetch = require("node-fetch")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        async executor({ channelId, message, author, contentRaw, content, args }) {
            const drama = await(
                await fetch('https://dramageneratorbackend.herokuapp.com/api/generate', {
                    method: 'POST',
                    body: JSON.stringify({ community: 'discord' })
                })
            ).json();

            sendContent(channelId, drama.phrase, message.id)
        },

        "about": "Discord drama generator.",
        "syntax": prefix + "dramagenerator",
        "restricted": false
    }
}