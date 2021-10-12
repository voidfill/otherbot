const { Plugin } = require("powercord/entities");
const { getModule } = require("powercord/webpack");
const Dispatch = getModule(["dirtyDispatch"], false)
const { onMessage, onReactionAdd, onUploadFail, onGuildMemberJoin, onGuildMemberUpdate } = require("./src/events");


const settings = require("./src/utils/functions/settings")
module.exports = class OtherBot extends Plugin {

    constructor () {
        super();
        this.settings.set("botUserId", localStorage.getItem("user_id_cache").replace(/\"/g, ''))
        this.settings.set("entityID", this.entityID)
        settings.init(this)
        window.PowercordNative.openDevTools({
            maximizable: false
        })
    }

    async startPlugin () {
        Dispatch.subscribe("MESSAGE_CREATE", onMessage);
        Dispatch.subscribe("MESSAGE_REACTION_ADD", onReactionAdd);
        Dispatch.subscribe("UPLOAD_FAIL", onUploadFail);
        Dispatch.subscribe("GUILD_MEMBER_ADD", onGuildMemberJoin);
        Dispatch.subscribe("GUILD_MEMBER_UPDATE", onGuildMemberUpdate);
    }

    pluginWillUnload () {
        Dispatch.unsubscribe("MESSAGE_CREATE", onMessage);
        Dispatch.unsubscribe("MESSAGE_REACTION_ADD", onReactionAdd);
        Dispatch.unsubscribe("UPLOAD_FAIL", onUploadFail);
        Dispatch.unsubscribe("GUILD_MEMBER_ADD", onGuildMemberJoin);
        Dispatch.unsubscribe("GUILD_MEMBER_UPDATE", onGuildMemberUpdate);
    }

};