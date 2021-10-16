const nests = require("nests")
global.deletedMessageStore ? {} : global.deletedMessageStore = nests.make()
global.editedMessageStore ? {} : global.editedMessageStore = nests.make()

module.exports = async (args) => {
    if (args.type == "MESSAGE_UPDATE") {
        if (!global.editedMessageStore.ghost[args.message.channel_id]) {
            global.editedMessageStore.store[args.message.channel_id] = []
        }
        global.editedMessageStore.store[args.message.channel_id].push(args.message.id)
    }
    if (args.type == "MESSAGE_DELETE") {
        if (!global.deletedMessageStore.ghost[args.channelId]) {
            global.deletedMessageStore.store[args.channelId] = []
        }
        global.deletedMessageStore.store[args.channelId].push(args.id)
    }
}