# FunctionalJS

## dependencies

- Node.js (>= 10.15.3)

## Install

```sh
npm i @icymonk/fnjs
```

## Examples

```js
console.time("test")

const dependencies = require("@icymonk/fnjs")
const { run } = dependencies
const state = 30
const main = ({ I, pipe, mapLazy, take, delay, log }) =>
  pipe([
    log, // 30
    [1, 2, 3, 4],
    mapLazy(v => Promise.resolve(v * 3)),
    mapLazy(delay(1000)),
    take(3),
    log, // [3, 6, 9]
    [delay(1000)(1), delay(2000)(5), delay(1000)(3)],
    take(10),
    log, // [1, 5, 3]
    Promise.resolve(10),
    log, // 10
    { a: 3, b: 5 },
    mapLazy(I),
    take(Infinity),
    log, // [3, 5]
  ])

run({ dependencies, state, main }).then(_ => {
  console.timeEnd("test") // test: 2000 + a (ms)
})
```

## Resorces

- <https://github.com/marpple/FxJS>
- <https://github.com/joelnet/MojiScript>
