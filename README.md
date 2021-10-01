# [@root/debounce](https://github.com/therootcompany.com/debounce.js)

Debounce async functions and reject or resolve, as promised :)

# Usage

```js
let delay = 300; // ms

let doStuff = Debouncer.create(function (x) {
  console.log("Finally!", x);
}, 300);

doStuff("a"); // debounced
doStuff("b"); // debounced
doStuff("c"); // "Finally! c" (after 300ms)
```

# Features

- Rejects when
  - [x] the call is debounced (due to a subsequent call)
  - [x] your function has not yet resolved (it's still in progress)
  - [x] your function rejects (or throws)
- Resolves when
  - [x] the call is not debounced AND your function resolves

# Install

## Browser

```html
<script src="https://unpkg.com/@root/debounce"></script>
```

Or

```html
<script src="https://unpkg.com/@root/debounce@v1.0.1/debounce.min.js"></script>
```

```js
var Debouncer = window.Debouncer;
Debouncer.create(fn, ms);
```

## Node.js / WebPack

```bash
# node.js
npm install --save @root/debounce
```

```js
var Debouncer = require("@root/debounce");
Debouncer.create(fn, ms);
```

# Example

```js
async function doStuff() {
  console.log("Doing important things...");
  await sleep(100);
  console.log("Did important things!");
}

let doStuffDebounced = Debouncer.create(doStuff, 300);

doStuffDebounced(); // rejected
doStuffDebounced(); // rejected
doStuffDebounced(); // succeeds
setTimeout(function () {
  // rejected because doStuff is running
  doStuffDebounced();
}, 400);
setTimeout(function () {
  // succeeds because doStuff has finished and there's nothing to cancel it
  doStuffDebounced();
}, 600);
```

```js
// helper
async function sleep(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay);
  });
}
```
