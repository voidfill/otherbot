const { getModule } = require("powercord/webpack")
const fetchProfile = getModule(["fetchProfile"], false).fetchProfile
const send = require("./send")

const Embed = require("../utils/embed")

module.exports = {
    executor(main) {
        const { ezreply } = main
        if ((/\d{18}/g).exec(main.subargs[0])) {
            const uid = main.subargs[0].match(/\d{18}/g)[0]
            const f = {
                "friendToken": undefined,
                "withMutualGuilds": true
            }

            fetchProfile(uid, f, ((res) => {

                const user = res.user
                let accsholder = "```"
                res.connected_accounts.forEach(element => {
                    accsholder += ("\n" + element.type + ": " + element.name + " id: " + element.id)
                });
                accsholder += "```"

                let embed = new Embed()

                embed.setTitle("Userinfo")
                embed.setThumbnail(
                    "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + (user.avatar.startsWith("a_") ? ".gif?size=2048" : ".webp?size=2048")
                )
                if (user.banner) {
                    embed.setImage(
                        "https://cdn.discordapp.com/banners/" + user.id + "/" + user.banner + (user.banner.startsWith("a_") ? ".gif?size=300" : ".webp?size=300")
                    )
                }
                embed.addField(
                    "User",
                    user.username + "#" + user.discriminator,
                    true
                )
                embed.addField(
                    "Userid",
                    user.id,
                    true
                )
                embed.addField('\u200b', '\u200b')
                embed.addField(
                    "Created at",
                    "<t:" + this.commands.about.getDate(user.id) + ":f>",
                    true
                )
                embed.addField(
                    "Accent color",
                    (user.accent_color ? "#" + user.accent_color.toString(16) : "none"),
                    true
                )
                embed.addField(
                    "Bio",
                    user.bio ? user.bio : "none",
                )
                embed.addField(
                    "Connected accounts",
                    (res.connected_accounts.length == 0 ? "none" : accsholder),
                )
                
                send.embed(main.channelId, embed)

            }))
        } else {
            ezreply(
                this.commands.userinfo.about
            )
        }
    },

    "about": "Gets a users info.\nUsage: <prefix>userinfo <uid/mention>"
}
