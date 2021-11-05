const { prefix, responders, botUserId, botOwnerId, allowedUsers, admins } = powercord.api.settings.store.getSettings("otherbot")
const allowed = new Set(allowedUsers)
const allowedTop = new Set(admins)
const { sendContent } = require("../utils/functions/sendmessages")

const commands = require("../commands")
const { getModule } = require("powercord/webpack")

const { Permissions } = getModule(["API_HOST"], false);
const { can } = getModule(["getChannelPermissions"], false);
const { getChannel } = getModule(["getChannel", "getDMFromUserId"], false);


const nests = require("nests")
global.messageStore ? {} : global.messageStore = nests.make()
global.stats ? {} : global.stats = nests.make()
global.stats.ghost.commandsRan ? {} : global.stats.store.commandsRan = 0
global.stats.ghost.active ? {} : global.stats.store.active = []

const linkReg = /https:\/\/[\s,\S]*.*discord.com\/channels\/[\d]{18}\/[\d]{18}\/[\d]{18}/gmi
const embedMessageLinks = ["689612305578983446", "885600160212717608", "829798084207706152"]

const { getWebhooksForGuild } = getModule(["getWebhooksForGuild"], false)
const { fetchForGuild } = getModule(["fetchForGuild"], false)
const { sendHook } = require("../utils/functions/webhook")
const { getAvatar } = require("../utils/functions/commons")
const fetch = require("node-fetch")
const token = localStorage.getItem("token").replace(/\"/g, '')

module.exports = async ({ channelId, message }) => {

    global.messageStore.store[channelId][message.id] = message

    const channel = getChannel(channelId)
    const author = message.author
    if (author.id === botUserId || (!can(Permissions.SEND_MESSAGES, channel) && channel.guild_id != null) || author.bot == true) { return }

    if (message.content.toLowerCase().startsWith(prefix)) { // && (allowed.has(author.id) || author.id == botOwnerId )
        const contentRaw = message.content.slice(prefix.length)
        const args = contentRaw.toLowerCase().split(" ").filter(e => e !== "")
        const command = args.shift()

        if (commands[command]) {
            if (!can(Permissions.EMBED_LINKS, channel) && channel.guild_id != null) {
                sendContent(channel, "Missing permissions: embed links", message.id)
                return
            }

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

    if (linkReg.test(message.content) && embedMessageLinks.includes(channel.guild_id)) {
        const link = message.content.match(linkReg)[0]
        const ids = link.match(/[\d]{18}/gmi)
        try {
            const res = await fetch(`https://ptb.discord.com/api/v9/channels/${ids[1]}/messages?limit=1&around=${ids[2]}`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": token,
                    "User-Agent": "Powercord (https://github.com/powercord-org/powercord)"
                }
            })
            const toJson = await res.json()
            const messageFetched = toJson[0]
            if(typeof messageFetched == "undefined") { return }

            let webhooks = getWebhooksForGuild(channel.guild_id).filter(w=>w.channel_id == channel.id && w.name != "_matrix")
            if (webhooks.length == 0) {
                fetchForGuild(channel.guild_id)
                setTimeout(() => {
                    webhooks = getWebhooksForGuild(channel.guild_id).filter(w => w.channel_id == channel.id && w.name != "_matrix")
                }, 1000)
            }

            if (webhooks.length == 0) {
                const res = await fetch(`https://ptb.discord.com/api/v9/channels/${channel.id}/webhooks`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": token,
                        "User-Agent": "Powercord (https://github.com/powercord-org/powercord)"
                    }, body: JSON.stringify({
                        name: "otherbot"
                    })
                })
                const toJson = await res.json()
                webhooks.push(toJson)
            }

            sendHook(webhooks[0], {
                content: messageFetched.content,
                username: messageFetched.author.username,
                avatar_url: getAvatar(messageFetched.author.id, messageFetched.author.avatar),
                embeds: messageFetched.embeds
            })
        } catch (e) {
            console.log(e)
        }
    }
}
