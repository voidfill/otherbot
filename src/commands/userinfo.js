const Embed = require("../utils/structures/embed")
const { getUID, getAvatar, getBanner, getDateFromId } = require("../utils/functions/commons")
const help = require("../commands/help")

const { getModule } = require("powercord/webpack");
const { fetchProfile } = getModule(["fetchProfile"], false)

const f = {
    "friendToken": undefined,
    "withMutualGuilds": true
}

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        async executor({ channelId, message, author, contentRaw, content, args }) {
            const uid = getUID(args[0]);
            if (uid) {
                fetchProfile(uid, f, (res) => {
                    const user = res.user
                    let accsholder = "```"
                    res.connected_accounts.forEach(element => {
                        accsholder += ("\n" + element.type + ": " + element.name)
                    });
                    accsholder += "```"
                    
                    let e = new Embed(author);
                    e.setTitle("Userinfo")
                    e.setThumbnail(getAvatar(user.id, user.avatar))
                    if (user.banner) {
                        e.setImage(getBanner(user.id, user.banner))
                    }
                    e.addField("User", user.username + "#" + user.discriminator, true)
                    e.addField("Created at", "<t:" + getDateFromId(user.id) + ":f>", true)                    
                    e.addField("Accent color", (user.accent_color ? "#" + user.accent_color.toString(16) : "none"), true)
                    e.addField("Userid", user.id, true)
                    e.addField("Bio", user.bio ? user.bio : "none")
                    e.addField("Connected accounts", (res.connected_accounts.length == 0 ? "none" : accsholder))
                    e.send(channelId)
                })
                return
            }
            help.default.executor({ channelId: channelId, author: author, args: ["userinfo"] })
        },

        "about": "Get some helpful info about a user.",
        "syntax": prefix + "userinfo [userid/mention]",
        "restricted": false
    }
}