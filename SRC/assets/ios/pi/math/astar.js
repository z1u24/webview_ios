_$define("pi/math/astar", function (require, exports, module){
"use strict";
/**
 * 通用的A*搜索算法
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
// ============================== 导入
var heap_1 = require("../util/heap");
/**
 * A*寻路算法
 * @param paths 供内部填充，从start到end的最短路径
 * @param start 起点
 * @param end 终点
 * @param maxNodes 算法搜寻过程中产生的最大节点，超过该节点，算法终止，并返回到目前为止的最近路径
 * @return boolean 是否找到end节点
 */
exports.astar = function (paths, start, end) {
    var maxNodes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 4096;

    // Open表，存即将计算的节点，每次取f最小值的节点
    var open = cache.open;
    // 总表，存所有的ANode节点
    var all = cache.all;
    var s = cache.get(start);
    open.insert(s); // 将开始点扔到open表
    all.set(start, s);
    var nearest = s; // 距离目标的最近点
    var distanceToEnd = nearest.h = nearest.src.h(end); // 距离目标的最近距离
    while (!open.empty()) {
        var curr = open.pop(); // 取最小的f的节点出来
        // 已经找到目标点，退出循环
        if (curr.src === end) {
            break;
        }
        // 如果当前点离终点更近，则记住当前点
        var distance = curr.h;
        if (distance < distanceToEnd) {
            distanceToEnd = distance;
            nearest = curr;
        }
        // 如果已找的点太多，则退出循环
        if (all.size >= maxNodes) {
            break;
        }
        curr.isClose = true;
        // 遍历邻居
        for (var _iterator = curr.src, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var _n = _ref;

            var neighbor = _n;
            var anode = all.get(neighbor);
            if (!anode) {
                anode = cache.get(neighbor, curr.g + neighbor.g(curr.src), neighbor.h(end), curr);
            } else {
                // 如果是原来就有，查看当前路径是否比原来的好
                var g = curr.g + neighbor.g(curr.src);
                var h = neighbor.h(end);
                if (anode.f <= g + h) {
                    continue;
                }
                if (!anode.isClose) {
                    open.remove(anode);
                }
                anode = cache.get(neighbor, g, h, curr);
            }
            open.insert(anode);
            all.set(neighbor, anode);
        }
    }
    // 如果找不到终点，那么就从离终点最近的点开始
    var n = all.get(end) || nearest;
    paths.length = 0;
    for (; n !== undefined; n = n.parent) {
        paths.push(n.src);
    }
    paths.reverse();
    cache.collate();
    return end !== nearest.src;
};
// ============================== 本地
/**
 * 接口：A*算法的节点
 */

var ANode = function () {
    function ANode() {
        _classCallCheck(this, ANode);
    }

    _createClass(ANode, [{
        key: "set",

        /* tslint:disable:no-reserved-keywords typedef no-unnecessary-initializer*/
        value: function set(src) {
            var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

            this.g = g;
            this.h = h;
            this.f = g + h;
            this.isClose = false;
            this.src = src;
            this.parent = parent;
        }
    }]);

    return ANode;
}();
/**
 * Cache
 */


var cache = {
    unused: [],
    used: [],
    open: new heap_1.Heap(function (a, b) {
        return a.f - b.f;
    }),
    all: new Map(),
    get: function get(src) {
        var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

        var r = void 0;
        /* tslint:disable:no-invalid-this */
        if (this.unused.length === 0) {
            r = new ANode();
        } else {
            r = this.unused.pop();
        }
        r.set(src, g, h, parent);
        this.used.push(r);
        return r;
    },
    collate: function collate() {
        var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;

        this.open.clear();
        this.all.clear();
        if (this.unused.length < this.used.length) {
            this.unused = this.used;
            this.used = [];
        }
        if (this.unused.length > size) {
            this.unused.length = size;
        }
    }
};
})