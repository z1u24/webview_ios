_$define("app/view/play/home/home", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * play home
 */
// ================================ 导入
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var PlayHome = function (_widget_1$Widget) {
    _inherits(PlayHome, _widget_1$Widget);

    function PlayHome() {
        _classCallCheck(this, PlayHome);

        return _possibleConstructorReturn(this, (PlayHome.__proto__ || Object.getPrototypeOf(PlayHome)).call(this));
    }

    _createClass(PlayHome, [{
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "doTap",
        value: function doTap() {
            window.open('http://192.168.33.105:8088/dst/client/boot/index.html?user=111');
        }
    }, {
        key: "getCode",
        value: function getCode(event) {
            console.log(event.phone);
        }
    }, {
        key: "modalBox",
        value: function modalBox() {
            // tslint:disable-next-line:max-line-length
            // popNew('app-components-modalBoxInput-modalBoxInput',{ title:'确认兑换',content:['输出：0.01ETH','输入：0.5KT'],sureText:'确定',cancelText:'取消',placeholder:'输入密码',itype:'password' });
        }
    }, {
        key: "modalBoxSure",
        value: function modalBoxSure(e) {
            console.log(e.value);
        }
    }]);

    return PlayHome;
}(widget_1.Widget);

exports.PlayHome = PlayHome;
})