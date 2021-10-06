const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const Dispatch = getModule(["dirtyDispatch"], false)
const { onMessage } = require("./src/events")

module.exports = class OtherBot extends Plugin {

    constructor () {
        super();
        this.settings.set("botUserId", localStorage.getItem("user_id_cache").replace(/\"/g, ''))
        this.settings.getKeys().forEach(element => {
            this[element] = this.settings.get(element)
        });
    }

    async startPlugin () {
        Dispatch.subscribe("MESSAGE_CREATE", onMessage)
    }

    pluginWillUnload () {
        Dispatch.unsubscribe("MESSAGE_CREATE", onMessage)
    }

};