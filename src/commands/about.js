const Embed = require("../utils/structures/embed")
const { getAvatar, getDateFromId } = require("../utils/functions/commons")

const { getModule } = require("powercord/webpack");

const build = window.GLOBAL_ENV.RELEASE_CHANNEL;
const buildId = window.GLOBAL_ENV.SENTRY_TAGS.buildId
const buildType = window.GLOBAL_ENV.SENTRY_TAGS.buildType
const guilds = getModule(["getGuilds"], false).getGuilds()
const guildNames = Object.keys(guilds).map(e => guilds[e].name)
const botUser = getModule(["getCurrentUser"], false).getCurrentUser();

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channel, message, author, contentRaw, content, args }) {
            let e = new Embed(author);
            e.setTitle("OtherBot");
            e.setUrl("https://github.com/voidfill/otherbot");
            e.setDescription("OtherBot is a multipurpose selfbot running as a powercord plugin made for fun.")
            e.setThumbnail(getAvatar(botUser.id, botUser.avatar))
            e.addField("Account", botUser.username + "#" + botUser.discriminator, true)
            e.addField("Created at", "<t:" + getDateFromId(botUser.id) + ":d>", true)
            e.addField("Started", "soon:tm:", true)
            e.addField("Guilds", guildNames.join(", "))
            e.addField("Platform", build + " " + buildType + " " + buildId)
            e.setFooter("<3")
            e.send(channel);
        },

        "about": "Get some info about the bot.",
        "syntax": prefix + "about",
        "restricted": false
    }
}