const nekoslife = require("nekos.life")
const neko = new nekoslife()

module.exports = {
    async executor(main) {
        const { ezreply } = main;
        const res = await neko.sfw.hug()
        if (main.contentNoCmd != "" && (/\d{18}/g).exec(main.subargs[0])) {
            ezreply(
                "<@!" + main.message.author.id + "> hugs <@!" + (/\d{18}/g).exec(main.subargs[0]) + ">\n" +
                res.url
            );
            return
        }
        ezreply(
            res.url
        )
    },

    "about": "Hugs someone using Nekos.life.\nUsage: <prefix>hug <optional uid or mention>"
}