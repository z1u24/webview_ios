_$define("pi_pt/rust/https/mount", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
/*
* 挂载器
*/

var Mount = function (_nobject_1$NObject) {
    _inherits(Mount, _nobject_1$NObject);

    function Mount() {
        _classCallCheck(this, Mount);

        //在指定路由上挂载指定的处理器，路由必须为绝对路径
        /**
         * @param self
         * @param route:&str
         * @param handler:H
         * @return &muthttps::mount::Mount
         */
        var _this = _possibleConstructorReturn(this, (Mount.__proto__ || Object.getPrototypeOf(Mount)).apply(this, arguments));

        _this.mountStaticFile = function (route, handler) {
            handler = handler.self;
            var result = vm_1.call(3977181471, [_this.self, route, handler]);
            result = new Mount(result);
            return result;
        };
        //在指定路由上挂载指定的处理器，路由必须为绝对路径
        /**
         * @param self
         * @param route:&str
         * @param handler:H
         * @return &muthttps::mount::Mount
         */
        _this.mountStaticFileBatch = function (route, handler) {
            handler = handler.self;
            var result = vm_1.call(4128314446, [_this.self, route, handler]);
            result = new Mount(result);
            return result;
        };
        //在指定路由上挂载指定的处理器，路由必须为绝对路径
        /**
         * @param self
         * @param route:&str
         * @param handler:H
         * @return &muthttps::mount::Mount
         */
        _this.mountFileUpload = function (route, handler) {
            handler = handler.self;
            var result = vm_1.call(2869286636, [_this.self, route, handler]);
            result = new Mount(result);
            return result;
        };
        return _this;
    }

    return Mount;
}(nobject_1.NObject);

Mount._$info = new sinfo_1.StructInfo("pi_pt/rust/https/mount.Mount", 2373723440, new Map(), []);
//构建一个挂载器
/**
 * @return
 */
Mount.new = function () {
    var result = vm_1.call(1576795673, []);
    result = new Mount(result);
    return result;
};
exports.Mount = Mount;
})