_$define("pi/ecs/navmesh", function (require, exports, module){
"use strict";
/**
 * 基于导航网格的寻路模块
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var aabb_1 = require("../math/aabb");
var astar_1 = require("../math/astar");
var vector3_1 = require("../math/vector3");
var Hash = require("../util/hash");
/**
 * 多边形信息
 */

var Polygon = function () {
    function Polygon(navMesh, indexs, adj, cost, index) {
        _classCallCheck(this, Polygon);

        this.indexs = indexs;
        this.adjacency = adj;
        this.navMesh = navMesh;
        this.cost = cost;
        this.index = index;
        this.computeCenter();
        this.computeBox();
    }
    // 多边形是否包含点


    _createClass(Polygon, [{
        key: "containsPoint",
        value: function containsPoint(point) {
            var vec1 = new vector3_1.Vector3().subVectors(this.navMesh.vertexs[this.indexs[this.indexs.length - 1]], point);
            var vec2 = new vector3_1.Vector3().subVectors(this.navMesh.vertexs[this.indexs[0]], point);
            var ret1 = new vector3_1.Vector3().crossVectors(vec1, vec2);
            var vec3 = new vector3_1.Vector3();
            var ret2 = new vector3_1.Vector3();
            var temp = void 0;
            for (var i = 1; i < this.indexs.length; i++) {
                vec3.subVectors(this.navMesh.vertexs[this.indexs[i]], point);
                ret2.crossVectors(vec2, vec3);
                if (ret2.dot(ret1) < 0) {
                    return false; // 如果新的叉乘向量与老的叉乘向量不等，则点不在多边形内
                }
                vec1 = vec2;
                vec2 = vec3;
                vec3 = vec1;
                temp = ret2;
                ret2 = ret1;
                ret1 = temp;
            }
            return true;
        }
        // 计算中心点

    }, {
        key: "computeCenter",
        value: function computeCenter() {
            this.center = new vector3_1.Vector3();
            var x = 0;
            var y = 0;
            var z = 0;
            var vec = void 0;
            // TODO 循环顶点，计算和
            for (var _iterator = this.indexs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var v = _ref;

                vec = this.navMesh.vertexs[v];
                x += vec.x;
                y += vec.y;
                z += vec.z;
            }
            this.center.x = x / this.indexs.length;
            this.center.y = y / this.indexs.length;
            this.center.z = z / this.indexs.length;
        }
        // 计算包围盒

    }, {
        key: "computeBox",
        value: function computeBox() {
            var maxX = void 0;
            var minX = void 0;
            var maxZ = void 0;
            var minZ = void 0;
            var vec = this.navMesh.vertexs[this.indexs[0]];
            maxX = minX = vec.x;
            maxZ = minZ = vec.z;
            for (var i = 1; i < this.indexs.length; i++) {
                vec = this.navMesh.vertexs[this.indexs[i]];
                if (maxX < vec.x) {
                    maxX = vec.x;
                } else if (minX > vec.x) {
                    minX = vec.x;
                }
                if (maxZ < vec.z) {
                    maxZ = vec.z;
                } else if (minZ > vec.z) {
                    minZ = vec.z;
                }
            }
            this.box = new aabb_1.AABB(new vector3_1.Vector3(minX, 0, minZ), new vector3_1.Vector3(maxX, 0, maxZ));
        }
    }]);

    return Polygon;
}();

exports.Polygon = Polygon;

var LSegment = function () {
    function LSegment(navMesh, p1, p2, poly1, poly2) {
        _classCallCheck(this, LSegment);

        this.p1 = p1;
        this.p2 = p2;
        this.navMesh = navMesh;
        this.adjs = [poly1, poly2];
        this.center = new vector3_1.Vector3((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p2.y) / 2, (this.p1.z + this.p2.z) / 2);
    }
    // 上一点到该点的代价函数
    /* tslint:disable:function-name */


    _createClass(LSegment, [{
        key: "g",
        value: function g(last) {
            if (last.cost) {
                return this.center.distanceTo(last.center) * last.cost;
            } else {
                return this.center.distanceTo(last.center) * getAdjPoly(this.navMesh, last, this).cost;
            }
        }
        // 估值函数，值是从该点到终点的估计价值

    }, {
        key: "h",
        value: function h(finish) {
            if (finish.cost) {
                return this.center.distanceTo(finish.center) * finish.cost;
            } else {
                return this.center.distanceTo(finish.center) * getAdjPoly(this.navMesh, finish, this).cost;
            }
        }
        // 迭代器：返回邻居

    }, {
        key: Symbol.iterator,
        value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
            var adjsIndexs, poly, _iterator2, _isArray2, _i2, _ref2, polyIndex, _iterator3, _isArray3, _i3, _ref3, i;

            return regeneratorRuntime.wrap(function value$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            adjsIndexs = void 0;
                            poly = void 0;

                            if (!this.endPoint) {
                                _context.next = 7;
                                break;
                            }

                            _context.next = 5;
                            return this.endPoint;

                        case 5:
                            _context.next = 39;
                            break;

                        case 7:
                            _iterator2 = this.adjs, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();

                        case 8:
                            if (!_isArray2) {
                                _context.next = 14;
                                break;
                            }

                            if (!(_i2 >= _iterator2.length)) {
                                _context.next = 11;
                                break;
                            }

                            return _context.abrupt("break", 39);

                        case 11:
                            _ref2 = _iterator2[_i2++];
                            _context.next = 18;
                            break;

                        case 14:
                            _i2 = _iterator2.next();

                            if (!_i2.done) {
                                _context.next = 17;
                                break;
                            }

                            return _context.abrupt("break", 39);

                        case 17:
                            _ref2 = _i2.value;

                        case 18:
                            polyIndex = _ref2;

                            poly = this.navMesh.polygons[polyIndex];
                            adjsIndexs = poly.adjacency;
                            _iterator3 = adjsIndexs, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();

                        case 22:
                            if (!_isArray3) {
                                _context.next = 28;
                                break;
                            }

                            if (!(_i3 >= _iterator3.length)) {
                                _context.next = 25;
                                break;
                            }

                            return _context.abrupt("break", 37);

                        case 25:
                            _ref3 = _iterator3[_i3++];
                            _context.next = 32;
                            break;

                        case 28:
                            _i3 = _iterator3.next();

                            if (!_i3.done) {
                                _context.next = 31;
                                break;
                            }

                            return _context.abrupt("break", 37);

                        case 31:
                            _ref3 = _i3.value;

                        case 32:
                            i = _ref3;
                            _context.next = 35;
                            return getAdjLine(this.navMesh, this.navMesh.polygons[i], poly);

                        case 35:
                            _context.next = 22;
                            break;

                        case 37:
                            _context.next = 8;
                            break;

                        case 39:
                        case "end":
                            return _context.stop();
                    }
                }
            }, value, this);
        })
    }]);

    return LSegment;
}();

