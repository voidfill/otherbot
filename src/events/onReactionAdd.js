const { sendContent } = require("../utils/functions/sendmessages")

const { getModule } = require("powercord/webpack");
const { getChannel } = getModule(["getChannel"], false)
const { Permissions } = getModule(["Permissions"], false);
const { can } = getModule(["getChannelPermissions"], false);

module.exports = async ({channelId, emoji, messageId, userId}) => {
    if (emoji.id == "805011292557279288" && can(Permissions.SEND_MESSAGES, getChannel(channelId))) {
        sendContent(channelId, "cock and ball torture", messageId)
    }
}