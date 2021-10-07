const commands = require("../commands")
const Embed = require("../utils/structures/embed")
const { getAvatar } = require("../utils/functions/commons")
const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")

module.exports = {
    "default": {
        executor({ channelId, author, args }) {
            if (args.length != 0 && commands[args[0]]) {
                let alt = "default"
                if (commands[args[0]][args[1]]) {
                    alt = [args[1]]
                }
                const command = commands[args[0]][alt]

                let e = new Embed()
                e.setAuthor(author.username + author.discriminator, "", getAvatar(author.id, author.avatar))
                e.setTitle("Help menu")
                e.addField("Command info:", command.about || "unset")
                e.addField("Syntax:", command.syntax || "unset")
                e.addField("Restricted:", command.restricted ? "true": "false", true)

                let subs = Object.keys(commands[args[0]])
                if (alt == "default" && subs.length > 1) {
                    subs.shift()
                    e.addField("Subcommands:", subs.join(", "), true)
                }

                e.send(channelId)
                return
            }

            let e = new Embed()
            e.setAuthor(author.username + author.discriminator, "", getAvatar(author.id, author.avatar))
            e.setTitle("Help menu")
            e.addField("Available commands:", Object.keys(commands).join(", "))

            e.send(channelId)
            return
        },

        "about": "Help command.",
        "syntax": prefix + "help [optional command]"
    }
}