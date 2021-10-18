const Embed = require("../utils/structures/embed")
const { getUID, getAvatar, getBanner, getDateFromId } = require("../utils/functions/commons")
const help = require("../commands/help")

const { getModule } = require("powercord/webpack");
const { fetchProfile } = getModule(["fetchProfile"], false)
const { getMember } = getModule(["getMember"], false)
const { getChannel } = getModule(["getChannel"], false)

const f = {
    "friendToken": undefined,
    "withMutualGuilds": true
}

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        async executor({ channel, message, author, contentRaw, content, args }) {
            let uid = getUID(args)
            if (!uid) { uid = author.id }
            const member = getMember(channel.guild_id, uid)

            fetchProfile(uid, f, res => {
                let accsholder = "```"
                res.connected_accounts.forEach(element => {
                    accsholder += ("\n" + element.type + ": " + element.name)
                });
                accsholder += "```"
                const user = res.user
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
                if (member != undefined && member.roles.length != 0) {
                    const rolesString = "<@&" + member.roles.splice(0, 9).join(">, <@&") + ">"
                    e.addField("Roles", rolesString)
                }
                e.addField("Bio", user.bio ? user.bio : "none")
                e.addField("Connected accounts", (res.connected_accounts.length == 0 ? "none" : accsholder))
                e.send(channel)
            })
        },

        "about": "Get some helpful info about a user.",
        "syntax": prefix + "userinfo [userid/mention]"
    }
}