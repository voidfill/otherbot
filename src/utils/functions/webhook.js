const fetch = require("node-fetch");
const defaultMentions = {
    parse: [],
    replied_user: false
}

const token = localStorage.getItem("token").replace(/\"/g, '')


async function sendHook(webhook, {
    content = "",
    username = "",
    avatar_url = "",
    tts = false,
    embeds = [],
    allowed_mentions = defaultMentions
}) {
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
    } catch (e) {
        console.log(e)
    }
}

async function getWebhooksForChannel(channel) {
    const res = await fetch(`https://discord.com/api/v9/channels/${channel.id}/webhooks`, {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": token,
            "User-Agent": "Powercord (https://github.com/powercord-org/powercord)"
        }
    })
    const webhooks = await res.json()
    return webhooks
}

async function createWebhook(channel) {
    const res = await fetch(`https://discord.com/api/v9/channels/${channel.id}/webhooks`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": token,
            "User-Agent": "Powercord (ttps://github.com/powercord-org/powercord)"
        },
        body: JSON.stringify({
            name: "otherbot"
        })
    })
    const webhook = await res.json()
    return webhook
}


async function getOrCreateWebhook(channel) {
    let webhooks = await getWebhooksForChannel(channel)
    webhooks.filter(w => w.name === "otherbot")
    if (webhooks.length > 0) {
        return webhooks[0]
    } else {
        return await createWebhook(channel)
    }
}

module.exports = {
    sendHook,
    getWebhooksForChannel,
    createWebhook,
    getOrCreateWebhook
}