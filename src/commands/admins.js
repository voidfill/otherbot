const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
const { softReload, getAvatar } = require("../utils/functions/commons")
const Embed = require("../utils/structures/embed")
const settings = require("../utils/functions/settings")
const help = require("../commands/help")
const onMessage = require("../events/onMessage")

const uidReg = new RegExp("/\d{18}/g")

const { prefix, responders, botUserId, allowedUsers, admins, botOwnerId } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            let e = new Embed();
            e.setAuthor(author.username + author.discriminator, "", getAvatar(author.id, author.avatar))
            e.setTitle("Admins")
            e.setDescription("options: add, remove, clear")
            const list = "<@!" + admins.join(">, <@!") + ">"
            e.addField("List", list)
            e.send(channelId)
        },

        "about": "Lists all current admins.",
        "syntax": prefix + "admins",
        "restricted": false
    },

    "add": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            
            if (args.length > 0 && (/\d{18}/g).exec(args[0])) {
                const uid = args[0].match(/\d{18}/g)[0]

                let e = new Embed();
                e.setAuthor(author.username + author.discriminator, "", getAvatar(author.id, author.avatar))
                e.setTitle("Admins")

                if (admins.includes(uid)) {
                    e.setDescription("<@!" + uid + "> is already on the list.")
                    e.send(channelId)
                    return
                }
                admins.push(uid)
                settings.set("admins", admins)
                if(!allowedUsers.includes(uid)){
                    allowedUsers.push(uid)
                    settings.set("allowedUsers", allowedUsers)
                }
                setTimeout(softReload(), 2000)

                e.setDescription("Added <@!" + uid +">")
                e.send(channelId)
                return
            }
            help.default.executor({ channelId: channelId, author: author, args: ["users", "add"] })
        },

        "about": "Add a user to the admin list.",
        "syntax": prefix + "admins add [userid/mention]",
        "restricted": "owner"
    },

    "remove": {
        executor({ channelId, message, author, contentRaw, content, args }) {

            if (args.length > 0 && (/\d{18}/g).exec(args[0])) {
                const uid = args[0].match(/\d{18}/g)[0]

                const index = admins.indexOf(uid)
                if (index != -1) {
                    admins.splice(index, 1)
                    settings.set("admins", admins)
                    setTimeout(softReload(), 2000)
                }

                let e = new Embed();
                e.setAuthor(author.username + author.discriminator, "", getAvatar(author.id, author.avatar))
                e.setTitle("Admins")
                e.setDescription("Removed <@!" + uid + ">")
                e.send(channelId)

                return
            }
            help.default.executor({ channelId: channelId, author: author, args: ["users", "remove"] })
        },

        "about": "Remove a user from the admin list.",
        "syntax": prefix + "admins remove [userid/mention]",
        "restricted": true
    },

    "clear": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            settings.set("admins", [])
            setTimeout(softReload(), 2000)

            let e = new Embed();
            e.setAuthor(author.username + author.discriminator, "", getAvatar(author.id, author.avatar))
            e.setTitle("Admins")
            e.setDescription("Cleared the list c:")
            e.send(channelId)
        },

        "about": "Clear the admins list",
        "syntax": prefix + "clear",
        "restricted": true
    }
}