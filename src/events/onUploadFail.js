const { getModule } = require("powercord/webpack")

const { sendContent } = require("../utils/functions/sendmessages")
const { getChannel } = getModule(["getChannel", "getDMFromUserId"], false);

module.exports = async ({channelId, file}) => {
    sendContent(getChannel(channelId), "Fileupload failed :|\nFile: " + file.name)
}