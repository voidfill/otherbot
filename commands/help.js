module.exports = {
    async executor(main) {
        if (main.subargs == null) {
            this.commands.send.reply(main.channelId, main.message.id, "yes")
        }

    }
}