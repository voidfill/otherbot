const settings = require("./settings")
const uidReg = (/\d{18}/g)

module.exports = {
    getAvatar(user_id, user_avatar) {
        return "https://cdn.discordapp.com/avatars/" + user_id + "/" + user_avatar + (user_avatar.startsWith("a_") ? ".gif?size=2048" : ".webp?size=2048")
    },

    getBanner(user_id, user_banner){
        return "https://cdn.discordapp.com/banners/" + user_id + "/" + user_banner + (user_banner.startsWith("a_") ? ".gif?size=300" : ".webp?size=300")
    },
    
    softReload(){
        const reg = new RegExp("/" + settings.get("entityID") + "\\src/g")
        Object.keys(require.cache).filter(e => reg.exec(e)).forEach((key) => {
            delete require.cache[key]
        })
        powercord.pluginManager.remount("otherbot")
    },

    getUID(e) {
        if (e.length == 0) {
            return false
        }
        if (typeof e[0] == "string" && uidReg.exec(e)) {
            return e[0].match(uidReg)[0]
        }
        return false
    },

    getDateFromId(snowflake) {
        return Math.floor(new Date(snowflake / 4194304 + 1420070400000).getTime() / 1000)
    }
}