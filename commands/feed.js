const nekoslife = require("nekos.life")
const neko = new nekoslife()

module.exports = {
    async executor(main) {
        const { ezreply } = main;
        const res = await neko.sfw.feed()
        if (main.contentNoCmd != "" && (/\d{18}/g).exec(main.subargs[0])) {
            ezreply(
                "<@!" + main.message.author.id + "> feeds <@!" + (/\d{18}/g).exec(main.subargs[0]) + ">\n" +
                res.url
            );
            return
        }
        ezreply(
            res.url
        )
    },

    "about": "Feeds someone using Nekos.life.\nUsage: <prefix>feed <optional uid or mention>"
}
