_$define("pi_pt/init/env", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Env = function () {
    function Env(dbMgr, depend, nobjs) {
        _classCallCheck(this, Env);

        this.dbMgr = dbMgr;
        this.depend = depend;
        if (nobjs) {
            this.nobjs = nobjs;
        } else {
            this.nobjs = new Map();
        }
    }

    _createClass(Env, [{
        key: "getNativeObject",
        value: function getNativeObject(name) {
            var r = this.nobjs.get(name);
            if (!r) {
                return;
            }
            if (r[0]) {
                if (r[1]) {
                    return r[1](r[0]);
                } else {
                    return r[0];
                }
            }
            return r;
        }
    }, {
        key: "setNativeObject",
        value: function setNativeObject(name, nobj) {
            if (this.nobjs.get(name)) {
                throw new Error("NativeObject is exist! name:" + name);
            }
            this.nobjs.set(name, nobj);
        }
    }, {
        key: "getDbMgr",
        value: function getDbMgr() {
            return this.dbMgr;
        }
    }, {
        key: "getDepend",
        value: function getDepend() {
            return this.depend;
        }
    }]);

    return Env;
}();

exports.Env = Env;
})