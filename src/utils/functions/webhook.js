const fetch = require("node-fetch");
const defaultMentions = {
    parse: [],
    replied_user: false
}

module.exports = {
    async sendHook(webhook, {
        content = "",
        username = "",
        avatar_url = "",
        tts = false,
        embeds = [],
        allowed_mentions = defaultMentions
    }) {
        console.log(webhook)
        try {
            const res = await fetch(`https://discord.com/api/webhooks/${webhook.id}/${webhook.token}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    content: content,
                    username: username,
                    avatar_url: avatar_url,
                    tts: tts,
                    embeds: embeds,
                    allowed_mentions: allowed_mentions
                })
            })
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }
}
