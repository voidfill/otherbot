const Embed = require("../utils/structures/embed")
const { sendContent } = require("../utils/functions/sendmessages")
const { softReload } = require("../utils/functions/commons")
const { getModule } = require("powercord/webpack")
const Dispatch = getModule(["dirtyDispatch"], false)

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message}) {
            Dispatch.unsubscribe("MESSAGE_REACTION_ADD", this.handle)

        },
        handle(e) {
            console.log(e)
        }
    },

    "hard": {
        executor({ channelId, message }) {

                softReload()
            
        },
        "restricted": true
    }
}