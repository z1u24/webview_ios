_$define("earn/utils/logger", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * logger functions
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 1] = "INFO";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["FATAL"] = 4] = "FATAL";
})(LogLevel || (LogLevel = {}));
// TODO: make DEFAULT_LOGGER_LEVEL configurable
var DEFAULT_LOGGER_LEVEL = LogLevel.DEBUG;
// TODO: use format string

var Logger = function () {
    function Logger(moduleName) {
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_LOGGER_LEVEL;

        _classCallCheck(this, Logger);

        this.level = level;
        this.moduleName = moduleName;
    }

    _createClass(Logger, [{
        key: "info",
        value: function info() {
            if (this.level <= LogLevel.INFO) {
                var _console;

                for (var _len = arguments.length, message = Array(_len), _key = 0; _key < _len; _key++) {
                    message[_key] = arguments[_key];
                }

                (_console = console).log.apply(_console, ['[', new Date().toLocaleString(), ']', '[ INF ]', this.moduleName + ":"].concat(message));
            }
        }
    }, {
        key: "debug",
        value: function debug() {
            if (this.level <= LogLevel.DEBUG) {
                var _console2;

                for (var _len2 = arguments.length, message = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                    message[_key2] = arguments[_key2];
                }

                (_console2 = console).log.apply(_console2, ['[', new Date().toLocaleString(), ']', '[ DBG ]', this.moduleName + ":"].concat(message));
            }
        }
    }, {
        key: "warn",
        value: function warn() {
            if (this.level <= LogLevel.WARN) {
                var _console3;

                for (var _len3 = arguments.length, message = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    message[_key3] = arguments[_key3];
                }

                (_console3 = console).log.apply(_console3, ['[', new Date().toLocaleString(), ']', '[ WRN ]', this.moduleName + ":"].concat(message));
            }
        }
    }, {
        key: "error",
        value: function error() {
            if (this.level <= LogLevel.ERROR) {
                var _console4;

                for (var _len4 = arguments.length, message = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                    message[_key4] = arguments[_key4];
                }

                (_console4 = console).log.apply(_console4, ['[', new Date().toLocaleString(), ']', '[ ERR ]', this.moduleName + ":"].concat(message));
            }
        }
    }, {
        key: "fatal",
        value: function fatal() {
            if (this.level <= LogLevel.FATAL) {
                var _console5;

                for (var _len5 = arguments.length, message = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                    message[_key5] = arguments[_key5];
                }

                (_console5 = console).log.apply(_console5, ['[', new Date().toLocaleString(), ']', '[ FAT ]', this.moduleName + ":"].concat(message));
                throw new Error('FATAL error deteced');
            }
        }
    }]);

    return Logger;
}();

exports.Logger = Logger;
})