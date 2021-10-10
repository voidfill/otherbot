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
                e.setDescription("<@!" + author.id + "> kisses <@!" + uid + ">");
            }
            e.setImage(
                await getFromNeko("sfw", "kiss")
            )
            e.setFooter("Provided by Nekos.life api.")
            e.send(channelId)
        },

        "about": "Kiss someone.",
        "syntax": prefix + "kiss [userid/mention]",
        "restricted": false
    }
}