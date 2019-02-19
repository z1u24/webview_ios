_$define("chat/pressure/robot_init", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var autologin_1 = require("../client/app/logic/autologin");
var robot_1 = require("./robot");
/**
 *
 */
exports.init = function () {
    setTimeout(function () {
        robot_1.start(autologin_1.UserType.WALLET, getUri('openid'), getUri('sign'));
    }, 1000);
};
var getUri = function getUri(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return '';
};
})