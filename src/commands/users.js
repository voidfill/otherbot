const { sendContent, sendEmbed } = require("../utils/functions/sendmessages")
const { softReload, getUID } = require("../utils/functions/commons")
const Embed = require("../utils/structures/embed")
const settings = require("../utils/functions/settings")
const help = require("../commands/help")

const { prefix, responders, botUserId, allowedUsers, admins, botOwnerId } = powercord.api.settings.store.getSettings("otherbot")
module.exports = {
    "default": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            let e = new Embed(author);
            e.setTitle("Users");
            e.setDescription("options: add, remove, clear");
            const list = "<@!" + allowedUsers.join(">, <@!") + ">";
            e.addField("List", list);
            e.send(channelId);
        },

        "about": "Lists all current users.",
        "syntax": prefix + "users",
        "restricted": false
    },

    "add": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            const uid = getUID(args);
            if (uid) {
                let e = new Embed(author);
                e.setTitle("Users");

                if (allowedUsers.includes(uid)) {
                    e.setDescription("<@!" + uid + "> is already on the list.");
                    e.send(channelId);
                    return
                }
                allowedUsers.push(uid);
                settings.set("allowedUsers", allowedUsers);
                setTimeout(softReload(), 2000);

                e.setDescription("Added <@!" + uid + ">");
                e.send(channelId);
                return
            }
            help.default.executor({ channelId: channelId, author: author, args: ["users", "add"] })
        },

        "about": "Add a user to the allowed list.",
        "syntax": prefix + "users add [userid/mention]",
        "restricted": true
    },

    "remove": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            const uid = getUID(args);
            if (uid) {
                const index = allowedUsers.indexOf(uid);
                if (index != -1) {
                    allowedUsers.splice(index, 1);
                    settings.set("allowedUsers", allowedUsers);
                    setTimeout(softReload(), 2000);
                }

                let e = new Embed(author);
                e.setTitle("Users");
                e.setDescription("Removed <@!" + uid + ">");
                e.send(channelId);
                return
            }
            help.default.executor({ channelId: channelId, author: author, args: ["users", "remove"] })
        },

        "about": "Remove a user from the allowed list.",
        "syntax": prefix + "users remove [userid/mention]",
        "restricted": true
    },

    "clear": {
        executor({ channelId, message, author, contentRaw, content, args }) {
            settings.set("allowedUsers", []);
            setTimeout(softReload(), 2000);

            let e = new Embed(author);
            e.setTitle("Users");
            e.setDescription("Cleared the list c:");
            e.send(channelId);
        },

        "about": "Clear the allowed user list",
        "syntax": prefix + "users clear",
        "restricted": true
    }
}