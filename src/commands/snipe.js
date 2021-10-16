const Embed = require("../utils/structures/embed")
const { sendContent } = require("../utils/functions/sendmessages")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channel, message, author, contentRaw, content, args }) {
            if (!global.deletedMessageStore.ghost[channel.id] || global.deletedMessageStore.ghost[channel.id].length == 0) {
                sendContent(channel, "No deleted messages for this channel.", message.id)
                return
            }

            let e = new Embed(author)
            e.setTitle("Snipe")

            global.deletedMessageStore.ghost[channel.id].splice(-2).forEach(s =>{
                let m = global.messageStore.ghost[channel.id][s]
                e.addField(m.author.username + "#" + m.author.discriminator, m.content.length > 0 && m.content.length < 512 ? m.content : "Message either didnt have content or was too long :c")
            })
            e.send(channel)
        },

        "about": "Snipes the 2 most recent deleted messages.",
        "syntax": prefix + "snipe",
        "restricted": false
    },

    "edits": {
        executor({ channel, message, author, contentRaw, content, args }) {
            if (!global.editedMessageStore.ghost[channel.id] || global.editedMessageStore.ghost[channel.id].length == 0) {
                sendContent(channel, "No edited messages for this channel.", message.id)
                return
            }

            let e = new Embed(author)
            e.setTitle("Snipe")
            e.setDescription("unreliable rn, sorry.")
            global.editedMessageStore.ghost[channel.id].splice(-2).forEach(s => {
                let m = global.messageStore.ghost[channel.id][s]
                e.addField(m.author.username + "#" + m.author.discriminator, m.content.length > 0 && m.content.length < 512 ? m.content : "Message either didnt have content or was too long :c")
            })
            e.send(channel)
        },

        "about": "Snipes the 2 most recent edited messages.",
        "syntax": prefix + "snipe edits",
        "restricted": false
    }
}