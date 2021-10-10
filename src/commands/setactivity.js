const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")

const { getModule } = require("powercord/webpack");
const { SET_ACTIVITY } = getModule(["SET_ACTIVITY"], false);
const Activity = require("../utils/structures/activity")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            if (args.length == 0 ) {
                sendContent(channelId, "Not setting to empty name.", message.id)
                return
            }
            SET_ACTIVITY.handler(
                new Activity({
                    name: content
                })
            )
        },

        "about": "Set the bots \"currently playing\" status.",
        "syntax": prefix + "setactivity [name]",
        "restricted": true
    }
}