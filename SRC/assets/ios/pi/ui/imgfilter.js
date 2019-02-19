_$define("pi/ui/imgfilter", function (require, exports, module){
"use strict";
/*
 * 图像滤镜
 * 支持多种滤镜，可以连续滤镜处理，包括 灰度-色相饱和度亮度-亮度对比度-腐蚀-锐化-高斯模糊
 * props = {"img":"./1.png", "path":"{{_path}}", arr":[["gray"], ["hsl", 180?, 1?, 1?],
 * ["brightnessContrast", 0.5, 0?], ["corrode", 3?], ["sharp", 3?], ["gaussBlur", 3?]]}
 * 如果arr不存在或长度为0, 表示使用标准图像
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ============================== 导入
var mod_1 = require("../lang/mod");
var canvas_1 = require("../util/canvas");
var res_mgr_1 = require("../util/res_mgr");
var widget_1 = require("../widget/widget");
// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */

var ImgFilter = function (_widget_1$Widget) {
    _inherits(ImgFilter, _widget_1$Widget);

    function ImgFilter() {
        _classCallCheck(this, ImgFilter);

        return _possibleConstructorReturn(this, (ImgFilter.__proto__ || Object.getPrototypeOf(ImgFilter)).apply(this, arguments));
    }

    _createClass(ImgFilter, [{
        key: "setProps",

        /**
         * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
         * @example
         */
        value: function setProps(props, oldProps) {
            var _this2 = this;

            this.props = props;
            if (!(props.arr && props.arr.length)) {
                this.props.url = props.file || (props.img ? mod_1.butil.relativePath(props.img, props.path) : '');
                return;
            }
            var key = canvas_1.getImgFilterKey(props);
            var tab = this.resTab;
            if (!tab) {
                this.resTab = tab = new res_mgr_1.ResTab();
            }
            var res = tab.get(key);
            if (res) {
                props.url = res.link;
            } else {
                tab.load(key, canvas_1.RES_TYPE_IMGFILTER, props, tab, function (res) {
                    props.url = res.link;
                    _this2.paint();
                });
            }
        }
    }]);

    return ImgFilter;
}(widget_1.Widget);

exports.ImgFilter = ImgFilter;
// ============================== 本地
// ============================== 立即执行
})