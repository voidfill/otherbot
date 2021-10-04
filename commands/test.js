const { getAllModules, getModule, getModuleByDisplayName } = require("powercord/webpack")
const { inject, uninject } = require('powercord/injector');

const messageQueue = getAllModules(arg => arg.enqueue)[0]
const createBotMessage = getModule(["createBotMessage"],false)
const fromTimestamp = getModule(["fromTimestamp"], false).fromTimestamp

module.exports = {
    executor(main) {
        const { ezreply } = main
        if(main.message.author.id != this.owner) { return }
        console.log(fromTimestamp(Date.now()))
        inject("sexo", messageQueue, "enqueue", ((thisObject, args, res) =>
            console.log(thisObject, args, res)
        ), true)
        const obj = []

        try {
            messageQueue.enqueue({
                type: 0,
                message: {
                    channelId: main.channelId,
                    content: 'sexo',
                    tts: false,
                    nonce: fromTimestamp(Date.now()),
                    embed: null
                }
            }, r => {
                return;
            })
        } catch (err) {
            console.log(err)
        }
        // .createBotMessage(main.channelId, "")
        uninject("sexo")
        
    },
    
    "about": "literally just a test command"
}