const fetch = require("node-fetch")
const si = require("systeminformation");
const { prefix, responders, botUserId, botOwnerId, allowedUsers, admins } = powercord.api.settings.store.getSettings("otherbot")

const { getModule } = require("powercord/webpack")
const { getGuilds } = getModule(["getGuilds"], false)
const { getMemberCount } = getModule(["getMemberCount"], false)

const statcord = {
    auto: true,

    async autoPost() {
        setInterval(
            async () => {
                if (this.auto) { await this.postStats() }
            },
            1800000
        );
    },

    stopAutoPost() {
        this.auto = false // idk if this helps but i put it in anyways
    },

    async postStats() {
        const load = await si.currentLoad();
        const guildIds = Object.keys(getGuilds())
        const memberCounts = guildIds.reduce((prev, curr) => prev + getMemberCount(curr), 0)
        const popularObj = global.stats.ghost.popular
        let popularArr = []
        if (popularObj) {
            Object.keys(popularObj).forEach(e => popularArr.push({
                name: popularObj[e].name,
                count: popularObj[e].count.toString()
            }))
            popularArr.sort((a, b) => a.count - b.count).splice(5)
        }

        const stats = {
            id: "887739462103216199", //main statcord bot page, use an actual bots id in your version
            key: "statcord.com-IOgDh4ECVoQZI7volDHP", //dont steal pls lmfao
            servers: guildIds.length.toString(),
            users: memberCounts.toString(),
            active: Array.from(global.stats.ghost.active),
            commands: global.stats.ghost.commandsRan.toString(),
            popular: popularArr,
            memactive: process.memoryUsage().heapUsed.toString(),
            memload: "0",
            cpuload: Math.round(load.currentLoad).toString(),
            bandwidth: "0",
            custom1: "0",
            custom2: "0"
        }

        const res = await fetch("https://api.statcord.com/v3/stats", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(stats)
        })
        console.log(res)

        global.stats.store.commandsRan = 0
        global.stats.store.active = []
        global.stats.store.popular = {}
    }
}


module.exports = statcord