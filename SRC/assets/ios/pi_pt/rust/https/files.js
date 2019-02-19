_$define("pi_pt/rust/https/files", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
/*
* 批量静态资源文件
*/

var StaticFileBatch = function (_nobject_1$NObject) {
    _inherits(StaticFileBatch, _nobject_1$NObject);

    function StaticFileBatch() {
        _classCallCheck(this, StaticFileBatch);

        //增加指定通用响应头
        /**
         * @param self
         * @param key:&str
         * @param value:&str
         * @return usize
         */
        var _this = _possibleConstructorReturn(this, (StaticFileBatch.__proto__ || Object.getPrototypeOf(StaticFileBatch)).apply(this, arguments));

        _this.addGenRespHeader = function (key, value) {
            return vm_1.call(4071207699, [_this.self, key, value]);
        };
        //移除指定通用响应头
        /**
         * @param self
         * @param key:&str
         * @return usize
         */
        _this.removeGenRespHeader = function (key) {
            return vm_1.call(2098113688, [_this.self, key]);
        };
        return _this;
    }

    return StaticFileBatch;
}(nobject_1.NObject);

StaticFileBatch._$info = new sinfo_1.StructInfo("pi_pt/rust/https/files.StaticFileBatch", 3073428781, new Map(), []);
//指定文件根目录，构建指定的批量静态资源文件，可以是绝对路径或相对路径，如果为空串，则表示以当前运行时路径作为文件根目录
/**
 * @param root:P
 * @return
 */
StaticFileBatch.newString = function (root) {
    var result = vm_1.call(3011830990, [root]);
    result = new StaticFileBatch(result);
    return result;
};
exports.StaticFileBatch = StaticFileBatch;
})