const { sendContent } = require("../utils/functions/sendmessages")
const Embed = require("../utils/structures/embed")
const carbon = require("./carbon")


module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            try {
                eval(content)
            } catch (err) {
                    let e = new Embed(author)
                    e.setTitle("Error:")
                    e.setDescription(
                        JSON.stringify(err, Object.getOwnPropertyNames(err))
                            .match(/^[^\n]{1,400}/)[0]
                            .replace("{\"stack\":\"", "")
                            .replace(/\\n\s*/g, " ")
                    )
                    e.send(channelId, message.id)
            } finally {
                console.log("Evaluated " + content)
            }

        },

        "restricted": true,
        "about": "Evaluates something."
    }
}