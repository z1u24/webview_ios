_$define("chat/client/app/widget/pageEdit/pageEdit", function (require, exports, module){
"use strict";
/**
 * 编辑页面
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ================================================ 导入
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");
var logic_1 = require("../../logic/logic");
// ================================================ 导出

var PageEdit = function (_widget_1$Widget) {
    _inherits(PageEdit, _widget_1$Widget);

    function PageEdit() {
        _classCallCheck(this, PageEdit);

        var _this = _possibleConstructorReturn(this, (PageEdit.__proto__ || Object.getPrototypeOf(PageEdit)).apply(this, arguments));

        _this.props = {
            title: '',
            needTitle: false,
            titleInput: '',
            contentInput: '',
            count: 0,
            placeholder: ''
        };
        return _this;
    }

    _createClass(PageEdit, [{
        key: "setProps",
        value: function setProps(props) {
            _get(PageEdit.prototype.__proto__ || Object.getPrototypeOf(PageEdit.prototype), "setProps", this).call(this, props);
            this.props.count = 0;
            this.props.placeholder = props.contentInput || '内容（必填）15-500字';
        }
    }, {
        key: "goBack",
        value: function goBack() {
            this.cancel();
        }
        // 标题变化

    }, {
        key: "inputChange",
        value: function inputChange(e) {
            this.props.titleInput = e.value;
        }
        // 内容变化

    }, {
        key: "textAreaChange",
        value: function textAreaChange(e) {
            this.props.contentInput = e.value;
            this.props.count = e.value.length;
        }
        // 完成编辑

    }, {
        key: "completeEdit",
        value: function completeEdit() {
            if (this.props.needTitle && !this.props.titleInput) {
                logic_1.bottomNotice('标题不能为空');
                return;
            }
            if (!this.props.contentInput) {
                logic_1.bottomNotice('内容不能为空');
                return;
            }
            this.ok({ title: this.props.titleInput, content: this.props.contentInput });
        }
        // 聚焦内容输入框

    }, {
        key: "focusContent",
        value: function focusContent(e) {
            var content = painter_1.getRealNode(e.node).getElementsByTagName('textarea')[0];
            content.focus();
        }
    }]);

    return PageEdit;
}(widget_1.Widget);

exports.PageEdit = PageEdit;
})