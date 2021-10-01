# debounce.js

Debounce async functions and reject or resolve, as promised :)

# Usage

```js
// Usage
Debouncer.create(fn, delay);
```

# Features

- Rejects when
  - [x] the call is debounced (due to a subsequent call)
  - [x] your function has not yet resolved (it's still in progress)
  - [x] your function rejects (or throws)
- Resolves when
  - [x] the call is not debounced AND your function resolves

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
