var Debouncer;

(function () {
  "use strict";

  // should work with browser, node, ...and maybe even webpack?
  if ("undefined" !== typeof module) {
    Debouncer = module.exports;
  } else {
    Debouncer = {};
    window.Debouncer = Debouncer;
  }

  Debouncer.create = function _debounce(fn, delay) {
    let running = false;
    let timer = null;
    let promise = null;

    function rePromise() {
      // all three of these should be set synchronously
      promise = {};
      promise.promise = new Promise(function (resolve, reject) {
        promise.resolve = resolve;
        promise.reject = reject;
      });
      return promise;
    }

    rePromise();

    let err = new Error("debounce");
    return async function _debounce() {
      let args = Array.prototype.slice.call(arguments);
      if (running) {
        throw err;
      }

      let pInfo = promise;
      if (timer) {
        clearTimeout(timer);
        pInfo.reject(err);
        pInfo = rePromise();
      }

      timer = setTimeout(function () {
        running = true;
        timer = null;
        rePromise();

        fn.apply(null, args)
          .then(function (result) {
            running = false;
            pInfo.resolve(result);
          })
          .catch(function (err) {
            running = false;
            pInfo.reject(err);
          });
      }, delay);

      return pInfo.promise;
    };
  };
})();
