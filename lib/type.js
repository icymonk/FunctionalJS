const isFunction = value => typeof value === "function"
exports.isFunction = isFunction

const isThenable = obj => obj != null && isFunction(obj.then)
exports.isThenable = isThenable

exports.isIterable = iterable =>
  iterable != null &&
  (isFunction(iterable[Symbol.iterator]) ||
    isFunction(iterable[Symbol.asyncIterator]))

exports.testFunction = ctor => ctor === Function
exports.testPromise = ctor => ctor != null && ctor === Promise

exports.defaultTest = (ctor, value) =>
  value != null &&
  (value.constructor === ctor || (value != null && value instanceof ctor))

exports.is = ctor => value =>
  testFunction(ctor)
    ? isFunction(value)
    : testPromise(ctor)
    ? isThenable(value)
    : defaultTest(ctor, value)
