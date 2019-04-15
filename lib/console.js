const { tap } = require("./function")

exports.log = tap(x => console.log(x))
exports.error = tap(x => console.error(x))
exports.logF = func => tap(x => console.log(func(x)))
