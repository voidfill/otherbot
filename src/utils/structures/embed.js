const { sendEmbed } = require("../functions/sendmessages")
const { getAvatar } = require("../functions/commons")
const { getModule } = require("powercord/webpack")
const { getMember } = getModule(["getMember"], false)
const { getChannel } = getModule(["getChannel"], false)

const { botUserId } = powercord.api.settings.store.getSettings("otherbot")
module.exports = class Embed {
    constructor(author = false, timestamp = true, type = "rich") {
        this.type = type;
        if(author) {
            this.setAuthor(author.username + author.discriminator, "", getAvatar(author.id, author.avatar))
        }
        if(timestamp) {
            this.setTimestamp(new Date(Date.now()).toISOString())
        }
        this.color = false
    }

    send(channelId, message_id = false) {
        if(!this.color) {
            const guild = getChannel(channelId).guild_id
            this.color = parseInt(getMember(guild, botUserId).colorString.slice(1) || "ffc9fe", 16)
        }
        sendEmbed(channelId, this, message_id);
    }

    setTitle(title) {
        this.title = title;
    }

    setDescription(description) {
        this.description = description;
    }

    setColor(color) {
        this.color = color;
    }

    addField(name, value, inline = false) {
        if (this.fields) {
            this.fields.push(
                {
                    name: name,
                    value: value,
                    inline: inline
                }
            )
        } else {
            this.fields = [];
            this.addField(name, value, inline);
        }
    }

    setTimestamp(timestamp) {
        this.timestamp = timestamp;
    }

    setImage(url, proxy_url = "", height = 0, width = 0) {
        this.image = {
            url: url,
            proxy_url: proxy_url,
            height: height,
            width: width
        };
    }

    setThumbnail(url, proxy_url = "", height = 0, width = 0) {
        this.thumbnail = {
            url: url,
            proxy_url: proxy_url,
            height: height,
            width: width
        };
    }

    setAuthor(name, url = "", icon_url = "", proxy_icon_url = "") {
        this.author = {
            name: name,
            url: url,
            icon_url: icon_url,
            proxy_icon_url: proxy_icon_url
        };
    }

    setFooter(text, icon_url = "", proxy_icon_url = "") {
        this.footer = {
            text: text,
            icon_url: icon_url,
            proxy_icon_url: proxy_icon_url
        };
    }
    
    setUrl(url) {
        this.url = url;
    }
}