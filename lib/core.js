const { error } = require("./console")
const { maybeExec } = require("./internal")

exports.run = ({ dependencies, state, main }) =>
  dependencies != null
    ? this.run({ state, main: main(dependencies) })
    : main(state).catch((dependencies || {}).error || error)

exports.pipe = funcs => value =>
  funcs.reduce((acc, func) => acc.then(maybeExec(func)), Promise.resolve(value))
