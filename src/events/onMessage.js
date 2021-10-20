const { prefix, responders, botUserId, botOwnerId, allowedUsers, admins } = powercord.api.settings.store.getSettings("otherbot")
const allowed = new Set(allowedUsers)
const allowedTop = new Set(admins)
const { sendContent } = require("../utils/functions/sendmessages")

const commands = require("../commands")
const { getModule } = require("powercord/webpack")

const { Permissions } = getModule(["Permissions"], false);
const { can } = getModule(["getChannelPermissions"], false);
const { getChannel } = getModule(["getChannel"], false);

const nests = require("nests")
global.messageStore ? {} : global.messageStore = nests.make()
global.stats ? {} : global.stats = nests.make()
global.stats.ghost.commandsRan ? {} : global.stats.store.commandsRan = 0
global.stats.ghost.active ? {} : global.stats.store.active = []

module.exports = async ({ channelId, message }) => {

    global.messageStore.store[channelId][message.id] = message

    const channel = getChannel(channelId)
    const author = message.author
    if (author.id === botUserId || (!can(Permissions.SEND_MESSAGES, channel) && channel.guild_id != null)) { return }

    if (message.content.toLowerCase().startsWith(prefix) && (allowed.has(author.id) || author.id == botOwnerId)) {
        if (!can(Permissions.EMBED_LINKS, channel) && channel.guild_id != null) {
            sendContent(channel, "Missing permissions: embed links", message.id)
            return
        }

        const contentRaw = message.content.slice(prefix.length)
        const args = contentRaw.toLowerCase().split(" ").filter(e => e !== "")
        const command = args.shift()

        if (commands[command]) {

            global.stats.store.commandsRan++;
            global.stats.store.active.includes(author.id) ? {} : global.stats.store.active.push(author.id)
            if (global.stats.ghost.popular?.[command]?.count) {
                global.stats.store.popular[command].count++
            } else {
                global.stats.store.popular[command].count = 1;
                global.stats.store.popular[command].name = command.toString()
            }

            if (commands[command].default.restricted && !allowedTop.has(author.id) && author.id != botOwnerId) {
                sendContent(channel, "Youre not authorised to do that.", message.id)
                return
            }

            let content = contentRaw.slice(command.length).trim()
            let arguments = {
                "channel": channel,
                "message": message,
                "author": author,
                "contentRaw": contentRaw,
                "content": content,
                "args": args
            }

            if (commands[command][args[0]] && commands[command][args[0]].executor) {
                if (commands[command][args[0]].restricted && !allowedTop.has(author.id) && author.id != botOwnerId) {
                    sendContent(channel, "Youre not authorised to do that.", message.id)
                    return
                }

                const sub = arguments.args.shift()
                content = content.slice(sub.length).trim()

                commands[command][sub].executor(arguments)
                return
            }

            commands[command].default.executor(arguments)
            return
        }
    }
}