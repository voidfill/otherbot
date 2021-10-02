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
        this.reloadState.time = new Date().getTime()
        if (!this.reloadState.state) {
            this.settings.set("reloadState", this.reloadState)
        } else {
            this.reloadState.state = false;
            this.settings.set("reloadState", this.reloadState);
            this.commands.send.reply(
                this.reloadState.channel,
                this.reloadState.msgid,
                "finished reloading."
            )
        }
        if (!this.allowedUsers.has(this.owner)) {
            this.allowedUsers.add(this.owner)
        }
        if (!this.allowedUsersTop.has(this.owner)) {
            this.allowedUsersTop.add(this.owner)
        }
    },

    "about": "Reloads the client."
}
