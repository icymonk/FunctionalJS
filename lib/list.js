const { getIterator } = require("./internal")

exports.push = value => arr => (arr.push(value), arr)

exports.mapLazy = func =>
  function*(obj) {
    const iter = getIterator(obj)
    for (const value of iter) yield func(value)
  }

exports.filterLazy = func =>
  function*(obj) {
    const iter = getIterator(obj)
    for (const value of iter) if (func(value)) yield value
  }

exports.flatLazy = function*(obj) {
  const iter = getIterator(obj)
  for (const value of iter) {
    if (isIterable(value)) yield* flat(value)
    else yield value
  }
}

exports.take = num => coll => {
  const result = []
  let i = 0
  const iter = getIterator(coll)
  for (const value of iter) {
    result.push(value)
    if (++i === num) break
  }
  return Promise.all(result)
}
