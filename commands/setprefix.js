module.exports = {
    executor(main) {
        const { ezreply } = main
        if (!this.allowedUsersTop.has(main.message.author.id)) {
            ezreply(
                "You dont have permissions to do this."
            )
            return
        }
        if(main.contentNoCmd == "") {
            main.subargs = ["setprefix"]
            this.commands.help.executor.call(this, main)
            return
        }
        this.prefix = main.contentNoCmd.replace(/^\s*/g, "")
        this.regPrefix = new RegExp("^" + this.prefix, "gi");
        this.settings.set("prefix", main.contentNoCmd)
        ezreply("set prefix to " + this.prefix)
    },

    "about": "Change the bot prefix.\nUsage: <prefix>setprefix <new prefix>"
}
