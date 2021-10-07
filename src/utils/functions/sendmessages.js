const { getAllModules, getModule } = require("powercord/webpack");
const messageQueue = getAllModules(arg => arg.enqueue)[0]

const Message = require("../structures/message");

async function queue(message) {
    messageQueue.enqueue(
        {
            "type": 0,
            "message": message,
        },
        r => {
            return;
        }
    )
}

module.exports = {
    sendEmbed(channel_id, embed, message_id = false) {
        queue(
            new Message(channel_id, "", embed, message_id)
        )
    },

    sendContent(channel_id, content, message_id = false) {
        queue(
            new Message(channel_id, content, false, message_id)
        )
    },

    sendAny(message) {
        queue(message)
    }
}
