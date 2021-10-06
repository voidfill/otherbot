const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
const allowed = new Set(allowedUsers)
const allowedTop = new Set(allowedUsersTop)

const commands = require("../commands")
const { getModule } = require("powercord/webpack")

const { Permissions } = getModule(["Permissions"], false);
const  { can } = getModule(["getChannelPermissions"], false);
const { getChannel } = getModule(["getChannel"], false);

module.exports = ({ channelId, message }) => {

    const author = message.author
    if (message.author.id == botUserId || !can(Permissions.SEND_MESSAGES, getChannel(channelId))) {return}

    if (message.content.startsWith(prefix) && allowed.has(author.id)) {
        const content = message.content.slice(prefix.length)
        const args = content.split(" ").filter(e => e !== "")
        const command = args[0]
        args.shift()

        if(commands[command]) {
            commands[command].executor (
                {
                    "channelId": channelId,
                    "message": message,
                    "author": author,
                    "content": content,
                    "args": args
                }
            )
            return
        }
    }

}