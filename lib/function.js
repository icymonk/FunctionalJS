const { isThenable } = require("./type")

exports.tap = func => value => {
  const result = func(value)
  return isThenable(result) ? result.then(() => value) : value
}
