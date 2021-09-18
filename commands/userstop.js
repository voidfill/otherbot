const { getModule } = require("powercord/webpack")
const { message } = require("./send")

module.exports = {
    async executor(main) {
        const { ezreply } = main
        if (!this.allowedUsersTop.has(main.message.author.id)) {
            ezreply(
                "You dont have permissions to do this."
            )
            return
        }
        this.options = {
            add() {
                if ((/\d{18}/g).exec(main.subargs[1])) {
                    if (!this.allowedUsersTop.has(main.subargs[1].match(/\d{18}/g)[0])) {
                        if (!this.allowedUsers.has(main.subargs[1].match(/\d{18}/g)[0])) {
                            this.allowedUsers.add(main.subargs[1].match(/\d{18}/g)[0])
                            this.settings.set("allowedUsers", Array.from(this.allowedUsers))
                        }
                        this.allowedUsersTop.add(main.subargs[1].match(/\d{18}/g)[0])
                        this.settings.set("allowedUsersTop", Array.from(this.allowedUsersTop))
                        ezreply("Added " + main.subargs[1].match(/\d{18}/g)[0])
                        return
                    }
                    ezreply("Already in the set.")
                    return
                }
                ezreply("Invalid mention or uid.")
            },
            clear() {
                if (main.message.author.id = "579731384868798464") {
                    this.settings.set("allowedUsersTop", [])
                    this.commands.reload.executor.call(this, main)
                    return
                }
                ezreply("lol no")
            },
            remove() {
                if ((/\d{18}/g).exec(main.subargs[1])) {
                    this.allowedUsersTop.delete(main.subargs[1].match(/\d{18}/g)[0])
                    this.settings.set("allowedUsersTop", Array.from(this.allowedUsersTop))
                    ezreply("Removed " + main.subargs[1].match(/\d{18}/g)[0])
                    return
                }
                ezreply("Invalid mention or uid.")
            }

        }
        if (main.subargs == null) {
            ezreply(Array.from(this.allowedUsersTop).join(", ") + "\noptions: add, remove, clear")
        } else if (this.options[main.subargs[0]]) {
            this.options[main.subargs[0]].call(this)
        } else () => {
            ezreply("Invalid option.")
        }
    },

    "about": "Returns all current allowed toplevel botusers.\nSubcommands: add, remove, clear\nUsage: <prefix>users <subcommand> <userid or mention>"
}