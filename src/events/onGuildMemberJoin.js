const Embed = require("../utils/structures/embed")
const { getAvatar } = require("../utils/functions/commons")

const yep = {
    "885600160212717608": "897426258290413588"
}


module.exports = async function ({ guildId, joinedAt, user, nick}) {
    const now = new Date(Date.now()).toISOString().slice(0, 18)

    if (yep[guildId] && !nick && joinedAt.startsWith(now)) {
        let e = new Embed()
        e.setTitle("Member joined")
        e.setThumbnail(getAvatar(user.id, user.avatar))
        e.setDescription(user.username + "#" + user.discriminator)
        e.addField("Id", user.id)
        e.send(yep[guildId])
    }
}