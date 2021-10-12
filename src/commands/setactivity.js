const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
const Activity = require("../utils/structures/activity")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            if (args.length == 0) {
                sendContent(channelId, "Not setting to empty name.", message.id)
                return
            }

            if (content.includes("--buttons")) {
                try {
                    index = content.indexOf("--buttons")
                    let buttons = JSON.parse(content.slice(index + 9).trim())
                    const name = content.slice(0, index).trim()
                    let a = new Activity({
                        name: name
                    })
                    buttons.forEach(element => {
                        a.addButton(element.label.trim(), element.url.trim())
                    });
                    a.set()
                } catch(e) {
                    console.log(e)
                    sendContent(channelId, "something went wrong.", message.id)
                }
                return
            }

            let a = new Activity({
                name: content
            })
            a.set()
        },

        "about": "Set the bots \"currently playing\" status.",
        "syntax": prefix + "setactivity [name] --buttons [buttonarray]",
        "restricted": true
    }
}