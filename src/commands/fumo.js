const fetch = require("node-fetch");
const Embed = require("../utils/structures/embed");
const { sendContent } = require("../utils/functions/sendmessages")

const { prefix, responders, botUserId, allowedUsers, allowedUsersTop } = powercord.api.settings.store.getSettings("otherbot");
module.exports = {
    //idk if i need all those but yeah exporting them anyways
    async getFumoByID(id) {
        if (!id) throw new Error("You need to provide an id");
        const res = await fetch(`http://fumoapi.herokuapp.com/fumos/${id}`);
        const data = await res.json();
        const url = data.URL;
        return url;
    },

    async randomFumo() {
        const res = await fetch("http://fumoapi.herokuapp.com/random");
        const data = await res.json();
        const url = data.URL;
        return url;
    },

    async allFumos() {
        const res = await fetch("http://fumoapi.herokuapp.com/fumos");
        const data = await res.json();
        return data;
    },

    "default": {
        async executor({ channel, message, author, contentRaw, content, args }) {
            let e = new Embed(author);
            e.setTitle("Random fumo")
            const res = await fetch("http://fumoapi.herokuapp.com/random");
            const data = await res.json();
            e.setImage(data.URL);
            e.setDescription("id: " + data._id)
            e.send(channel);
        },

        "about": "Get a random fumo image",
        "syntax": prefix + "fumo",
        "restricted": false
    },

    "id": {
        async executor({ channel, message, author, contentRaw, content, args }) {
            if (args.length == 0) {
                sendContent(channel, "You need to provide an id.\nSyntx: " + this.syntax, message.id)
                return
            }
            let e = new Embed(author);
            e.setTitle("Fumo by id")
            try {
                const res = await fetch(`http://fumoapi.herokuapp.com/fumos/${args[0]}`);
                const data = await res.json();
                e.setImage(data.URL);
                e.setDescription("id: " + data._id)
                e.send(channel);
            } catch(e) {
                sendContent(channel, "That id isnt valid.", message.id)
            }
        },

        "about": "Get a fumo image from an id.",
        "syntax": prefix + "fumo id [fumo_id]",
        "restricted": false
    }
}