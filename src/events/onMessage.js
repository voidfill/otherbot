const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
const allowed = new Set(allowedUsers)
const allowedTop = new Set(allowedUsersTop)

const commands = require("../commands")
const { getModule } = require("powercord/webpack")

const { Permissions } = getModule(["Permissions"], false);
const { can } = getModule(["getChannelPermissions"], false);
const { getChannel } = getModule(["getChannel"], false);

module.exports = async ({ channelId, message }) => {

    const author = message.author
    if (author.id === botUserId || !can(Permissions.SEND_MESSAGES, getChannel(channelId))) { return }

    if (message.content.toLowerCase().startsWith(prefix) && allowed.has(author.id)) {
        const contentRaw = message.content.slice(prefix.length)
        const args = contentRaw.toLowerCase().split(" ").filter(e => e !== "")
        const command = args.shift()

        if (commands[command]) {
            if (commands[command].restricted && !allowedTop.has(author.id) ) {
                //function here
                return
            }

            let content = contentRaw.slice(command.length).trim()

            let arguments = {
                "channelId": channelId,
                "message": message,
                "author": author,
                "contentRaw": contentRaw,
                "content": content,
                "args": args
            }

            if (commands[command][args[0]]) {
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