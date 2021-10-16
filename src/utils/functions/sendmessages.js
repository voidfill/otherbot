const { getAllModules, getModule } = require("powercord/webpack");
const messageQueue = getAllModules(arg => arg.enqueue)[0]
const { upload } = getModule(["instantBatchUpload"], false)

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
    sendEmbed(channel, embed, message_id = false) {
        queue(
            new Message(channel, "", embed, message_id)
        )
    },

    sendContent(channel, content, message_id = false) {
        queue(
            new Message(channel, content, false, message_id)
        )
    },

    sendAny(message) {
        queue(message)
    },

    sendFile(channel, file) {
        upload(channel.id,
            file,
            0, {
            "content": "",
            "tts": false,
            "invalidEmojis": [],
            "validNonShortcutEmojis": []
        },
            false,
            file.name
        )
    }
}
