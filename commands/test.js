const { getAllModules, getModule, getModuleByDisplayName } = require("powercord/webpack")
const { inject, uninject } = require('powercord/injector');

const messageQueue = getAllModules(arg => arg.enqueue)[0]
const createBotMessage = getModule(["createBotMessage"],false)
const fromTimestamp = getModule(["fromTimestamp"], false).fromTimestamp



const Embed = require("../utils/embed")

module.exports = {
    executor(main) {
        const { ezreply } = main
        if(main.message.author.id != this.owner) { return }

        let embed = new Embed();
        embed.setTitle("title")
        embed.setDescription("description")
        embed.setColor(0x0000FF)
        embed.addField("name", "value")
        embed.addField("name", "value", true)
        embed.addField("name", "value", true)
        embed.setTimestamp(new Date(Date.now()).toISOString())
        embed.setImage("https://cdn.discordapp.com/icons/892148648312463400/f4884070e3c30529d677166a88120140.webp?size=2048")
        embed.setThumbnail("https://cdn.discordapp.com/icons/824921608560181258/0c598e0d124da434c8c9ab4cd56a369e.webp?size=2048")
        embed.setAuthor("author#1111", "https://youtube.com", "https://cdn.discordapp.com/avatars/726521346477260821/961018776c20c99304362694fafa356c.webp?size=2048")
        embed.setFooter("footer", "https://cdn.discordapp.com/avatars/726521346477260821/961018776c20c99304362694fafa356c.webp?size=2048")
        embed.setUrl("https://discord.com")
        
        
        //this.commands.send.embed(main.channelId, embed)

    },
    "about": "literally just a test command"
}