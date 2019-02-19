_$define("earn/client/app/test/main", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var root_1 = require("../../../../pi/ui/root");
var util_1 = require("../../../../pi/widget/util");
exports.run = function (cb) {
    util_1.addWidget(document.body, 'pi-ui-root');
    root_1.popNew('earn-client-app-test-test');
    setTimeout(function () {
        if (cb) cb();
    }, 20);
};
})