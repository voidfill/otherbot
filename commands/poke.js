const nekoslife = require("nekos.life")
const neko = new nekoslife()

module.exports = {
    async executor(main) {
        const { ezreply } = main;
        const res = await neko.sfw.poke()
        if (main.contentNoCmd != "" && (/\d{18}/g).exec(main.subargs[0])) {
            ezreply(
                "<@!" + main.message.author.id + "> pokes <@!" + (/\d{18}/g).exec(main.subargs[0]) + ">\n" +
                res.url
            );
            return
        }
        ezreply(
            res.url
        )
    },

    "about": "Pokes someone using Nekos.life.\nUsage: <prefix>poke <optional uid or mention>"
}