exports.LSegment = LSegment;
// 起点和终点

var SEPoint = function () {
    function SEPoint(navMesh, center, poly) {
        _classCallCheck(this, SEPoint);

        this.center = center;
        this.navMesh = navMesh;
        this.poly = poly;
    }
    // 上一点到该点的代价函数


    _createClass(SEPoint, [{
        key: "g",
        value: function g(last) {
            return this.center.distanceTo(last.center) * this.cost;
        }
        // 估值函数，值是从该点到终点的估计价值

    }, {
        key: "h",
        value: function h(finish) {
            return this.center.distanceTo(finish.center) * this.cost;
        }
        // 迭代器：返回邻居

    }, {
        key: Symbol.iterator,
        value: /*#__PURE__*/regeneratorRuntime.mark(function value() {
            var _iterator4, _isArray4, _i4, _ref4, adj;

            return regeneratorRuntime.wrap(function value$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _iterator4 = this.adjLs, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();

                        case 1:
                            if (!_isArray4) {
                                _context2.next = 7;
                                break;
                            }

                            if (!(_i4 >= _iterator4.length)) {
                                _context2.next = 4;
                                break;
                            }

                            return _context2.abrupt("break", 16);

                        case 4:
                            _ref4 = _iterator4[_i4++];
                            _context2.next = 11;
                            break;

                        case 7:
                            _i4 = _iterator4.next();

                            if (!_i4.done) {
                                _context2.next = 10;
                                break;
                            }

                            return _context2.abrupt("break", 16);

                        case 10:
                            _ref4 = _i4.value;

                        case 11:
                            adj = _ref4;
                            _context2.next = 14;
                            return adj;

                        case 14:
                            _context2.next = 1;
                            break;

                        case 16:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, value, this);
        })
    }]);

    return SEPoint;
}();

