_$define("pi_pt/init/update", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var depend_1 = require("../rust/pi_serv/depend");
var mgr_1 = require("../rust/pi_db/mgr");
var hotfix_1 = require("../rust/pi_serv/hotfix");
var db_1 = require("../db");
var constant_1 = require("../constant");
var entrance_s_1 = require("../entrance.s");
var env_1 = require("./env");
var cfg_1 = require("../../pi/util/cfg");
var db_2 = require("../db");
var Change;
(function (Change) {
    Change[Change["Create"] = 0] = "Create";
    Change[Change["Modify"] = 1] = "Modify";
    Change[Change["Remove"] = 2] = "Remove";
    Change[Change["Keep"] = 3] = "Keep";
    Change[Change["NoteChange"] = 4] = "NoteChange";
})(Change = exports.Change || (exports.Change = {}));

var UpdateEnv = function (_env_1$Env) {
    _inherits(UpdateEnv, _env_1$Env);

    function UpdateEnv(dbMgr, depend, oldMgr, grayMgr, diff, nobjs) {
        _classCallCheck(this, UpdateEnv);

        var _this = _possibleConstructorReturn(this, (UpdateEnv.__proto__ || Object.getPrototypeOf(UpdateEnv)).call(this, dbMgr, depend, nobjs));

        _this.oldMgr = oldMgr;
        _this.grayMgr = grayMgr;
        _this.diff = diff;
        return _this;
    }

    _createClass(UpdateEnv, [{
        key: "getOldMgr",
        value: function getOldMgr() {
            return this.oldMgr;
        }
    }, {
        key: "getGrayMgr",
        value: function getGrayMgr() {
            return this.grayMgr;
        }
    }, {
        key: "getDiff",
        value: function getDiff() {
            return this.diff;
        }
    }, {
        key: "getRDiff",
        value: function getRDiff() {
            if (this.rDiff) {
                return this.rDiff;
            }
            var rdiff = new Map();
            this.diff.forEach(function (v, k) {
                //console.log("rDiff--------------------------------", k)
                if (k.endsWith(".r.js")) {
                    rdiff.set(k, v);
                }
            });
            this.rDiff = rdiff;
            return rdiff;
        }
    }]);

    return UpdateEnv;
}(env_1.Env);

exports.UpdateEnv = UpdateEnv;
var env = new UpdateEnv(new mgr_1.Mgr(self._$new_mgr), new depend_1.Depend(self._$depend), new mgr_1.Mgr(self._$old_mgr), new hotfix_1.GrayMgr(self._$gray_mgr), self._$diff, self._$nobjs);
delete self._$depend;
delete self._$new_mgr;
delete self._$old_mgr;
delete self._$gray_mgr;
delete self._$diff;
exports.getEnv = function () {
    return env;
};
exports.readEntryCfg = function (mgr, note) {
    var map = new Map();
    db_1.read(mgr, function (tr) {
        var iter = db_1.iterDb(tr, constant_1.DEFAULT_WARE, entrance_s_1.Entrance._$info.name, null, false, null);
        var n = iter.nextElem();
        while (n) {
            var r = n[1];
            if (r && r.note.has(note)) {
                map.set(r.path, r);
            }
            n = iter.nextElem();
        }
    });
    return map;
};
exports.compareEntryCfg = function (newMap, oldMap) {
    var map = new Map();
    oldMap.forEach(function (v, k) {
        var arr = k.split(".");
        var m = map.get(arr[0]);
        if (!m) {
            m = new Map();
            map.set(arr[0], m);
        }
        var n = newMap.get(k);
        if (!n) {
            m.set(arr[1], { t: Change.Remove, old: v, new: null });
        }
        m.set(arr[1], { t: Change.Keep, old: v, new: n });
        oldMap.delete(k);
    });
    newMap.forEach(function (v, k) {
        var arr = k.split(".");
        var m = map.get(arr[0]);
        if (!m) {
            m = new Map();
            map.set(arr[0], m);
        }
        m.set(arr[1], { t: Change.Create, old: null, new: v });
    });
    return map;
};
var writeCfg = function writeCfg(dbMgr) {
    var items = [];
    cfg_1.cfgMgr.map.forEach(function (tab, k) {
        if (k.indexOf("#") < 0) {
            //如果不是一个主键表， 但类型中存在主键，则不处理该数据
            var first = tab.get(0);
            if (!first) {
                return; //没有数据直接返回
            }
            var primary = void 0;
            first._$getSinfo().notes && (primary = first._$getSinfo().notes.get("primary"));
            if (primary) {
                return;
            }
        }
        tab.forEach(function (value, key) {
            var ware = void 0;
            value._$getSinfo().notes && (ware = value._$getSinfo().notes.get("db") || constant_1.DEFAULT_WARE);
            if (!ware) {
                throw "cfg type: " + value._$getSinfo().name + " not note 'db'"; //如果配置没有db注解， 将抛出异常
            }
            items.push({ ware: ware, tab: value._$getSinfo().name, key: key, value: value });
        });
    });
    if (items.length > 0) {
        db_2.write(dbMgr, function (tr) {
            db_2.modify(tr, items, 1000, false);
        });
    }
};
writeCfg(env.getDbMgr());
})