const settings = require("./settings")

module.exports = {
    getAvatar(user_id, user_avatar) {
        return "https://cdn.discordapp.com/avatars/" + user_id + "/" + user_avatar + (user_avatar.startsWith("a_") ? ".gif?size=2048" : ".webp?size=2048")
    },
    
    softReload(){
        const reg = new RegExp("/" + settings.get("entityID") + "\\src/g")
        Object.keys(require.cache).filter(e => reg.exec(e)).forEach((key) => {
            delete require.cache[key]
        })
        powercord.pluginManager.remount("otherbot")
    }
}