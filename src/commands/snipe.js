const Embed = require("../utils/structures/embed")
const { sendContent } = require("../utils/functions/sendmessages")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            if (!global.deletedMessageStore.ghost[channelId] || global.deletedMessageStore.ghost[channelId].length == 0) {
                sendContent(channelId, "No deleted messages for this channel.", message.id)
                return
            }

            let e = new Embed(author)
            e.setTitle("Snipe")

            global.deletedMessageStore.ghost[channelId].splice(-2).forEach(s =>{
                let m = global.messageStore.ghost[channelId][s]
                e.addField(m.author.username + "#" + m.author.discriminator, m.content.length > 0 && m.content.length < 512 ? m.content : "Message either didnt have content or was too long :c")
            })
            e.send(channelId)
        },

        "about": "Snipes the 2 most recent deleted messages.",
        "syntax": prefix + "snipe",
        "restricted": false
    },

    "edits": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            if (!global.editedMessageStore.ghost[channelId] || global.editedMessageStore.ghost[channelId].length == 0) {
                sendContent(channelId, "No edited messages for this channel.", message.id)
                return
            }

            let e = new Embed(author)
            e.setTitle("Snipe")
            e.setDescription("unreliable rn, sorry.")
            global.editedMessageStore.ghost[channelId].splice(-2).forEach(s => {
                let m = global.messageStore.ghost[channelId][s]
                e.addField(m.author.username + "#" + m.author.discriminator, m.content.length > 0 && m.content.length < 512 ? m.content : "Message either didnt have content or was too long :c")
            })
            e.send(channelId)
        },

        "about": "Snipes the 2 most recent edited messages.",
        "syntax": prefix + "snipe edits",
        "restricted": false
    }
}