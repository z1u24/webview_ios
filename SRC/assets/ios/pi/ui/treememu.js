_$define("pi/ui/treememu", function (require, exports, module){
"use strict";
/*
 * 树形菜单，要求props为{tag:"btn$", show:{select:true, cfg:{} }, arr:[]}，嵌套使用，子菜单的props为父菜单的引用
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var event_1 = require("../widget/event");
var widget_1 = require("../widget/widget");
// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */

var TreeMemu = function (_widget_1$Widget) {
    _inherits(TreeMemu, _widget_1$Widget);

    function TreeMemu() {
        _classCallCheck(this, TreeMemu);

        return _possibleConstructorReturn(this, (TreeMemu.__proto__ || Object.getPrototypeOf(TreeMemu)).apply(this, arguments));
    }

    _createClass(TreeMemu, [{
        key: "setProps",

        /**
         * @description 设置属性，默认外部传入的props是完整的props，重载可改变行为
         * @example
         */
        value: function setProps(props, oldProps) {
            this.props = props;
            if (Number.isInteger(props)) {
                this.props = this.parentNode.widget.props.arr[props];
            }
        }
        /**
         * @description 按钮事件
         * @example
         */
        // tslint:disable-next-line:typedef

    }, {
        key: "change",
        value: function change(e) {
            if (this.props.arr) {
                this.props.show.select = !this.props.show.select;
                return this.paint();
            }
            event_1.notify(this.parentNode, 'ev-tm-open', e);
        }
    }]);

    return TreeMemu;
}(widget_1.Widget);

exports.TreeMemu = TreeMemu;
// ============================== 本地
// ============================== 立即执行
})