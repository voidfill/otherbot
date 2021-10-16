const Embed = require("../utils/structures/embed");
const { getUID } = require("../utils/functions/commons")
const { getFromNeko } = require("./nl")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        async executor({ channel, message, author, contentRaw, content, args }) {
            let e = new Embed(author);
            const uid = getUID(args);
            if(uid) {
                e.setDescription("<@!" + author.id + "> feeds <@!" + uid + ">");
            }
            e.setImage(
                await getFromNeko("sfw", "feed")
            )
            e.setFooter("Provided by Nekos.life api.")
            e.send(channel)
        },

        "about": "Feed someone.",
        "syntax": prefix + "pat [userid/mention]",
        "restricted": false
    }
}