exports.SEPoint = SEPoint;
/* tslint:disable:max-classes-per-file */

var NavMesh = function () {
    // radio: number//目标半径
    function NavMesh() {
        _classCallCheck(this, NavMesh);

        this.vertexs = [];
        this.polygons = [];
        this.adjMap = new Map();
    }
    /**
     * 寻路
     * @param start 起点
     * @param end  终点
     * @param radio 待寻路物体的半径
     * @return 路径，Vector3的数组
     */


    _createClass(NavMesh, [{
        key: "findPath",
        value: function findPath(start, end) {
            var radio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            var newEnd = new vector3_1.Vector3();
            var sNode = this.findNearest(start);
            var eNode = this.findNearest(end);
            for (var i = 0; i < eNode.adjLs.length; i++) {
                eNode.adjLs[i].endPoint = eNode;
            }
            if (sNode.poly === eNode.poly) {
                sNode.adjLs.push(eNode);
            }
            // this.radio = radio;
            var paths = [];
            astar_1.astar(paths, sNode, eNode);
            for (var _i5 = 0; _i5 < eNode.adjLs.length; _i5++) {
                eNode.adjLs[_i5].endPoint = null;
            }
            return this.funnel(paths, start, eNode.center, radio);
        }
        /**
         * 加载
         * NavMesh文件格式 **.nav
         * 16字节：magic字符串：utf-8格式"NAVIGAT_V0010000"
         * 4字节：索引结束索引，int32
         * 4字节：顶点结束索引，int32
         * n字节：多边形索引，顶点数一定小于65536（规定）, 用short写（2字节）
         * n字节：顶点,每顶点12字节
         * n字节：多边形描述（相邻多边形的个数【int16，2字节】，代价【int16，2字节】, 相邻多边形的索引【int16】， 与相邻多边形的共点【int16】）
         * @param data 从Unity导出的二进制对象
         */

    }, {
        key: "load",
        value: function load(data) {
            var i32 = new Int32Array(data, 16, 2);
            var iEnd = i32[0]; // 顶点结束索引 4字节
            var vEnd = i32[1]; // 顶点结束索引 4字节
            var vectorData = new Float32Array(data, iEnd, (vEnd - iEnd) / 4);
            var vector = void 0;
            var startIndex = void 0;
            for (var i = 0; i < vectorData.length / 3; i++) {
                startIndex = i * 3;
                vector = new vector3_1.Vector3(vectorData[startIndex], 0, vectorData[startIndex + 2]);
                this.vertexs.push(vector);
            }
            var faceData = new Int16Array(data, 24, (iEnd - 24) / 2);
            var ploy = void 0;
            var indexs = void 0;
            var adjPloy = void 0;
            // let adjPoint;
            var side = void 0;
            var cost = void 0;
            var index = void 0;
            var hash = void 0;
            for (var _i6 = 0; _i6 < faceData.length;) {
                side = faceData[_i6++];
                cost = faceData[_i6++];
                adjPloy = [];
                indexs = [];
                index = this.polygons.length;
                for (var j = 0; j < side; j++) {
                    indexs.push(faceData[_i6++]);
                }
                for (var _j = 0; _j < side; _j++) {
                    if (faceData[_i6++] === -1) {
                        continue;
                    }
                    adjPloy.push(faceData[_i6 - 1]);
                    hash = Hash.nextHash(Math.min(faceData[_i6 - 1], index), Math.max(faceData[_i6 - 1], index));
                    if (!this.adjMap.get(hash)) {
                        this.adjMap.set(hash, new LSegment(this, this.vertexs[indexs[_j]], this.vertexs[getNext(indexs, _j)], faceData[_i6 - 1], index));
                    }
                }
                ploy = new Polygon(this, indexs, adjPloy, cost, index);
                this.polygons.push(ploy);
            }
        }
        /**
         * 找最邻近的多边形（如果点在某个多边形内部，返回那个多边形）
         * newPoint--point不一定在可行走区域，newPoint为与point最近的多边形上的点
         */

    }, {
        key: "findNearest",
        value: function findNearest(point) {
            var sep = void 0;
            var i = 0;
            for (var _iterator5 = this.polygons, _isArray5 = Array.isArray(_iterator5), _i7 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                var _ref5;

                if (_isArray5) {
                    if (_i7 >= _iterator5.length) break;
                    _ref5 = _iterator5[_i7++];
                } else {
                    _i7 = _iterator5.next();
                    if (_i7.done) break;
                    _ref5 = _i7.value;
                }

                var p = _ref5;

                i++;
                // 检查点是否在多边形的包围盒内部
                if (!p.box.containsPoint(point)) {
                    continue;
                }
                // 检查点是否在多边形的内部
                if (p.containsPoint(point)) {
                    sep = new SEPoint(this, point, p);
                    sep.adjLs = getAdjLines(p);
                    sep.cost = p.cost;
                    return sep;
                }
            }
            // 点不在可行走区域时，执行以下代码	
            var min = Number.POSITIVE_INFINITY;
            var tempDistance = void 0;
            var ploy = void 0;
            for (var _iterator6 = this.polygons, _isArray6 = Array.isArray(_iterator6), _i8 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
                var _ref6;

                if (_isArray6) {
                    if (_i8 >= _iterator6.length) break;
                    _ref6 = _iterator6[_i8++];
                } else {
                    _i8 = _iterator6.next();
                    if (_i8.done) break;
                    _ref6 = _i8.value;
                }

                var _p = _ref6;

                tempDistance = _p.center.distanceTo(point);
                if (tempDistance < min) {
                    min = tempDistance;
                    ploy = _p;
                }
            }
            var v1 = void 0;
            var v2 = void 0;
            var jionPoint = void 0;
            var temp1 = void 0;
            var temp2 = void 0;
            var n = void 0;
            var verticalP = void 0;
            var tempDist = void 0;
            var shadowL = void 0;
            var minDist = Number.POSITIVE_INFINITY;
            for (var _i9 = 0; _i9 < ploy.indexs.length; _i9++) {
                v1 = this.vertexs[ploy.indexs[_i9]];
                v2 = this.vertexs[getNext(ploy.indexs, _i9)];
                // temp1，temp2为向量v2-v1,v2-point
                temp1 = new vector3_1.Vector3().subVectors(v1, v2);
                temp2 = new vector3_1.Vector3().subVectors(point, v2);
                n = temp1.normalize();
                shadowL = temp2.dot(n);
                // 如果temp2与n上的差乘小于0，temp2与n为钝角，point更靠近v2
                if (shadowL < 0) {
                    /* tslint:disable:no-conditional-assignment */
                    if ((tempDist = point.distanceTo(v2)) < minDist) {
                        jionPoint = v2;
                        minDist = tempDist;
                    }
                    // 如果temp2与n上的差乘大于temp1的模，point更靠近v2
                } else if (shadowL > v1.distanceTo(v2)) {
                    if ((tempDist = point.distanceTo(v1)) < minDist) {
                        jionPoint = v1;
                        minDist = tempDist;
                    }
                    // 如果temp2与n上的差乘小于temp1的模，大于0，point到temp1的最短距离为point到temp1的垂线
                } else {
                    verticalP = new vector3_1.Vector3().addVectors(new vector3_1.Vector3(shadowL * n.x, shadowL * n.y, shadowL * n.z), v2);
                    if ((tempDist = point.distanceTo(verticalP)) < minDist) {
                        jionPoint = verticalP;
                        minDist = tempDist;
                    }
                }
            }
            sep = new SEPoint(this, jionPoint, ploy);
            sep.cost = ploy.cost;
            sep.adjLs = getAdjLines(ploy);
            return sep;
        }
        /**
         * 拉直: 漏斗算法，返回Vector3[]
         * 共边上的点根据半径往回缩减
         *  http://liweizhaolili.lofter.com/post/1cc70144_86a939e
         *  http://digestingduck.blogspot.hk/2010/03/simple-stupid-funnel-algorithm.html
         */
        /* tslint:disable:cyclomatic-complexity */

    }, {
        key: "funnel",
        value: function funnel(node, start, end) {
            var radio = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            var points = [];
            if (node.length === 1) {
                points.push(start);
                points.push(end);
                return points;
            }
            var oldV1 = void 0;
            var oldV2 = void 0;
            var newV1 = void 0;
            var newV2 = void 0;
            var radioV = void 0;
            var adjLine = void 0; // 相邻多边形共线
            var lastLine = void 0; // lastPoint指向end的向量
            var maxIndex = node.length - 1;
            var lastPoint = start;
            var lastIndex1 = 0;
            var lastIndex2 = 0;
            points.push(start);
            for (var i = 1; i < maxIndex; i++) {
                adjLine = node[i];
                radioV = new vector3_1.Vector3().subVectors(adjLine.p2, adjLine.p1).normalize().multiplyScalar(radio);
                newV1 = new vector3_1.Vector3().subVectors(new vector3_1.Vector3().addVectors(adjLine.p1, radioV), lastPoint);
                newV2 = new vector3_1.Vector3().subVectors(new vector3_1.Vector3().subVectors(adjLine.p2, radioV), lastPoint);
                if (!oldV1 || !oldV2) {
                    oldV1 = newV1;
                    oldV2 = newV2;
                    lastIndex1 = lastIndex2 = i;
                    // 如果有一个为零向量，直接更新
                } else if (isZeroVector(oldV1) || isZeroVector(oldV2)) {
                    oldV1 = newV1;
                    oldV2 = newV2;
                    lastIndex1 = i;
                    lastIndex2 = i;
                } else {
                    // newV1超出oldV1, oldV2夹角范围， 与oldV2相邻
                    if (vIsOrder(oldV1, oldV2, newV1)) {
                        // newV1超出oldV1, oldV2夹角范围， 与oldV2相邻， 设置oldV2为拐点
                        if (vIsOrder(oldV1, oldV2, newV2)) {
                            lastPoint = oldV2.add(lastPoint);
                            points.push(lastPoint);
                            oldV1 = oldV2 = null;
                            i = lastIndex2;
                            continue;
                            // newV2在oldV1, oldV2夹角范围内， 更新oldV1为newV2
                        } else if (vIsOrder(oldV1, newV2, oldV2)) {
                            oldV1 = newV2;
                            lastIndex1 = i;
                        }
                        // newV1超出oldV1, oldV2夹角范围， 与oldV1相邻；
                    } else if (vIsOrder(newV1, oldV1, oldV2)) {
                        // newV2超出oldV1, oldV2夹角范围， 与oldV1相邻， 设置oldV1为拐点
                        if (vIsOrder(oldV2, oldV1, newV2)) {
                            lastPoint = oldV1.add(lastPoint);
                            points.push(lastPoint);
                            oldV1 = oldV2 = null;
                            i = lastIndex1;
                            continue;
                            // newV2在oldV1, oldV2夹角范围内， 与oldV1相邻；
                        } else if (vIsOrder(oldV1, newV2, oldV2)) {
                            oldV2 = newV2;
                            lastIndex2 = i;
                        }
                        // newV1在oldV1, oldV2夹角范围内
                    } else {
                        // newV2超出oldV1, oldV2夹角范围， 与oldV2相邻， 更新oldV1为newV1;
                        if (vIsOrder(oldV1, oldV2, newV2)) {
                            oldV1 = newV1;
                            lastIndex1 = i;
                            // newV2超出oldV1, oldV2夹角范围， 与oldV1相邻， 更新oldV2为newV1;
                        } else if (vIsOrder(newV2, oldV1, oldV2)) {
                            oldV2 = newV1;
                            lastIndex2 = i;
                            // newV2在oldV1, oldV2夹角范围内， 更新oldV1为newV1， oldV2为newV2;
                        } else if (vIsOrder(oldV1, newV2, oldV2)) {
                            oldV1 = newV1;
                            oldV2 = newV2;
                            lastIndex1 = i;
                            lastIndex2 = i;
                        }
                    }
                }
                // 已经遍历到最后一个节点，连接lastPoint与end为向量lastLine
                if (i === maxIndex - 1 && oldV1 && oldV2 && !isZeroVector(oldV1) && !isZeroVector(oldV2)) {
                    lastLine = new vector3_1.Vector3().subVectors(end, lastPoint);
                    // lastLine超出oldV1与oldV2的夹角范围，与oldV1相邻时，设置oldV1为拐点
                    if (vIsOrder(lastLine, oldV1, oldV2)) {
                        lastPoint = new vector3_1.Vector3().addVectors(lastPoint, oldV1);
                        oldV1 = oldV2 = null;
                        i = lastIndex1;
                        points.push(lastPoint);
                        // lastLine超出oldV1与oldV2的夹角范围，与oldV2相邻时，设置oldV2为拐点
                    } else if (vIsOrder(lastLine, oldV2, oldV1)) {
                        lastPoint = new vector3_1.Vector3().addVectors(lastPoint, oldV2);
                        oldV1 = oldV2 = null;
                        i = lastIndex2;
                        points.push(lastPoint);
                    }
                }
            }
            points.push(end);
            return points;
        }
    }]);

    return NavMesh;
}();

