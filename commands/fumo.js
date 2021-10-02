const fumo = require("fumo-api")

module.exports = {
    executor(main) {
        const { ezreply } = main
        fumo.randomFumo().then((res)=> ezreply(res))
    },

    "about": "537 Fumos.\nUsage: <prefix>fumo"
}
