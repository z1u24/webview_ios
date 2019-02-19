_$define("pi/ui/submit", function (require, exports, module){
"use strict";
/*
 * 提交输入框，要求props为{sign:string|number, text?:string, readOnly?:string, focus?:boolean, id?:string|number}, 注意text要转义引号
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ============================== 导入
var event_1 = require("../widget/event");
var painter_1 = require("../widget/painter");
var input_1 = require("./input");
// ============================== 导出
/**
 * @description 导出组件Widget类
 * @example
 */

var Submit = function (_input_1$Input) {
    _inherits(Submit, _input_1$Input);

    function Submit() {
        _classCallCheck(this, Submit);

        return _possibleConstructorReturn(this, (Submit.__proto__ || Object.getPrototypeOf(Submit)).apply(this, arguments));
    }

    _createClass(Submit, [{
        key: "getInput",

        /**
         * @description 获取输入框
         * @example
         */
        value: function getInput() {
            return findInput(this.tree);
        }
        /**
         * @description 提交
         * @example
         */

    }, {
        key: "submit",
        value: function submit() {
            var i = this.getInput();
            painter_1.paintCmd3(i, 'value', this.lastText || '');
            event_1.notify(this.parentNode, 'ev-input-submit', { id: this.props.id, text: i.value, input: i });
        }
    }]);

    return Submit;
}(input_1.Input);

exports.Submit = Submit;
// ============================== 本地
// 递归查找input
var findInput = function findInput(node) {
    for (var _iterator = node.children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var i = _ref;

        if (!i.children) {
            continue;
        }
        if (i.tagName === 'input') {
            return painter_1.getRealNode(i);
        }
        var r = findInput(i);
        if (r) {
            return r;
        }
    }
};
})