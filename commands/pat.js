const nekoslife = require("nekos.life")
const neko = new nekoslife()

module.exports = {
    async executor(main) {
        const { ezreply } = main;
        const res = await neko.sfw.pat()
        if (main.contentNoCmd != "" && (/\d{18}/g).exec(main.subargs[0])) {
            ezreply(
                "<@!" + main.message.author.id + "> pats <@!" + (/\d{18}/g).exec(main.subargs[0]) + ">\n" +
                res.url
            );
            return
        }
        ezreply(
            res.url
        )
    },

    "about": "Pats someone using Nekos.life.\nUsage: <prefix>pat <optional uid or mention>"
}
