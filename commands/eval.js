const { getModule } = require("powercord/webpack")

module.exports = {
    executor: async (main) => {
        try {
            const commands = main.that.commands
            eval(main.contentNoCmd)
        } catch(err) {
            console.log(main)
            main.that.commands.send.reply(
                main.channelId,
                main.message.id,
                JSON.stringify(err,Object.getOwnPropertyNames(err)).match(/^[\s\S]{1,150}\\n/g)[0].replace("{\"stack\":\"", "").replace(/\\n\s*/g, " ")
            )
        } finally {

        }
    }
}