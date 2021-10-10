const { getModule } = require("powercord/webpack");
const { fromTimestamp } = getModule(["fromTimestamp"], false);
const { getChannel } = getModule(["getChannel"], false);

module.exports = class Message {
    constructor(channelId, content = "", embed = false, message_id = false, tts = false, allowed_mentions = false) {
        this.channelId = channelId;
        this.content = content;
        this.tts = tts;

        if (embed) {
            this.embed = embed
        };

        if (allowed_mentions) {
            this.allowed_mentions = allowed_mentions;
        } else {
            this.allowed_mentions = {
                "parse": [],
                "replied_user": false
            }
        };

        if (message_id) {
            this.message_reference = {
                "message_id": message_id,
                "channel_id": channelId,
                "guild_id": getChannel(channelId).guild_id,
                "fail_if_not_exists": false
            }
        };

        this.nonce = fromTimestamp(Date.now());
    }
}