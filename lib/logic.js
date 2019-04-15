const { I } = require("./combinators")
const { maybeExec } = require("./internal")
const { isFunction, isThenable } = require("./type")

exports.allPass = predicates => value => {
  for (const predicate of predicates) {
    if (!predicate(value)) {
      return false
    }
  }

  return true
}

exports.anyPass = predicates => value => {
  for (const predicate of predicates) {
    if (predicate(value)) {
      return true
    }
  }

  return false
}

exports.isPass = (test, value) =>
  isFunction(test) ? test(value) : test === value

exports.cond = pairs => value => {
  for (const pair of pairs) {
    const [predicate, transformer] = pair

    if (isPass(predicate, value)) {
      return maybeExec(transformer)(value)
    }
  }

  return null
}

exports.ifElse = condition => onTrue => onFalse => value =>
  (condition(value) ? onTrue : onFalse)(value)

exports.ifError = func => onError => onSuccess => value => {
  try {
    const result = func(value)
    return isThenable(result)
      ? result.then(onSuccess).catch(onError)
      : onSuccess(result)
  } catch (err) {
    return onError(err)
  }
}

exports.unless = condition => ifElse(condition)(I)
exports.when = condition => func => ifElse(condition)(func)(I)
