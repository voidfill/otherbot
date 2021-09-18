const { getModule } = require("powercord/webpack")

module.exports = {
    executor(main) {
        const { ezreply } = main
        const getUser = getModule(["getUser"], false).getUser
        if(!this.deletedCache[main.channelId]) {
            ezreply("Theres nothing to snipe.")
            return
        }
        const deletedMessage = this.messageCache[main.channelId][this.deletedCache[main.channelId]]
        ezreply (
            "From: " + deletedMessage.author.username + "#" + deletedMessage.author.discriminator +
            " at <t:" + main.that.commands.about.getDate(deletedMessage.id) + ":t>\n> " +
            deletedMessage.content
        )
    },

    "about": "Snipes last deleted message in Channel."
}