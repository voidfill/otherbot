const fetch = require("node-fetch");

const token = localStorage.getItem("token").replace(/\"/g, '')
const { botToken } = powercord.api.settings.store.getSettings("otherbot")

module.exports = {
    async bulkdelete(channel, messages) {
        const res = await fetch(`https://discord.com/api/v9/channels/${channel.id}/messages/bulk-delete`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": botToken,
                //"User-Agent": "Powercord (https://github.com/powercord-org/powercord)",
                //"X-Audit-Log-Reason": "moved"
            },
            body: JSON.stringify({
                messages: messages
            })
        })
        //console.log(res)
    },

    async getLastMessages(channel, limit = 50) {
        const res = await fetch(`https://discord.com/api/v9/channels/${channel.id}/messages?limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": token
            }
        })
        const data = await res.json()
        return data
    }

}