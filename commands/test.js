const { getModule, getModuleByDisplayName } = require("powercord/webpack")

module.exports = {
    executor(main) {
        const { ezreply } = main
        if(main.message.author.id != this.owner) { return }
        if(-1) {
            console.log("cum")
        }
    },
    
    "about": "literally just a test command"
}