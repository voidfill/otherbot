const { getModule } = require("powercord/webpack")

module.exports = {
    executor(main) {
        const { ezreply } = main
                if (!this.allowedUsersTop.has(main.message.author.id)) {
            ezreply(
                "You dont have permissions to do this."
            )
            return
        }
        if(main.subargs.length == 0) {
            ezreply(
                "Wtf should i set it to then."
            )
            return
        }
        getModule(["SET_ACTIVITY"]).then(mdl => {
            mdl.SET_ACTIVITY.handler({
                socket: {
                    transport: "ipc",
                    id: "1",
                    version: 1,
                    encoding: "json",
                    application: {
                        id: "889956727263486012",
                        name: main.contentNoCmd,
                        icon: null,
                        coverImage: null,
                        flags: 60,
                        timestamps: { start: -1 }
                    }
                },
                cmd: "SET_ACTIVITY",
                args: {
                    pid: 23442,
                    activity: {
                        timestamps: { start: 1 },
                        name: "yes",
                        application_id: "889956727263486012"
                    }
                }
            });
        })
        ezreply(
            "Set activity to " + main.contentNoCmd
        )
    },

    "about": "Sets an activity for the bot.\nUsage: <prefix>setactivity <activityname>"
}
