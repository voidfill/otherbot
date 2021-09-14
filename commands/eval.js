const { getModule } = require("powercord/webpack")

module.exports = {
    async executor(main) {
        if (main.contentNoCmd == "") {
            this.commands.send.reply(
                main.channelId, main.message.id, "you didnt anything to evaluate"
            )
            return
        }
        try {
            const commands = this.commands
            eval(main.contentNoCmd)
        } catch (err) {
            this.commands.send.reply(
                main.channelId,
                main.message.id,
                JSON.stringify(err, Object.getOwnPropertyNames(err)).match(/^[^\n]{1,150}/)[0].replace("{\"stack\":\"", "").replace(/\\n\s*/g, " ")
            )
        } finally {

        }
    }
}