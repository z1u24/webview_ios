_$define("chat/server/rpc/foo.r", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var foo_s_1 = require("../rpc/foo.s");
//#[rpc]
exports.FooRpc = function (fooRpcReq) {
    var f = new foo_s_1.FooRpcResp();
    f.name = "fbj";
    f.age = 12;
    return f;
};
})