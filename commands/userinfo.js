const { getModule } = require("powercord/webpack")
const fetchProfile = getModule(["fetchProfile"], false).fetchProfile
const { embed } = require("./send")

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
                embed(
                    main.channelId,
                    {
                        "type": "rich",
                        "title": "Userinfo",
                        "color": 0x00FFFF,
                        "fields": [
                            {
                                "name": "User",
                                "value": user.username + "#" + user.discriminator,
                                "inline": true
                            },
                            {
                                "name": "Userid",
                                "value": user.id,
                                "inline": true
                            },
                            {
                                "name": "Created at",
                                "value": "<t:" + this.commands.about.getDate(user.id) + ":d>",
                                "inline": true
                            },
                            {
                                "name": "Bio",
                                "value": user.bio,
                                "inline": false
                            },
                            {
                                "name": "Connected accounts",
                                "value": (res.connected_accounts.length == 0 ? "none" : accsholder),
                                "inline": false
                            },
                            {
                                "name": "Banner",
                                "value": (user.banner ? ("https://cdn.discordapp.com/banners/" + user.id + "/" + user.banner + (user.banner.startsWith("a_") ? ".gif?size=300" : ".webp?size=300")) :
                                    (user.accent_color ? ("none **Accent color**: #" + user.accent_color.toString(16)) :
                                        "none **Accent color**: none")),
                                "inline": false
                            }
                        ],
                        "thumbnail": {
                            "url": "https://cdn.discordapp.com/avatars/" + user.id + "/" + user.avatar + (user.avatar.startsWith("a_") ? ".gif?size=2048" : ".webp?size=2048"),
                            "height": 0,
                            "width": 0
                        }
                    }
                )
            }))
        } else {
            ezreply(
                this.commands.userinfo.about
            )
        }
    },

    "about": "Gets a users info.\nUsage: <prefix>userinfo <uid/mention>"
}
