const { getModule } = require("powercord/webpack")

module.exports = {
    async executor(main) {
        const { ezreply } = main
        if (main.contentNoCmd == "") {
            ezreply("You didnt give me anything to evaluate :|")
            return
        }
        try {
            const commands = this.commands
            eval(main.contentNoCmd)
        } catch (err) {
            ezreply (
                JSON.stringify(err, Object.getOwnPropertyNames(err))
                    .match(/^[^\n]{1,150}/)[0]
                    .replace("{\"stack\":\"", "")
                    .replace(/\\n\s*/g, " ")
            )
        } finally {
            console.log("Evaluated " + main.contentNoCmd)
        }
    },

    "about": "Evaluates something.\nUsage: <prefix>eval <what to evaluate>"
}