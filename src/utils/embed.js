module.exports = class Embed {
    constructor(type = "rich") {
        this.type = type
    }
    setTitle(title) {
        this.title = title
    }
    setDescription(description) {
        this.description = description
    }
    setColor(color) {
        this.color = color
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
            this.addField(name, value, inline)
        }
    }
    setTimestamp(timestamp) {
        this.timestamp = timestamp
    }
    setImage(url, proxy_url = "", height = 0, width = 0) {
        this.image = {
            url: url,
            proxy_url: proxy_url,
            height: height,
            width: width
        }
    }
    setThumbnail(url, proxy_url = "", height = 0, width = 0) {
        this.thumbnail = {
            url: url,
            proxy_url: proxy_url,
            height: height,
            width: width
        }
    }
    setAuthor(name, url = "", icon_url = "", proxy_icon_url = "") {
        this.author = {
            name: name,
            url: url,
            icon_url: icon_url,
            proxy_icon_url: proxy_icon_url
        }
    }
    setFooter(text, icon_url = "", proxy_icon_url = "") {
        this.footer = {
            text: text,
            icon_url: icon_url,
            proxy_icon_url: proxy_icon_url
        }
    }
    setUrl(url) {
        this.url = url
    }
}