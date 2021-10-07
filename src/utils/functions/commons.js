module.exports = {
    getAvatar(user_id, user_avatar) {
        return "https://cdn.discordapp.com/avatars/" + user_id + "/" + user_avatar + (user_avatar.startsWith("a_") ? ".gif?size=2048" : ".webp?size=2048")
    }
}