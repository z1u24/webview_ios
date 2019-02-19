_$define("earn/editor/edit/main", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../../pi/widget/util");
var root_1 = require("../../../pi/ui/root");
/**
 *
 */
exports.run = function (cb) {
    util_1.addWidget(document.body, 'pi-ui-root');
    root_1.popNew('earn-editor-edit-test');
    setTimeout(function () {
        if (cb) cb();
    }, 20);
};
})