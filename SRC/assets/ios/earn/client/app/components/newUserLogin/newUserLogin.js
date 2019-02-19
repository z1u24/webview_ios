_$define("earn/client/app/components/newUserLogin/newUserLogin", function (require, exports, module){
"use strict";
/**
 * 新用户登录
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var widget_1 = require("../../../../../pi/widget/widget");
var util_1 = require("../../utils/util");
var dataEnum_s_1 = require("../../xls/dataEnum.s");

var NewUserLogin = function (_widget_1$Widget) {
    _inherits(NewUserLogin, _widget_1$Widget);

    function NewUserLogin() {
        _classCallCheck(this, NewUserLogin);

        var _this = _possibleConstructorReturn(this, (NewUserLogin.__proto__ || Object.getPrototypeOf(NewUserLogin)).apply(this, arguments));

        _this.props = {
            pi_norouter: true,
            prizeList: []
        };
        return _this;
    }

    _createClass(NewUserLogin, [{
        key: "create",
        value: function create() {
            var _this2 = this;

            _get(NewUserLogin.prototype.__proto__ || Object.getPrototypeOf(NewUserLogin.prototype), "create", this).call(this);
            this.config = { value: { group: 'top' } };
            var data = util_1.getRegularPrizeList(dataEnum_s_1.ActivityType.NewUserWelfare);
            data.forEach(function (element) {
                var prize = {
                    info: util_1.getPrizeInfo(element.prop),
                    count: element.count
                };
                _this2.props.prizeList.push(prize);
            });
        }
    }, {
        key: "close",
        value: function close(e) {
            this.ok && this.ok();
        }
    }]);

    return NewUserLogin;
}(widget_1.Widget);

exports.NewUserLogin = NewUserLogin;
})