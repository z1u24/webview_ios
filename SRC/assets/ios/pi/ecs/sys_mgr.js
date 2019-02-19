_$define("pi/ecs/sys_mgr", function (require, exports, module){
"use strict";
/*
 * ecs的系统及系统管理器。
 * 系统监听组件的事件， 并负责对实体和组件进行操作。
 * 管理器负责维护系统运行管线(有项无环图)，包括系统的并发执行。现在的实现是顺序执行，换成其他有多线程的语言，可以并发执行。
 * 一个管理器内的系统模块不可重复。
 * cfg: {
 * 	"graph" : ["pi/ecs/system/init", ["async"], "pi/ecs/system/sync"],
 * 	"args" : {
 * 		"pi/ecs/system/init" : {
 * 			"viewGrid" : 20,
 * 			"blockGrid" : 1,
 * 			"width" : 10000,
 * 			"height" : 10000,
 * 			"depth" : 10000,
 * 			"seed" : 10000,
 * 			"runInterval": 50
 * 		},
 * 		pi/ecs/system/sync" : {
 * 		}
 * 	}
 * }
 */

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
// ============================== 导入
var mod_1 = require("../lang/mod");
var util_1 = require("../util/util");
// ============================== 导出
// 系统

var System = function () {
    function System() {
        _classCallCheck(this, System);
    }

    _createClass(System, [{
        key: "init",

        /**
         * 初始化
         */
        /* tslint:disable:no-empty */
        value: function init(w, cfg) {}
        /**
         * 运行
         */

    }, {
        key: "run",
        value: function run(context) {}
        /**
         * 销毁
         */

    }, {
        key: "destroy",
        value: function destroy() {}
    }]);

    return System;
}();

exports.System = System;
/**
 * 系统管理器
 * @example
 */

var SysMgr = function () {
    /**
     * 初始化
     */
    function SysMgr(w) {
        _classCallCheck(this, SysMgr);

        // 系统表
        /* tslint:disable:typedef */
        this.map = new Map();
        this.world = w;
    }
    /**
     * 根据配置初始化，可以多次调用
     */


    _createClass(SysMgr, [{
        key: "init",
        value: function init(cfg) {
            var g = new SystemGraph();
            var m = new Map();
            g.init(this.world, { graph: cfg.graph, args: cfg.args, map: m, mgr: this });
            this.map = m;
            this.graph.destroy();
            this.graph = g;
        }
        /**
         * 运行
         */

    }, {
        key: "run",
        value: function run(context) {
            this.graph && this.graph.run(context);
        }
    }]);

    return SysMgr;
}();

exports.SysMgr = SysMgr;
// ============================== 本地
// 可并发的系统图节点

var SystemGraph = function (_System) {
    _inherits(SystemGraph, _System);

    function SystemGraph() {
        _classCallCheck(this, SystemGraph);

        // 并发
        var _this = _possibleConstructorReturn(this, (SystemGraph.__proto__ || Object.getPrototypeOf(SystemGraph)).apply(this, arguments));

        _this.async = false;
        // 包含的系统
        _this.arr = [];
        return _this;
    }
    /**
     * 初始化
     */


    _createClass(SystemGraph, [{
        key: "init",
        value: function init(w, cfg) {
            this.mgr = cfg.mgr;
            var arr = cfg.graph;
            // 判断是否并发执行
            if (arr[0] === 'async') {
                this.async = true;
                arr = arr.slice(1);
            }
            for (var _iterator = arr, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var s = _ref;

                if (Array.isArray(s)) {
                    // 生成系统图节点，并放入数组
                    var _r = new SystemGraph();
                    _r.init(w, { graph: s, args: cfg.args, map: cfg.map, mgr: this.mgr });
                    this.arr.push(['', _r]);
                    continue;
                }
                var r = this.mgr.map.get(s);
                if (!r) {
                    var mod = mod_1.commonjs.relativeGet(s);
                    if (!mod) {
                        throw new Error("invalid mod: " + s);
                    }
                    var sys = util_1.getExport(mod, util_1.checkType, System);
                    if (!sys) {
                        throw new Error("invalid system in: " + s);
                    }
                    r = sys();
                    r.init(w, cfg.args[s]);
                    // 放入到管理器的新系统表
                    cfg.map.set(s, r);
                    this.arr.push([s, r]);
                }
            }
        }
        /**
         * 运行
         */

    }, {
        key: "run",
        value: function run(context) {
            for (var _iterator2 = this.arr, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var _ref3 = _ref2,
                    _ref4 = _slicedToArray(_ref3, 2),
                    k = _ref4[0],
                    s = _ref4[1];

                s.run(context);
            }
        }
        /**
         * 销毁
         */

    }, {
        key: "destroy",
        value: function destroy() {
            for (var _iterator3 = this.arr, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref5;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref5 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref5 = _i3.value;
                }

                var _ref6 = _ref5,
                    _ref7 = _slicedToArray(_ref6, 2),
                    k = _ref7[0],
                    s = _ref7[1];

                // 如果不在管理器的系统表，则移除
                if (!this.mgr.map.has(k)) {
                    s.destroy();
                }
            }
        }
    }]);

    return SystemGraph;
}(System);
})