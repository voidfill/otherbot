const { sendContent } = require("../utils/functions/sendmessages")

const { getModule } = require("powercord/webpack");
const { Permissions } = getModule(["API_HOST"], false);
const { can } = getModule(["getChannelPermissions"], false);
const { getChannel } = getModule(["getChannel", "getDMFromUserId"], false);

module.exports = async ({channelId, emoji, messageId, userId}) => {
    const channel = getChannel(channelId)
    if (emoji.id == "805011292557279288" && can(Permissions.SEND_MESSAGES, channel)) {
        sendContent(channel, "cock and ball torture", messageId)
    }
}