const Embed = require("../utils/structures/embed")
const { sendContent } = require("../utils/functions/sendmessages")
const nekoEndpoints = require("../utils/structures/nekoEndpoints.json")
const nekoClient = require("../utils/structures/neko")
const neko = new nekoClient()

const sfwCommands = Object.keys(nekoEndpoints.sfw)
const nsfwCommands = Object.keys(nekoEndpoints.nsfw)
const notActuallySfw = ["holo", "wallpaper"]

const { prefix, responders, botUserId, botOwnerId, allowedUsers, admins } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channel, message, author, contentRaw, content, args }) {
            let e = new Embed(author)
            e.setTitle("Nekos.life")
            e.setDescription(this.about)
            e.addField("Sfw commands:", sfwCommands.join(", "))
            e.addField("Nsfw commands:", nsfwCommands.join(", "))
            e.addField("Syntax:", this.syntax, true)
            e.send(channel)
        },

        "about": "Nekos.life api.",
        "syntax": prefix + "nl [sfw/nsfw] [subcommand]",
        "restricted": false
    },

    "sfw": {
        async executor({ channel, message, author, contentRaw, content, args }) {
            if (!channel.nsfw && notActuallySfw.includes(args[0])) {
                sendContent(channel, "This subcommand isnt 100% sfw so itll only work in nsfw channels. Blame nekos.life.", message.id)
                return
            }

            let e = new Embed(author)

            if (args.length > 0 && sfwCommands.includes(args[0])) {
                if (args[0] == "cattext") {
                    const text = await neko.sfw.cattext()
                    sendContent(channel, text.cat, message.id)
                    return
                }
                const image = await neko.sfw[args[0]]()
                e.setImage(image.url)
                e.setFooter("Provided by nekos.life api.")
                e.send(channel)
                return
            }

            e.setDescription("That subcommand doesnt exist. Heres a full list:\n" + sfwCommands.join(", "))
            e.send(channel)
        },

        "about": "sfw part of nekos.life api.",
        "syntax": prefix + "nl sfw [subcommand]",
        "restricted": false
    },

    "nsfw": {
        async executor({ channel, message, author, contentRaw, content, args }) {
            if (!channel.nsfw) {
                sendContent(channel, "You cant use nsfw commands in a sfw channel, smh.", message.id)
                return
            }

            let e = new Embed(author)

            if (args.length > 0 && nsfwCommands.includes(args[0])) {

                const image = await neko.nsfw[args[0]]()
                e.setImage(image.url)
                e.setFooter("Provided by nekos.life api.")
                e.send(channel)
                return
            }

            e.setTitle("Nekos.life")
            e.setDescription("That subcommand doesnt exist. Heres a full list:\n" + nsfwCommands.join(", "))
            e.send(channel)
        },

        "about": "nsfw part of nekos.life api.",
        "syntax": prefix + "non-default [syntax]",
        "restricted": false
    },

    async getFromNeko(main, sub) {
        const e = await neko[main][sub]()
        return e.url ? e.url : e[Object.keys(e)[0]]
    }
}
