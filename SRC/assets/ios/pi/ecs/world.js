_$define("pi/ecs/world", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util/util");
var hash_1 = require("../util/hash");
var struct_mgr_1 = require("../struct/struct_mgr");
/**
 * 组件, 组件只能有一个父组件
 * @example
 */

var Component = function (_struct_mgr_1$MStruct) {
    _inherits(Component, _struct_mgr_1$MStruct);

    function Component() {
        _classCallCheck(this, Component);

        return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
    }

    _createClass(Component, [{
        key: "removeMeta",
        value: function removeMeta() {
            _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), "removeMeta", this).call(this);
            parent = null;
        }
    }]);

    return Component;
}(struct_mgr_1.MStruct);

exports.Component = Component;
/**
 * 实体
 * @example
 */

var Entity = function (_struct_mgr_1$MStruct2) {
    _inherits(Entity, _struct_mgr_1$MStruct2);

    function Entity() {
        _classCallCheck(this, Entity);

        var _this2 = _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).apply(this, arguments));

        _this2.children = new Map(); //子实体
        _this2.comp = new Map(); // 组件表
        return _this2;
    }
    /**
     * 添加子实体，并调用监听器（创建、修改、删除，可以定义域监听）
     * @param e:子实体， mgr:管理器
     */


    _createClass(Entity, [{
        key: "addChild",
        value: function addChild(e) {
            if (!e) return;
            if (e.parent) throw new Error("entity has already parent");
            e.parent = this;
            this.children.set(e._$index, e);
        }
        /**
         * 移除子实体
         */

    }, {
        key: "removeChild",
        value: function removeChild(index) {
            var ee = this.children.get(index);
            if (!ee) throw new Error("entity is not exist!,index:" + index);
            this.children.delete(index);
            struct_mgr_1.removeFromMeta(ee);
            ee.children.forEach(function (v) {
                ee.removeChild(v._$index); //递归删除子实体
            });
        }
        /**
         * 添加子组件，相同的子组件类型会替换，并调用监听器（创建、修改、删除，可以定义域监听）
         */

    }, {
        key: "addComp",
        value: function addComp(c) {
            if (c && c.parent) throw new Error("component has already parent");
            var old = this.comp.get(c.constructor);
            if (old) {
                struct_mgr_1.removeFromMeta(old);
                old.parent = null;
            }
            this.comp.set(c.constructor, c);
            c.parent = this;
            //c.fieldKey = ""; // 特殊处理
            struct_mgr_1.addToMeta(this._$meta.mgr, c);
            return old;
        }
        /**
         * 移除子组件，参数为子组件的类， 并调用监听器（创建、修改、删除，可以定义域监听）
         */

    }, {
        key: "removeComp",
        value: function removeComp(compClass) {
            var old = this.comp.get(compClass);
            if (!old) throw new Error("component is not exist");
            old.removeMeta();
            return old;
        }
        /**
         * 获取组件
         */

    }, {
        key: "getComp",
        value: function getComp(compClass) {
            return this.comp.get(compClass);
        }
    }]);

    return Entity;
}(struct_mgr_1.MStruct);

exports.Entity = Entity;
/**
 * 实体索引
 * @example
 */

var EntityIndex = function EntityIndex(keys) {
    _classCallCheck(this, EntityIndex);

    // 实体索引
    this.map = new Map();
    // 包含的组件类
    this.keys = new Set();
    this.keys = new Set(keys);
};

exports.EntityIndex = EntityIndex;
/**
 * 组件索引
 * @example
 */

var ComponentIndex = function ComponentIndex(key, parentKey) {
    _classCallCheck(this, ComponentIndex);

    // 组件索引
    this.map = new Map();
    this.key = key;
    this.parentKey = parentKey;
};

exports.ComponentIndex = ComponentIndex;
/**
 * 单例组件索引
 * @example
 */

var SingleIndex = function SingleIndex(key) {
    _classCallCheck(this, SingleIndex);

    this.key = key;
};

exports.SingleIndex = SingleIndex;
/**
 * 创建世界
 * @example
 */

