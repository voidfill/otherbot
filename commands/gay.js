module.exports = {
    executor(main) {
        const { ezreply } = main
        console.log(main)
        if (main.contentNoCmd != "" && (/\d{18}/g).exec(main.subargs[0])) {
            var hashGay = this.commands.pp.hashCode(main.subargs[0].match(/\d{18}/g)[0])
            if (hashGay < 0) {
                hashGay = -hashGay;
            }

            hashGay = "0." + JSON.stringify(hashGay).slice(5)
            ezreply(
                "<@!" + main.subargs[0].match(/\d{18}/g)[0] + "> is " + Math.floor(hashGay * 100) + "% gay"
            );
        } else {
            var hashGay = this.commands.pp.hashCode(main.message.author.id)
            if (hashGay < 0) {
                hashGay = -hashGay;
            }
            hashGay = "0." + JSON.stringify(hashGay).slice(5)
            ezreply(
                "You are " + Math.floor(hashGay * 100) + "% gay."
            );
        }

    },

    "about": "Returns your gay percentage \nUsage: <prefix>gay <optional uid or mention>"
}
