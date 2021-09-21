module.exports = {
    executor(main) {
        const { ezreply } = main
        if (main.subargs.length != 0 && (/\d{18}/g).exec(main.subargs[0])) {
            var hashPp = this.commands.pp.hashCode(main.subargs[0].match(/\d{18}/g)[0])
            if (hashPp < 0) {
                hashPp = -hashPp;
            }

            hashPp = "0." + JSON.stringify(hashPp).slice(4)
            ezreply(
                "<@!" + main.subargs[0].match(/\d{18}/g)[0] + ">'s pp is " + Math.floor(hashPp * 25) + "cm long"
            );
        } else {
            var hashPp = this.commands.pp.hashCode(main.message.author.id)
            if (hashPp < 0) {
                hashPp = -hashPp;
            }
            hashPp = "0." + JSON.stringify(hashPp).slice(4)
            ezreply(
                "your pp is " + Math.floor(hashPp * 25) + "cm long"
            );
        }

    },

    hashCode(s) {
        return s.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
    },

    "about": "Returns your (totally real) pp size.\nUsage: <prefix>pp <optional uid or mention>"
}
