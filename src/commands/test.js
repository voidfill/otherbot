const Embed = require("../utils/structures/embed")
const { sendContent } = require("../utils/functions/sendmessages")
const { softReload } = require("../utils/functions/commons")
const { getModule } = require("powercord/webpack")
const Dispatch = getModule(["dirtyDispatch"], false)
const { webpackJsonp } = getModule(["webpackJsonp"], false)



const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author }) {
            console.log(getModule(["SET_ACTIVITY"], false))
        },
        "restricted": true
    },

    "hard": {
        executor({ channelId, message }) {

        },
        "restricted": true
    }
}