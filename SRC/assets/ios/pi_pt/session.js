_$define("pi_pt/session", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var constant_1 = require("./constant");

var Session = function () {
    function Session(id) {
        _classCallCheck(this, Session);

        this.id = id;
        this.str_tab = id + "_str";
        this.num_tab = id + "_num";
    }
    //设置session


    _createClass(Session, [{
        key: "set",
        value: function set(tr, key, value) {
            if (this.id === undefined) {
                throw new Error("error: sessionid is not exist");
            }
            if (typeof value === "string") {
                db_1.modify(tr, [{ ware: constant_1.SESSION_WARE, tab: this.str_tab, key: key, value: value }], 1000, false);
            } else {
                db_1.modify(tr, [{ ware: constant_1.SESSION_WARE, tab: this.num_tab, key: key, value: value }], 1000, false);
            }
        }
        /**
         * 取session
         * @param tr 事务
         * @param key key
         * @param t 值类型 "string" | "number"
         */

    }, {
        key: "get",
        value: function get(tr, key, t) {
            try {
                if (t === "string") {
                    var r = db_1.query(tr, [{ ware: constant_1.SESSION_WARE, tab: this.str_tab, key: key }], 1000, false);
                    return r[0].value;
                } else if (t === "number") {
                    var _r = db_1.query(tr, [{ ware: constant_1.SESSION_WARE, tab: this.num_tab, key: key }], 1000, false);
                    return _r[0].value;
                } else {
                    var _r2 = db_1.query(tr, [{ ware: constant_1.SESSION_WARE, tab: this.str_tab, key: key }], 1000, false);
                    if (_r2[0].value === undefined || _r2[0].value === null) {
                        _r2 = db_1.query(tr, [{ ware: constant_1.SESSION_WARE, tab: this.num_tab, key: key }], 1000, false);
                    }
                    return _r2[0].value;
                }
            } catch (error) {
                console.log(error);
                return null;
            }
        }
    }, {
        key: "getId",
        value: function getId() {
            return this.id;
        }
    }]);

    return Session;
}();

exports.Session = Session;
})