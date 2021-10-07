

module.exports = {
    "default": {
        executor({channelId, message, author, contentRaw, content, args}){
            try {
                eval(content)
            } catch (e) {
                console.log(e)
            } finally {
                console.log("evaluated " + content)
            }

        },
        
        "restricted": true,
        "about": "Evaluates something."
    }
}