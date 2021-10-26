const Embed = require("../utils/structures/embed")
const { sendContent } = require("../utils/functions/sendmessages")
const { softReload, getUID } = require("../utils/functions/commons")
const { getModule } = require("powercord/webpack")
const Dispatch = getModule(["dirtyDispatch"], false)

const { getMember } = getModule(["getMember"], false)
const { getChannel } = getModule(["getChannel"], false)
const { getMessageByReference } = getModule(["getMessageByReference"], false)
const { handleWelcomeCtaClicked } = getModule(["handleWelcomeCtaClicked"], false)
const fetch = require("node-fetch")
const statcord = require("../utils/structures/statcord")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channel, message, author, contentRaw, content, args }) {

        },
        "restricted": true
    },

    "reload": {
        executor({ channel, message }) {
            softReload();
            sendContent(channel, "done.", message.id)
        },
        "restricted": true
    }
}