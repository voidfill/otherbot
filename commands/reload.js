const { getModule } = require("powercord/webpack")

module.exports = {
    executor(main) {
        if (!this.allowedUsersTop.has(main.message.author.id)) {
            main.ezreply(
                "You dont have permissions to do this."
            )
            return
        }
        this.settings.set("reloadState", {
            state: true,
            channel: main.channelId,
            user: main.message.author.id,
            msgid: main.message.id
        })
        setTimeout(() => DiscordNative.app.relaunch(), 2000)
    },

    startup() {
        if (!this.reloadState.state) { return } else {
            this.reloadState.state = false;
            this.settings.set("reloadState", this.reloadState);
            this.commands.send.reply(
                this.reloadState.channel,
                this.reloadState.msgid,
                "finished reloading."
            )
        }
    },

    "about": "Reloads the client."
}
