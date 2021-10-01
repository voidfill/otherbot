const { tsExpressionWithTypeArguments } = require("@babel/types");
const { getModule } = require("powercord/webpack");
const getChannel = (e) => getModule(["getChannel"], false).getChannel(e)

module.exports = {
    executor(main) {
        const { ezreply } = main
        this.options = {
            add() {
                if(main.subargs.length < 4 || !main.subargs.includes("||")) {
                    ezreply(
                        "Invalid syntax. Syntax: <prefix>responders add <responsename> || <response>"
                    )
                    return
                }
                const guild = getChannel(main.channelId).guild_id
                this.responders[guild] = this.responders[guild] || {}
                this.responders[guild].array = this.responders[guild].array || []
                const splitterIndex = main.subargs.findIndex(e => e == "||")
                const newResponseName =  " " + main.subargs.slice(1, splitterIndex).join(" ") + " "
                const newResponse = main.subargs.slice(splitterIndex + 1).join(" ")
                if (this.responders[guild].array.includes(newResponseName)) {
                    ezreply(
                        "This responder already exists."
                    )
                    return
                }
                this.responders[guild].array.push(newResponseName)
                this.responders[guild][newResponseName] = newResponse
                this.settings.set("responders", this.responders)
                
                ezreply("Successfully added" + newResponseName)
                //this.responders[getChannel(main.channelId)].array.push
                
            },
            clear() {
                const guild = getChannel(main.channelId).guild_id
                if (main.message.author.id == this.owner) {
                    if (this.responders[guild]) {
                        delete this.responders[guild]
                        this.settings.set("responders", this.responders)
                        ezreply(
                            "Successfully cleared all responders for this guild."
                        )
                        return
                    }
                    ezreply(
                        "No responders for this guild?"
                    )
                    return
                }
                ezreply("lol no")
            },
            remove() {
                const guild = getChannel(main.channelId).guild_id
                this.responders[guild] = this.responders[guild] || {}
                this.responders[guild].array = this.responders[guild].array || []
                main.subargs.shift()
                const name = " " + main.subargs.join(" ") + " "
                const indexOfName = this.responders[guild].array.indexOf(name)
                if (indexOfName != -1) {
                    this.responders[guild].array.splice(indexOfName, 1)
                    delete this.responders[guild][name]
                    this.settings.set("responders", this.responders)
                    ezreply(
                        "Removed" + name
                    )
                } else {
                    ezreply(
                        "This responder doesnt exist."
                    )
                }
            }

        }
        if (this.options[main.subargs[0]]) {

            this.options[main.subargs[0]].call(this)
            return
        }
        const guildResponders = this.responders[getChannel(main.channelId).guild_id]
        ezreply((guildResponders.array && guildResponders.array.length != 0) ? guildResponders.array.join(", ") : "No responders for this guild.")
    },

    "about": "Automated responses. \nUsage: <prefix>"
}
