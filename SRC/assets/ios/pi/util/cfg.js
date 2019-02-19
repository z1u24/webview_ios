_$define("pi/util/cfg", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Cfg = function () {
    function Cfg() {
        _classCallCheck(this, Cfg);

        this.map = new Map();
    }

    _createClass(Cfg, [{
        key: "set",
        value: function set(key, value) {
            var _this = this;

            this.map.set(key, value);
            var notes = value.get(0).constructor._$info.notes;
            if (notes) {
                var primary = notes.get("primary");
                if (primary) {
                    (function () {
                        var primarys = primary.split("-");

                        var _loop = function _loop(i) {
                            var primaryMap = new Map();
                            value.forEach(function (v, k) {
                                primaryMap.set(v[primarys[i]], v);
                            });
                            _this.map.set(key + "#" + primarys[i], primaryMap);
                        };

                        for (var i = 0; i < primarys.length; i++) {
                            _loop(i);
                        }
                    })();
                }
            }
        }
    }, {
        key: "update",
        value: function update(key, value) {
            var _this2 = this;

            var m = this.map.get(key);
            if (!m) {
                this.set(key, value);
            } else {
                var size = m.size;
                value.forEach(function (v, _) {
                    m.set(size++, v);
                });
                if (value.size === 0) {
                    return;
                }
                var notes = value.get(0).constructor._$info.notes;
                if (notes) {
                    var primary = notes.get("primary");
                    if (primary) {
                        (function () {
                            var primarys = primary.split("-");

                            var _loop2 = function _loop2(i) {
                                var map = _this2.map.get(key + "#" + primarys[i]);
                                value.forEach(function (v, _) {
                                    map.set(v[primarys[i]], v);
                                });
                            };

                            for (var i = 0; i < primarys.length; i++) {
                                _loop2(i);
                            }
                        })();
                    }
                }
            }
        }
    }, {
        key: "get",
        value: function get(key) {
            return this.map.get(key);
        }
    }, {
        key: "getPrimary",
        value: function getPrimary(key, primary) {
            return this.map.get(key + "#" + primary);
        }
    }]);

    return Cfg;
}();

exports.Cfg = Cfg;
exports.cfgMgr = new Cfg();
})