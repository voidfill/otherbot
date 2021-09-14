const { getModule } = require("powercord/webpack")
const { message } = require("./send")

module.exports = {
    async executor(main) {
        this.options = {
            add() {
                if ((/\d{18}/g).exec(main.subargs[1])) {
                    if (!this.allowedUsers.has(main.subargs[1].match(/\d{18}/g)[0])) {
                        this.allowedUsers.add(main.subargs[1].match(/\d{18}/g)[0])
                        this.settings.set("allowedUsers", Array.from(this.allowedUsers))
                        this.commands.send.reply(main.channelId, main.message.id, "added " + main.subargs[1].match(/\d{18}/g)[0])
                        return
                    }
                    this.commands.send.reply(main.channelId, main.message.id, "already in the set")
                    return
                }
                console.log(this.commands)
                this.commands.send.reply(main.channelId, main.message.id, "invalid mention or uid")
            },
            clear() {
                if (main.message.author.id = "579731384868798464") {
                    this.settings.set("allowedUsers", [])
                    this.commands.reload.executor.call(this, main)
                    return
                }
                console.log(main.message.author)
                this.commands.send.reply(main.channelId, main.message.id, "lol no")
            },
            remove() {
                if ((/\d{18}/g).exec(main.subargs[1]) && this.allowedUsers.delete(main.subargs[1].match(/\d{18}/g)[0])) {
                    this.commands.send.reply(main.channelId, main.message.id, "removed " + main.subargs[1].match(/\d{18}/g)[0])
                    return
                }
                this.commands.send.reply(main.channelId, main.message.id, "invalid mention or uid")
            }

        }
        if (main.subargs == null) {
            this.commands.send.reply(main.channelId, main.message.id, Array.from(this.allowedUsers).join(", ") + "\noptions: add, remove, clear")
            console.log(this)
        } else if (this.options[main.subargs[0]]) {
            this.options[main.subargs[0]].call(this)
        } else () => {
            this.commands.send.reply(main.channelId, main.message.id, "invalid option")
        }
    }
}