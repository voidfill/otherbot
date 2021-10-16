const Embed = require("../utils/structures/embed")
const list = [
    "100",
    "101",
    "102",
    "200",
    "201",
    "202",
    "203",
    "204",
    "206",
    "207",
    "300",
    "301",
    "302",
    "303",
    "304",
    "305",
    "307",
    "308",
    "400",
    "401",
    "402",
    "403",
    "404",
    "405",
    "406",
    "407",
    "408",
    "409",
    "410",
    "411",
    "412",
    "413",
    "414",
    "415",
    "416",
    "417",
    "418",
    "420",
    "421",
    "422",
    "423",
    "424",
    "425",
    "426",
    "429",
    "431",
    "444",
    "450",
    "451",
    "497",
    "498",
    "499",
    "500",
    "501",
    "502",
    "503",
    "504",
    "506",
    "507",
    "508",
    "509",
    "510",
    "511",
    "521",
    "523",
    "525",
    "599"
]

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channel, message, author, contentRaw, content, args }) {
            let e = new Embed(author)
            if (args[0] && list.includes(args[0])) {
                e.setImage(`https://http.cat/${args[0]}`)
            } else {
                e.setDescription("That status code doesnt exist or isnt available. Heres a list:\n" + list.join(", "))
            }
            e.send(channel)
        },

        "about": "Http status codes with cats.",
        "syntax": prefix + "httpcat [statuscode]",
        "restricted": false
    }
}