var World = function (_struct_mgr_1$StructM) {
    _inherits(World, _struct_mgr_1$StructM);

    /**
     * 构造方法
     */
    function World() {
        _classCallCheck(this, World);

        var _this3 = _possibleConstructorReturn(this, (World.__proto__ || Object.getPrototypeOf(World)).call(this));

        _get(World.prototype.__proto__ || Object.getPrototypeOf(World.prototype), "register", _this3).call(_this3, hash_1.strHashCode(module.id + "Entity", 0), Entity, module.id + "Entity");
        return _this3;
    }
    /**
     * 添加实体索引
     */


    _createClass(World, [{
        key: "addEntityIndex",
        value: function addEntityIndex(i) {
            i.addListener = function (c) {
                var p = c.parent;
                for (var _iterator = i.keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var k = _ref;

                    if (!p.getComp(k)) return;
                }
                i.map.set(p._$index, p);
            };
            i.removeListener = function (c) {
                var p = c.parent;
                i.map.delete(p._$index);
            };
            for (var _iterator2 = i.keys, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var c = _ref2;

                this.addAddListener(c, i.addListener, Entity);
                this.addRemoveListener(c, i.removeListener, Entity);
            }
        }
        /**
         * 移除实体索引
         */

    }, {
        key: "removeEntityIndex",
        value: function removeEntityIndex(i) {
            for (var _iterator3 = i.keys, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }

                var c = _ref3;

                this.removeAddListener(c, i.addListener, Entity);
                this.removeRemoveListener(c, i.removeListener, Entity);
            }
        }
        /**
         * 添加组件索引
         */

    }, {
        key: "addComponentIndex",
        value: function addComponentIndex(i) {
            i.addListener = function (c) {
                i.map.set(c._$index, c);
            };
            i.removeListener = function (c) {
                i.map.delete(c._$index);
            };
            this.addAddListener(i.key, i.addListener, i.parentKey);
            this.addRemoveListener(i.key, i.removeListener, i.parentKey);
        }
        /**
         * 移除组件索引
         */

    }, {
        key: "removeComponentIndex",
        value: function removeComponentIndex(i) {
            this.removeAddListener(i.key, i.addListener, i.parentKey);
            this.removeRemoveListener(i.key, i.removeListener, i.parentKey);
        }
        /**
         * 添加单例组件索引
         */

    }, {
        key: "addSingleIndex",
        value: function addSingleIndex(i) {
            i.addListener = function (c) {
                i.comp = c;
            };
            i.removeListener = function (c) {
                i.comp = null;
            };
            this.addAddListener(i.key, i.addListener);
            this.addRemoveListener(i.key, i.removeListener);
        }
        /**
         * 移除单例组件索引
         */

    }, {
        key: "removeSingleIndex",
        value: function removeSingleIndex(i) {
            this.removeAddListener(i.key, i.addListener);
            this.removeRemoveListener(i.key, i.removeListener);
        }
        /**
         * 添加组件添加监听器
         */

    }, {
        key: "addAddListener",
        value: function addAddListener(compClass, listener, parentCompClass) {
            var meta = getMeta(this, compClass);
            if (parentCompClass) {
                meta.addFilter = util_1.arrInsert(meta.addFilter, new ListenerCfg(listener, getMeta(this, parentCompClass)));
            } else meta.addAddListener(listener);
        }
        /**
         * 移除组件添加监听器
         */

    }, {
        key: "removeAddListener",
        value: function removeAddListener(compClass, listener, parentCompClass) {
            var meta = getMeta(this, compClass);
            if (parentCompClass) {
                meta.addFilter = util_1.arrDelete(meta.addFilter, getListenerIndex(meta.addFilter, listener));
            } else meta.removeAddListener(listener);
        }
        /**
         * 注册组件修改监听器
         */

    }, {
        key: "addModifyListener",
        value: function addModifyListener(compClass, listener, parentCompClass) {
            var meta = getMeta(this, compClass);
            if (parentCompClass) {
                var p = this.constructMap.get(parentCompClass);
                if (!p) throw new Error("unregister component, name:" + parentCompClass.name);
                meta.modifyFilter = util_1.arrInsert(meta.modifyFilter, new ListenerCfg(listener, getMeta(this, parentCompClass)));
            } else meta.modify = util_1.arrInsert(meta.modify, listener);
        }
        /**
         * 移除组件添加监听器
         */

    }, {
        key: "removeModifyListener",
        value: function removeModifyListener(compClass, listener, parentCompClass) {
            var meta = getMeta(this, compClass);
            if (parentCompClass) {
                meta.modifyFilter = util_1.arrDelete(meta.modifyFilter, getListenerIndex(meta.modifyFilter, listener));
            } else meta.removeModifyListener(listener);
        }
        /**
         * 注册组件移除监听器
         */

    }, {
        key: "addRemoveListener",
        value: function addRemoveListener(compClass, listener, parentCompClass) {
            var meta = getMeta(this, compClass);
            if (parentCompClass) {
                meta.removeFilter = util_1.arrInsert(meta.removeFilter, new ListenerCfg(listener, getMeta(this, parentCompClass)));
            } else meta.remove = util_1.arrInsert(meta.remove, listener);
        }
        /**
         * 移除组件添加监听器
         */

    }, {
        key: "removeRemoveListener",
        value: function removeRemoveListener(compClass, listener, parentCompClass) {
            var meta = getMeta(this, compClass);
            if (parentCompClass) {
                meta.removeFilter = util_1.arrDelete(meta.removeFilter, getListenerIndex(meta.removeFilter, listener));
            } else meta.removeRemoveListener(listener);
        }
        /**
         * 创建实体
         */

    }, {
        key: "create",
        value: function create() {
            var e = new Entity();
            struct_mgr_1.addToMeta(this, e);
            return e;
        }
    }]);

    return World;
}(struct_mgr_1.StructMgr);

