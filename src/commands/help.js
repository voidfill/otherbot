const commands = require("../commands")
const Embed = require("../utils/structures/embed")
const { getAvatar } = require("../utils/functions/commons")
const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")

module.exports = {
    "default": {
        executor({ channelId, author, args }) {
            let e = new Embed(author)
            e.setTitle("Help menu")

            if (args.length != 0 && commands[args[0]]) {
                let alt = "default"
                if (commands[args[0]][args[1]]) {
                    alt = [args[1]]
                }
                const command = commands[args[0]][alt]

                e.addField("Command info:", command.about || "unset")
                e.addField("Syntax:", command.syntax || "unset")
                e.addField("Restricted:", command.restricted ? command.restricted || "true": "false", true)

                let subs = Object.keys(commands[args[0]]).filter(e => commands[args[0]][e].executor)
                if (alt == "default" && subs.length > 1) {
                    subs.shift()
                    e.addField("Subcommands", subs.join(", "), true)
                }

                e.send(channelId)
                return
            }

            e.addField("Available commands", Object.keys(commands).join(", "))
            e.setDescription("Run " + prefix + "help [command] to get more info about a particular command.")

            e.send(channelId)
            return
        },

        "about": "Help command, get all commands and info about each one.",
        "syntax": prefix + "help [optional command]"
    }
}