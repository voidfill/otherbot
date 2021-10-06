const Embed = require("../utils/structures/embed")

module.exports = {
    "default": {
        executor({ channelId}) {
            const e = new Embed();
            e.setTitle("hi")
            e.setDescription("uwu")
            e.send(channelId)
        },
        "about": "sexo"
    },

    "help": {
        executor(e) {
            sendEmbed()
        },
        "restricted": true,
        "about": "helpppp"
    }
}