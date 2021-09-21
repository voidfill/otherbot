const { getModule } = require("powercord/webpack")
const { message } = require("./send")

module.exports = {
    async executor(main) {
        const { ezreply } = main
        console.log(main)
        this.options = {
            add() {
                if ((/\d{18}/g).exec(main.subargs[1])) {
                    const uid = main.subargs[1].match(/\d{18}/g)[0]
                    if (!this.allowedUsers.has(uid)) {
                        this.allowedUsers.add(uid)
                        this.settings.set("allowedUsers", Array.from(this.allowedUsers))
                        ezreply("Added <@!" + uid + ">")
                        return
                    }
                    ezreply("Already in the set.")
                    return
                }
                ezreply("Invalid mention or uid.")
            },
            clear() {
                if (main.message.author.id = "579731384868798464") {
                    this.settings.set("allowedUsers", [])
                    this.commands.reload.executor.call(this, main)
                    return
                }
                ezreply("lol no")
            },
            remove() {
                if ((/\d{18}/g).exec(main.subargs[1]) && this.allowedUsers.delete(main.subargs[1].match(/\d{18}/g)[0])) {
                    ezreply("Removed " + main.subargs[1].match(/\d{18}/g)[0])
                    return
                }
                ezreply("Invalid mention or uid.")
            }

        }
        if (this.options[main.subargs[0]]) {
            this.options[main.subargs[0]].call(this)
            return
        }
        ezreply("<@!" + Array.from(this.allowedUsers).join(">, <@!") + ">\noptions: add, remove, clear")

    },

    "about": "Returns all current allowed botusers.\nSubcommands: add, remove, clear\nUsage: <prefix>users <subcommand> <userid or mention>"
}