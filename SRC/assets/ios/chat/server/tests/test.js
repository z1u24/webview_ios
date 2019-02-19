_$define("chat/server/tests/test", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var db_test_1 = require("./db_test");
var logger_test_1 = require("./logger_test");
var net_1 = require("../../utils/net");
exports.testAll = function () {
    db_test_1.test_db();
    logger_test_1.test_logger();
    net_1.setTopic("a/b/c");
};
})