module.exports = {
    executor(main) {
        const { ezreply } = main
        if(main.contentNoCmd == "") {
            main.subargs = ["setprefix"]
            this.commands.help.executor.call(this, main)
            return
        }
        this.prefix = main.contentNoCmd
        this.regPrefix = new RegExp("^" + this.prefix, "gi");
        this.settings.set("prefix", main.contentNoCmd)
        ezreply("set prefix to " + this.prefix)
    },

    "about": "Change the bot prefix.\nUsage: <prefix>setprefix <new prefix>"
}
