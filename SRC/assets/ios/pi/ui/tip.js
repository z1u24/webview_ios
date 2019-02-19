_$define("pi/ui/tip", function (require, exports, module){
"use strict";
/*
 * 提示组件
 * 负责维护一棵提示组件树，提示及当前打开的提示组件都在这棵树上
 * 根据提示数据的设置，更新当前打开的提示组件，是否显示提示UI（如:红点）
 * 组件的更新通过监听setProps来完成
 * @example <app-ui-tip>{"tip_keys":["a.b.c","d.e.f"]}</app-ui-tip>
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../widget/widget");
// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */

var Tip = function (_widget_1$Widget) {
    _inherits(Tip, _widget_1$Widget);

    function Tip() {
        _classCallCheck(this, Tip);

        return _possibleConstructorReturn(this, (Tip.__proto__ || Object.getPrototypeOf(Tip)).apply(this, arguments));
    }

    _createClass(Tip, [{
        key: "setProps",

        /**
         * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
         * @example
         */
        value: function setProps(props, oldProps) {
            if (props && oldProps) {
                delWidget(this, oldProps.tip_keys);
            }
            props.show = addWidget(this, props.tip_keys);
            this.props = props;
        }
        /**
         * @description 销毁时调用，一般在渲染循环外调用
         * @example
         */

    }, {
        key: "destroy",
        value: function destroy() {
            if (!_get(Tip.prototype.__proto__ || Object.getPrototypeOf(Tip.prototype), "destroy", this).call(this)) {
                return;
            }
            delWidget(this, this.props.tip_keys);
        }
    }]);

    return Tip;
}(widget_1.Widget);

exports.Tip = Tip;
/**
 * @description 判断指定的键对应的提示数量
 * @param keys "a.b.c.d"
 * @example
 */
// tslint:disable:no-reserved-keywords
exports.get = function (key) {
    var e = exports.getEntry(tree, key);
    return e ? e.count : 0;
};
/**
 * @description 设置指定的键对应的提示是否有效
 * @param keys "a.b.c.d"
 */
exports.set = function (key, b) {
    if (!key) {
        return;
    }
    if (b) {
        var _e = setEntry(tree, key);
        if (_e.count > 0) {
            return;
        }
        while (_e) {
            _e.count++;
            if (_e.count === 1) {
                paint(_e.widgets, true);
            }
            _e = _e.parent;
        }
        return;
    }
    var e = exports.getEntry(tree, key);
    var has = false;
    while (e) {
        e.count--;
        if (e.count > 0) {
            break;
        }
        paint(e.widgets, false);
        if (!has) {
            if (e.widgets) {
                has = true;
            } else if (e.parent) {
                e.parent.children.delete(e.key);
            }
        }
        e = e.parent;
    }
};
// ============================== 本地
// 提示条目

var Entry = function Entry() {
    _classCallCheck(this, Entry);

    // 本条目及以子条目的提示数量
    this.count = 0;
    // 键
    this.key = '';
    // 键
    this.parent = null;
    // 子条目
    this.children = new Map();
    // 关心本条目的组件
    this.widgets = null;
};
/**
 * @description 提示树
 */


var tree = new Entry();
/**
 * @description 根据路径删除该组件的引用
 */
var delWidget = function delWidget(w, keys) {
    if (!keys) {
        return;
    }
    for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var key = _ref;

        var e = exports.getEntry(tree, key);
        if (!e) {
            continue;
        }
        var arr = e.widgets;
        if (!arr) {
            continue;
        }
        var i = arr.indexOf(w);
        if (i < 0) {
            continue;
        }
        var len = arr.length - 1;
        if (i < len) {
            arr[i] = arr[len];
        }
        if (len) {
            arr.length = len;
        } else {
            e.widgets = null;
        }
    }
};
/**
 * @description 添加组件，返回是否显示
 */
var addWidget = function addWidget(w, keys) {
    var show = false;
    for (var _iterator2 = keys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var key = _ref2;

        var e = setEntry(tree, key);
        var arr = e.widgets;
        if (!arr) {
            e.widgets = arr = [];
        }
        arr.push(w);
        show = show || e.count > 0;
    }
    return show;
};
/**
 * @description 根据提示数据刷新需要更新的组件
 */
var paint = function paint(widgets, show) {
    if (!widgets) {
        return;
    }
    for (var _iterator3 = widgets, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
        } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
        }

        var w = _ref3;

        var props = w.getProps();
        if (props.show !== show) {
            props.show = show;
            w.paint();
        }
    }
};
/**
 * @description 获得对象的值，键可以多层，用"."分隔
 * @example
 */
exports.getEntry = function (e, key) {
    var i = key.indexOf('.');
    var j = 0;
    while (i > j) {
        var k = key.slice(j, i);
        var v = e.children.get(k);
        if (!v) {
            return;
        }
        e = v;
        j = i + 1;
        i = key.indexOf('.', j);
    }
    if (j > 0) {
        key = key.slice(j);
    }
    return e.children.get(key);
};
/**
 * @description 设置提示树，返回最后的提示条目
 * @example
 */
var setEntry = function setEntry(e, key) {
    var i = key.indexOf('.');
    var j = 0;
    while (i > j) {
        var k = key.slice(j, i);
        var _v = e.children.get(k);
        if (!_v) {
            _v = new Entry();
            _v.key = k;
            _v.parent = e;
            e.children.set(k, _v);
        }
        e = _v;
        j = i + 1;
        i = key.indexOf('.', j);
    }
    if (j > 0) {
        key = key.slice(j);
    }
    var v = e.children.get(key);
    if (!v) {
        v = new Entry();
        v.key = key;
        v.parent = e;
        e.children.set(key, v);
    }
    return v;
};
// ============================== 立即执行
})