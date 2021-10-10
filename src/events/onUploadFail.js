const { sendContent } = require("../utils/functions/sendmessages")

module.exports = async ({channelId, file}) => {
    sendContent(channelId, "Fileupload failed :|\nFile: " + file.name)
}