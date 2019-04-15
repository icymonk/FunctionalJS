exports.delay = milliseconds => value =>
  new Promise(resolve => setTimeout(() => resolve(value), milliseconds))
