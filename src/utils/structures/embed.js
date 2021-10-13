const { sendEmbed } = require("../functions/sendmessages")
const { getAvatar } = require("../functions/commons")
const { getModule } = require("powercord/webpack")
const { getMember } = getModule(["getMember"], false)
const { getChannel } = getModule(["getChannel"], false)

const { botUserId } = powercord.api.settings.store.getSettings("otherbot")
module.exports = class Embed {
    constructor(author = false, timestamp = true, type = "rich") {
        this.type = type;
        if (author) {
            this.setAuthor(author.username + "#" + author.discriminator, "", getAvatar(author.id, author.avatar))
        }
        if (timestamp) {
            this.setTimestamp(new Date(Date.now()).toISOString())
        }
        this.color = false
    }

    send(channelId, message_id = false) {
        if (!this.color) {
            const guild = getChannel(channelId).guild_id
            this.color = parseInt(getMember(guild, botUserId).colorString.slice(1) || "ffc9fe", 16)
        }
        sendEmbed(channelId, this, message_id);
    }

    //useless since user account limits are different apparently
    //also somehow doesnt work
    isTooLong() {
        if (this.title?.length > 256) { return true }
        if (this.description.length > 4096) { return true }
        if (this.fields?.length > 25) { return true }
        if (this.fields) {
            this.fields.forEach(e => {
                if (e.name > 256) { return true }
                if (e.value > 1024) { return true }
            })
        }
        if (this.footer?.text.length > 2048) { return true }
        if (this.author?.name.length > 256) { return true }

        console.log(this)
        //Credit for below code goes to Detritus https://github.com/detritusjs/client/blob/b27cbaa5bfb48506b059be178da0e871b83ba95e/src/utils/embed.ts#L56
        let total = 0;

        if (this.author) {
            total += (this.author.name || '').length;
        }
        if (this.title) {
            total += (this.title || '').length;
        }
        if (this.description) {
            total += (this.description || '').length;
        }
        if (this.fields) {
            total += this.fields.reduce((s, field) => s + (field.name || '').length + (field.value || '').length, 0);
        }
        if (this.footer) {
            total += (this.footer.text || '').length;
        }

        if (total > 6000) { return true }
        return false
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