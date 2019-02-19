_$define("pi/spine/polyfills", function (require, exports, module){
"use strict";

(function () {
    if (!Math.fround) {
        Math.fround = function (array) {
            return function (x) {
                return array[0] = x, array[0];
            };
        }(new Float32Array(1));
    }
})();
})