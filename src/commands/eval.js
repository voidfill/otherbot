const { sendContent } = require("../utils/functions/sendmessages")
const Embed = require("../utils/structures/embed")
const carbon = require("./carbon")
const { getModule } = require("powercord/webpack")
const { getGuilds } = getModule(["getGuilds"], false)

const { getOrCreateWebhook, sendHook, sendMessage } = require("../utils/functions/webhook")

module.exports = {
    "default": {
        async executor({ channel, message, author, contentRaw, content, args }) {
            if (args.length == 0) {
                sendContent(channel, "You didnt give me anything to evaluate lmao.", message.id)
                return
            }
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
                    e.send(channel, message.id)
            } finally {
                console.log("Evaluated " + content)
            }

        },

        "restricted": true,
        "about": "Evaluates something."
    }
}