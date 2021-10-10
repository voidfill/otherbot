const { sendContent, sendEmbed, sendFile } = require("../utils/functions/sendmessages")
const help = require("./help")

const fetch = require("node-fetch");
const url = "https://carbonnowsh.herokuapp.com/"
let xhr = new XMLHttpRequest();

const { getModule } = require("powercord/webpack")
const { Permissions } = getModule(["Permissions"], false);
const { can } = getModule(["getChannelPermissions"], false);
const { getChannel } = getModule(["getChannel"], false);

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        async executor({ channelId, message, author, contentRaw, content, args }) {
            if (args.length == 0) {
                help.default.executor({ channelId: channelId, author: author, args: ["carbon"] })
                return
            }

            if (!can(Permissions.ATTACH_FILES, getChannel(channelId))) {
                sendContent(channelId, "I cant upload files here. Please use this command in a channel where i can.", message.id)
                return
            }

            const contentNL = content.replace(/\n/g, "%250A")
            const data = {
                "code": contentNL,
                backgroundColor: "rgba(54, 57, 63)"
            }

            fetch(url, {
                method: 'POST',
                headers: {
                    "Accept": "image/*",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(response => {
                console.log(response)
                response.blob().then(async function(e) {
                    const buf = await e.arrayBuffer()
                    const file = new File([buf], "carbon" + message.id + ".png", {
                        type: "image/png"
                    })
                    sendFile(channelId, file)
                })
            })
        },

        "about": "Get a carbon image of your code.",
        "syntax": prefix + "carbon [code]",
        "restricted": false
    }
}