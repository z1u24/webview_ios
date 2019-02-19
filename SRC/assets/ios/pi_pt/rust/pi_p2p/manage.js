_$define("pi_pt/rust/pi_p2p/manage", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");

var P2PManage = function (_nobject_1$NObject) {
    _inherits(P2PManage, _nobject_1$NObject);

    function P2PManage() {
        _classCallCheck(this, P2PManage);

        //连接节点
        /**
         * @param self
         */
        var _this = _possibleConstructorReturn(this, (P2PManage.__proto__ || Object.getPrototypeOf(P2PManage)).apply(this, arguments));

        _this.connect = function () {
            vm_1.call(2634481422, [_this.self]);
        };
        //指定节点连接
        /**
         * @param self
         * @param addr:&str
         */
        _this.connectAddr = function (addr) {
            vm_1.call(338675993, [_this.self, addr]);
        };
        //广播节点
        /**
         * @param self
         */
        _this.broadcastAddr = function () {
            vm_1.call(696058749, [_this.self]);
        };
        return _this;
    }

    return P2PManage;
}(nobject_1.NObject);

P2PManage._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_p2p/manage.P2PManage", 2957730883, new Map(), []);
exports.P2PManage = P2PManage;
})