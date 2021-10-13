const Embed = require("../utils/structures/embed")
const { sendContent } = require("../utils/functions/sendmessages")
const { softReload } = require("../utils/functions/commons")
const { getModule } = require("powercord/webpack")
const Dispatch = getModule(["dirtyDispatch"], false)
const { webpackJsonp } = getModule(["webpackJsonp"], false)
const { getMember } = getModule(["getMember"], false)
const { getChannel } = getModule(["getChannel"], false)


const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author }) {
            console.log(getMember(getChannel(channelId).guild_id, author.id))
            console.log(Dispatch)
        },
        "restricted": true
    },

    "reload": {
        executor({ channelId, message }) {
            softReload();
            sendContent(channelId, "done.", message.id)
        },
        "restricted": true
    }
}