exports.NavMesh = NavMesh;
var getNext = function getNext(arr, i) {
    if (i === arr.length - 1) {
        return arr[0];
    } else {
        return arr[i + 1];
    }
};
// 取到两多边形的共边
var getAdjLine = function getAdjLine(navMesh, poly1, poly2) {
    var max = Math.max(poly1.index, poly2.index);
    var min = Math.min(poly1.index, poly2.index);
    return navMesh.adjMap.get(Hash.nextHash(min, max));
};
// 取到两边所在的多边形
var getAdjPoly = function getAdjPoly(navMesh, l1, l2) {
    for (var i = 0; i < l1.adjs.length; i++) {
        for (var j = 0; j < l2.adjs.length; j++) {
            if (l1.adjs[i] === l2.adjs[j]) {
                return navMesh.polygons[l1.adjs[i]];
            }
        }
    }
};
// 取到多边形中，有相邻多边形的边
var getAdjLines = function getAdjLines(poly) {
    var lines = [];
    for (var i = 0; i < poly.adjacency.length; i++) {
        lines.push(getAdjLine(poly.navMesh, poly, poly.navMesh.polygons[poly.adjacency[i]]));
    }
    return lines;
};
// 检查三个向量是否按顺序排布
var vIsOrder = function vIsOrder(v1, v2, v3) {
    var cross1 = new vector3_1.Vector3().crossVectors(v2, v1);
    var cross2 = new vector3_1.Vector3().crossVectors(v2, v3);
    return cross1.dot(cross2) <= 0;
};
// 是零向量
var isZeroVector = function isZeroVector(v) {
    return v.x === v.y && v.y === v.z && v.z === 0;
};
})