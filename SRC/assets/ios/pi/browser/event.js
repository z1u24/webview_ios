_$define("pi/browser/event", function (require, exports, module){
"use strict";
/**
 * webview回调和派发
 */

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 调用底层函数
 */
exports.callNative = function (nativeName, funcName) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
    }

    var native = self[nativeName];
    if (native && native[funcName]) {
        return native[funcName].apply(native, args);
    } else {
        console.log("warning: Native " + nativeName + " isn't exist");
    }
};
/**
 * java层的回调
 * moduleName: string, 模块名
 * funcName: string, 函数名
 * jsonArray：string, 函数参数字符串
 */
window._$handleNativeMessage = function (moduleName, funcName, jsonArray) {
    // alert("_$handleNativeMessage: " + moduleName + ", " + funcName + ", " + jsonArray);
    var params = jsonArray ? JSON.parse(jsonArray) : [];
    /* tslint:disable:no-reserved-keywords */
    var module = self.pi_modules[moduleName];
    if (!module) {
        moduleName = "pi/" + moduleName;
        module = self.pi_modules[moduleName];
        if (!module) {
            console.log("warning: _$handleNativeMessage, module " + moduleName + " isn't exist!");
            return;
        }
    }
    var func = module.exports[funcName];
    if (!func) {
        console.log("warning: _$handleNativeMessage, exports function " + funcName + " in module " + moduleName + " isn't exist!");
        return;
    }
    func.apply(undefined, params);
};
})