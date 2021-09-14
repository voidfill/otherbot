const { getModule } = require("powercord/webpack")

module.exports = {
    executor: (main) => {
        main.that.settings.set("reloadState", {
            state: true,
            channel: main.channelId,
            user: main.message.author.id,
            msgid: main.message.id
        })
        setTimeout(() => DiscordNative.app.relaunch(), 2000)
    },

    startup: (that) => {
        if (!that.reloadState.state) { return } else {
            that.reloadState.state = false;
            that.settings.set("reloadState", that.reloadState);
            that.commands.send.reply(
                that.reloadState.channel,
                that.reloadState.msgid,
                "finished reloading."
            )
        }
    }
}
