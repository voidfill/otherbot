const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
const { sendHook, getOrCreateWebhook } = require("../utils/functions/webhook")
const { bulkdelete, getLastMessages } = require("../utils/functions/channelApi")

const { getModule } = require("powercord/webpack");
const { getAvatar } = require("../utils/functions/commons");

const { getChannel } = getModule(["getChannel", "getDMFromUserId"], false);

const timer = ms => new Promise(res => setTimeout(res, ms))

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        async executor({ channel, message, author, contentRaw, content, args }) {
            let messages = await getLastMessages(channel, "" + (parseInt(args[0]) + 1))
            bulkdelete(channel, messages.map(m => m.id))

            messages = messages.splice(1).reverse()
            const webhook = await getOrCreateWebhook(getChannel(args[1]))

            for (let i = 0; i < messages.length; i++) {
                sendHook(webhook, {
                    content: messages[i].content,
                    username: messages[i].author.username,
                    avatar_url: getAvatar(messages[i].author.id, messages[i].author.avatar),
                    embeds: messages[i].embeds
                })
                await timer(2000)
            }

        },

        "about": "Move messages from one channel to another.",
        "syntax": prefix + "move [number] [channelid]",
        "restricted": "owner"
    }
}