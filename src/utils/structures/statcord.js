const fetch = require("node-fetch")
const si = require("systeminformation");
const { prefix, responders, botUserId, botOwnerId, allowedUsers, admins } = powercord.api.settings.store.getSettings("otherbot")

const { getModule } = require("powercord/webpack")
const { getGuilds } = getModule(["getGuilds"], false)

const statcord = {
    auto: true,

    async autoPost() {
        setInterval(
            async () => {
                if(this.auto) { await this.postStats() }
            },
            90000
        );
    },

    stopAutoPost() {
        this.auto = false // idk if this helps but i put it in anyways
    },

    async postStats() {
        const load = await si.currentLoad();
        const stats = {
            id: "887739462103216199", //main statcord bot page, use an actual bots id in your version
            key: "statcord.com-IOgDh4ECVoQZI7volDHP", //dont steal pls lmfao
            servers: Object.keys(getGuilds()).length.toString(),
            users: allowedUsers.length.toString(),
            active: Array.from(global.stats.ghost.active),
            commands: global.stats.ghost.commandsRan.toString(),
            popular: [],
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
    }
}


module.exports = statcord