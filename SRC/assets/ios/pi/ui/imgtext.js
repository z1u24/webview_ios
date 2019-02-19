_$define("pi/ui/imgtext", function (require, exports, module){
"use strict";
/*
 * 图像文字
 * 只支持单行文字，不支持继承的font属性，不支持line-height属性
 * 	如果支持继承的font属性，则需要在div放入节点后，获取font属性
 * 	如果支持多行文本，需要支持line-height属性，并处理对齐问题
 * 要求props为 {
 * 					textCfg:canvas.ImgTextCfg,
 * 					space?:number,
 * 					"show":"" // 如果有show，表示为拼接文字，text为全文字，show变动不会生成新的文字图片
 * 				}
 *
canvas.ImgTextCfg {
        "text": "测试",
        "font": "normal 400 24px 宋体",
        "color": "#636363" | GradientCfg, // 颜色 或渐变颜色
        "shadow": { // 阴影
            "offsetX": number,
            "offsetY": number, //偏移量
            "blur": number, // 模糊值，一般为5
            "color": string; // 颜色 "rgba(0,0,0,0.5)" "gray" "#BABABA"
        };
        "strokeWidth": number, // 描边宽度
        "strokeColor": string | GradientCfg, // 描边颜色
        "background": string | GradientCfg, // 背景
    }
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var canvas_1 = require("../util/canvas");
var res_mgr_1 = require("../util/res_mgr");
var widget_1 = require("../widget/widget");
// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */

var ImgText = function (_widget_1$Widget) {
    _inherits(ImgText, _widget_1$Widget);

    function ImgText() {
        _classCallCheck(this, ImgText);

        return _possibleConstructorReturn(this, (ImgText.__proto__ || Object.getPrototypeOf(ImgText)).apply(this, arguments));
    }

    _createClass(ImgText, [{
        key: "setProps",

        /**
         * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
         * @example
         */
        value: function setProps(props, oldProps) {
            var _this2 = this;

            var key = canvas_1.getImgTextKey(props.textCfg);
            if (!props.textCfg.isCommon) {
                props.space && (props.textCfg.space = props.space);
                props.show && (props.textCfg.text = props.show);
            }
            if (this.props && this.props.textCfg && this.props.textCfg.key === key) {
                this.props.show = props.show;
            } else {
                this.props = props;
                var tab = this.resTab;
                if (!tab) {
                    this.resTab = tab = new res_mgr_1.ResTab();
                }
                var res = tab.get(key);
                if (res) {
                    props.textCfg.url = res.link;
                    if (res.args.charUV) {
                        props.textCfg.charUV = res.args.charUV;
                    }
                    props.textCfg.width = res.args.width;
                    props.textCfg.height = res.args.height;
                    props.textCfg.zoomfactor = res.args.zoomfactor;
                } else {
                    tab.load(key, canvas_1.RES_TYPE_IMGTEXT, props.textCfg, undefined, function (res) {
                        props.textCfg.url = res.link;
                        if (res.args.charUV) {
                            props.textCfg.charUV = res.args.charUV;
                        }
                        props.textCfg.width = res.args.width;
                        props.textCfg.height = res.args.height;
                        props.textCfg.zoomfactor = res.args.zoomfactor;
                        _this2.paint();
                    });
                }
            }
        }
    }]);

    return ImgText;
}(widget_1.Widget);

exports.ImgText = ImgText;
// ============================== 本地
// ============================== 立即执行
})