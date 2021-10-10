const Embed = require("../utils/structures/embed");
const { getUID } = require("../utils/functions/commons")
const { getFromNeko } = require("./nl")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        async executor({ channelId, message, author, contentRaw, content, args }) {
            let e = new Embed(author);
            const uid = getUID(args);
            if(uid) {
                e.setDescription("<@!" + author.id + "> slaps <@!" + uid + ">");
            }
            e.setImage(
                await getFromNeko("sfw", "slap")
            )
            e.setFooter("Provided by Nekos.life api.")
            e.send(channelId)
        },

        "about": "Slap someone.",
        "syntax": prefix + "slap [userid/mention]",
        "restricted": false
    }
}