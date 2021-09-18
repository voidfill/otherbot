const nekoslife = require("nekos.life")
const neko = new nekoslife()

module.exports = {
    async executor(main) {
        const { ezreply } = main;
        const res = await neko.sfw.slap()
        if (main.contentNoCmd != "" && (/\d{18}/g).exec(main.subargs[0])) { 
            ezreply(
                "<@!" + main.message.author.id + "> slaps <@!" + (/\d{18}/g).exec(main.subargs[0]) + ">\n" +
                res.url
            );
            return
        }
        ezreply(
            res.url
        )
    },

    "about": "Slaps someone using Nekos.life.\nUsage: <prefix>slap <optional uid or mention>"
}
