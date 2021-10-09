const Embed = require("../utils/structures/embed")
const { sendContent } = require("../utils/functions/sendmessages")
const nekoEndpoints = require("../utils/structures/nekoEndpoints.json")
const nekoClient = require("../utils/structures/neko")
const neko = new nekoClient()

const sfwCommands = Object.keys(nekoEndpoints.sfw)
const nsfwCommands = Object.keys(nekoEndpoints.nsfw)
const notActuallySfw = ["holo", "wallpaper"]

const { getModule } = require("powercord/webpack")
const { getChannel } = getModule(["getChannel"], false)

const { prefix, responders, botUserId, botOwnerId, allowedUsers, admins } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            let e = new Embed(author)
            e.setTitle("Nekos.life")
            e.setDescription(this.about)
            e.addField("Sfw commands:", sfwCommands.join(", "))
            e.addField("Nsfw commands:", nsfwCommands.join(", "))
            e.addField("Syntax:", this.syntax, true)
            e.send(channelId)
        },

        "about": "Nekos.life api.",
        "syntax": prefix + "nl [sfw/nsfw] [subcommand]",
        "restricted": false
    },

    "sfw": {
        async executor({ channelId, message, author, contentRaw, content, args }) {
            if (!getChannel(channelId).nsfw && notActuallySfw.includes(args[0])) {
                sendContent(channelId, "This subcommand isnt 100% sfw so itll only work in nsfw channels. Blame nekos.life.", message.id)
                return
            }

            let e = new Embed(author)

            if (args.length > 0 && sfwCommands.includes(args[0])) {
                if (args[0] == "cattext") {
                    const text = await neko.sfw.cattext()
                    sendContent(channelId, text.cat, message.id)
                    return
                }
                const image = await neko.sfw[args]()
                e.setImage(image.url)
                e.setFooter("Provided by nekos.life api.")
                e.send(channelId)
                return
            }

            e.setDescription("That subcommand doesnt exist. Heres a full list:\n" + sfwCommands.join(", "))
            e.send(channelId)
        },

        "about": "sfw part of nekos.life api.",
        "syntax": prefix + "nl sfw [subcommand]",
        "restricted": false
    },

    "nsfw": {
        async executor({ channelId, message, author, contentRaw, content, args }) {
            if (!getChannel(channelId).nsfw) {
                sendContent(channelId, "You cant use nsfw commands in a sfw channel, smh.", message.id)
                return
            }

            let e = new Embed(author)

            if (args.length > 0 && nsfwCommands.includes(args[0])) {

                const image = await neko.nsfw[args]()
                e.setImage(image.url)
                e.setFooter("Provided by nekos.life api.")
                e.send(channelId)
                return
            }

            e.setTitle("Nekos.life")
            e.setDescription("That subcommand doesnt exist. Heres a full list:\n" + nsfwCommands.join(", "))
            e.send(channelId)
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
