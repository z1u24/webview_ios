_$define("pi_pt/init/init.b", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hotfix_1 = require("../rust/pi_serv/hotfix");
var init_1 = require("./init");
//监听depend
hotfix_1.hotfixListen(hotfix_1.graymgrToArc(init_1.grayMgr), self._$root + "/.depend");
})