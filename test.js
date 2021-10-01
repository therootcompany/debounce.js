"use strict";

var Debouncer = Debouncer || require("./debounce.js"); //require("@root/debounce");

async function doStuff() {
  await sleep(20);
}

let doStuffDebounced = Debouncer.create(doStuff, 30);

doStuffDebounced().then(mustFail).catch(mustFail); // rejected
doStuffDebounced().then(mustFail).catch(mustFail); // rejected
doStuffDebounced().catch(mustNotFail); // succeeds
setTimeout(function () {
  // rejected because doStuff is running
  doStuffDebounced().then(mustFail).catch(mustFail);
}, 40);
setTimeout(function () {
  // succeeds because doStuff has finished and there's nothing to cancel it
  doStuffDebounced().catch(mustNotFail);
}, 60);
setTimeout(function () {
  console.info("PASS");
}, 70);

function mustNotFail() {
  throw new Error("unexpected reject");
}

function mustFail(err) {
  if (!(err instanceof Error)) {
    throw new Error("unexpected resolve");
  }
}

// helper
async function sleep(delay) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delay);
  });
}
