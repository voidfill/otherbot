const { getModule, getModuleByDisplayName } = require("powercord/webpack")

module.exports = {
    executor(main) {
        const { ezreply } = main
        if(main.message.author.id != this.owner) { return }
        console.log(getModuleByDisplayName("ClientDebugInfo",false))
        console.log(window.GLOBAL_ENV)
        console.log(getModule(["APP_INFORMATION"], false))
    },
    
    "about": "literally just a test command"
}