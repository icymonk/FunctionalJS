exports.noop = _ => undefined
exports.I = x => x
exports.K = x => _ => x
exports.S = f => g => x => f(x)(g(x))
exports.W = f => x => f(x)(x)
