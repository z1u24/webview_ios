_$define("chat/client/app/widget/nameCard/nameCard", function (require, exports, module){
"use strict";
/**
 * nameCard 组件相关处理
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
// ===========================导入
var widget_1 = require("../../../../../pi/widget/widget");
// ===========================导出

var NameCard = function (_widget_1$Widget) {
    _inherits(NameCard, _widget_1$Widget);

    function NameCard() {
        _classCallCheck(this, NameCard);

        var _this = _possibleConstructorReturn(this, (NameCard.__proto__ || Object.getPrototypeOf(NameCard)).call(this));

        _this.props = {
            avatorPath: '../../res/images/emoji.png',
            cardInfo: '群名或用户名或',
            cardType: 'redEnv',
            cardTypeShow: 'KuPay红包'
        };
        return _this;
    }

    _createClass(NameCard, [{
        key: "setProps",
        value: function setProps(props) {
            _get(NameCard.prototype.__proto__ || Object.getPrototypeOf(NameCard.prototype), "setProps", this).call(this, props);
            if (this.props.cardType === 'user') {
                this.props.cardTypeShow = '个人名片';
            } else if (this.props.cardType === 'group') {
                this.props.cardTypeShow = '群名片';
            } else if (this.props.cardType === 'redEnv') {
                this.props.cardTypeShow = 'KuPay红包';
            }
        }
    }]);

    return NameCard;
}(widget_1.Widget);

exports.NameCard = NameCard;
})