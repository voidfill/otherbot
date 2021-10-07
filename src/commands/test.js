const Embed = require("../utils/structures/embed")
const { sendContent } = require("../utils/functions/sendmessages")
const { softReload } = require("../utils/functions/commons")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message}) {
            sendContent(channelId, "hello", message.id)
            let e = new Embed()
            e.setTitle("hi")
            e.setDescription("owo")
            e.send(channelId, message.id)
        }
    },

    "hard": {
        executor({ channelId, message }) {

                softReload()
            
        },
        "restricted": true
    }
}