module.exports = class Activity {
    constructor({ name = "hello", timestamps = { start: 1 } }, buttons = null, icon = null, coverImage = null, id = "889956727263486012") {
        this.socket = {
            transport: "ipc",
            id: "1",
            version: 1,
            encoding: "json",
            application: {
                id: id,
                name: name,
                icon: icon,
                coverImage: coverImage,
                flags: 60,
                timestamps: timestamps
            }
        };
        this.cmd = "SET_ACTIVITY";
        this.args = {
            pid: 23442,
            activity: {
                timestamps: timestamps,
                name: "yes",
                application_id: id,
                buttons: buttons
            }
        }
    }
}