const { isIterable, isFunction, isThenable } = require("./type")

exports.maybeExec = maybeFunc => value =>
  isFunction(maybeFunc) ? maybeFunc(value) : maybeFunc

exports.getIterator = obj =>
  (isIterable(obj) ? obj : Object.values(obj))[Symbol.iterator]()

exports.call = func => value =>
  isThenable(value) ? value.then(func) : func(value)
