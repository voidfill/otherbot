const { getAllModules, getModule } = require("powercord/webpack");
const getChannel = getModule(["getChannel"], false).getChannel;
const messageQueue = getAllModules(arg => arg.enqueue)[0]

const Message = require("../structures/message");

function queue(message) {
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
    sendEmbed(channel_id, embed) {
        queue(
            new Message(channel_id, "", embed)
        )
    }
}