exports.World = World;
// ============================== 本地
// 监听器配置信息

var ListenerCfg = function ListenerCfg(listener, p) {
    _classCallCheck(this, ListenerCfg);

    this.parentCompMeta = p;
    this.listener = Function;
};
// 组件元信息


var CompMeta = function (_struct_mgr_1$MStruct3) {
    _inherits(CompMeta, _struct_mgr_1$MStruct3);

    function CompMeta() {
        _classCallCheck(this, CompMeta);

        var _this4 = _possibleConstructorReturn(this, (CompMeta.__proto__ || Object.getPrototypeOf(CompMeta)).apply(this, arguments));

        _this4.addFilter = []; // 插入监听器，需要过滤键和父组件
        _this4.modifyFilter = []; // 修改监听器，需要过滤键和父组件
        _this4.removeFilter = []; // 删除监听器，需要过滤键和父组件
        return _this4;
    }

    _createClass(CompMeta, [{
        key: "addNotify",
        value: function addNotify(c) {
            _get(CompMeta.prototype.__proto__ || Object.getPrototypeOf(CompMeta.prototype), "addNotify", this).call(this, c);
            notify(this.addFilter, c);
        }
    }, {
        key: "removeNotify",
        value: function removeNotify(c) {
            _get(CompMeta.prototype.__proto__ || Object.getPrototypeOf(CompMeta.prototype), "removeNotify", this).call(this, c);
            notify(this.removeFilter, c);
        }
    }, {
        key: "modifyNotify",
        value: function modifyNotify(c, fieldKey, value, old, fieldKeyIndex) {
            var arr = this.modify,
                arrFilter = this.modifyFilter;
            for (var _iterator4 = arr, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                var _ref4;

                if (_isArray4) {
                    if (_i4 >= _iterator4.length) break;
                    _ref4 = _iterator4[_i4++];
                } else {
                    _i4 = _iterator4.next();
                    if (_i4.done) break;
                    _ref4 = _i4.value;
                }

                var l = _ref4;

                l(c, fieldKey, value, old, fieldKeyIndex);
            }for (var _iterator5 = arrFilter, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                var _ref5;

                if (_isArray5) {
                    if (_i5 >= _iterator5.length) break;
                    _ref5 = _iterator5[_i5++];
                } else {
                    _i5 = _iterator5.next();
                    if (_i5.done) break;
                    _ref5 = _i5.value;
                }

                var _l = _ref5;

                c.parent._$meta === _l.parentCompMeta && _l.listener(c, fieldKey, value, old, fieldKeyIndex);
            }
        }
    }]);

    return CompMeta;
}(struct_mgr_1.MStructMeta);
/**
 * 获取组件元信息
 */


var getMeta = function getMeta(w, compClass) {
    var meta = w.constructMap.get(compClass);
    if (!meta) throw new Error("unregister component, name:" + compClass.name);
    return meta;
};
/**
 * 获取监听器的位置
 */
var getListenerIndex = function getListenerIndex(arr, listener) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i].listener !== listener) return i;
    }
    return -1;
};
// 通知监听器
var notify = function notify(arrFilter, c) {
    for (var _iterator6 = arrFilter, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
        var _ref6;

        if (_isArray6) {
            if (_i6 >= _iterator6.length) break;
            _ref6 = _iterator6[_i6++];
        } else {
            _i6 = _iterator6.next();
            if (_i6.done) break;
            _ref6 = _i6.value;
        }

        var l = _ref6;

        c.parent._$meta === l.parentCompMeta && l.listener(c);
    }
};
})