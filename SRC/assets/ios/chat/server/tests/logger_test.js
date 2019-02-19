_$define("chat/server/tests/logger_test", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("../../utils/logger");
exports.test_logger = function () {
    var logger = new logger_1.Logger("LOGGER_TEST", 0);
    logger.debug("logger test debug");
    logger.info("logger test info");
    logger.error("logger test error");
    logger.warn("logger test warn");
    logger.fatal("logger test fatal");
};
})