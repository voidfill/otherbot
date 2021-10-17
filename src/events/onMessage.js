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
        const contentRaw = message.content.slice(prefix.length)
        const args = contentRaw.toLowerCase().split(" ").filter(e => e !== "")
        const command = args.shift()

        if (commands[command]) {
            global.stats.store.commandsRan++;
            global.stats.store.active.includes(author.id) ? {} : global.stats.store.active.push(author.id)
            if (commands[command].default.restricted && !allowedTop.has(author.id) && author.id != botOwnerId) { //maybe check if args.length is higher? allow non default comamnds?
                sendContent(channelId, "Youre not authorised to do that.", message.id)
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
                if ((commands[command][args[0]].restricted && !allowedTop.has(author.id) && author.id != botOwnerId) || (commands[command][args[0]].restricted == "owner" && author.id != botOwnerId)) {
                    sendContent(channel.id, "Youre not authorised to do that.", message.id)
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