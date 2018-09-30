_$define("app/components/bindPhone/bindPhone", function (require, exports, module){
"use strict";
/**
 * 绑定手机号组件
 * 外部监听 ev-getCode 事件发起获取验证码的请求
 * event.phone获取数据
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// =================================================导入
var root_1 = require("../../../pi/ui/root");
var event_1 = require("../../../pi/widget/event");
var widget_1 = require("../../../pi/widget/widget");
var pull_1 = require("../../net/pull");
var tools_1 = require("../../utils/tools");
// =================================================导出

var BindPhone = function (_widget_1$Widget) {
    _inherits(BindPhone, _widget_1$Widget);

    function BindPhone() {
        _classCallCheck(this, BindPhone);

        return _possibleConstructorReturn(this, (BindPhone.__proto__ || Object.getPrototypeOf(BindPhone)).call(this));
    }

    _createClass(BindPhone, [{
        key: "create",
        value: function create() {
            _get(BindPhone.prototype.__proto__ || Object.getPrototypeOf(BindPhone.prototype), "create", this).call(this);
            this.state = {
                oldCode: 86,
                codeList: ['86', '886'],
                isShowNewCode: false,
                countdown: 0,
                phone: '',
                limitTime: 60,
                phoneReg: /^[1][3-8]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/,
                cfgData: tools_1.getLanguage(this)
            };
            // const t = find('lastGetSmsCodeTime'); // 不保留获取验证码倒计时
            // if (t) {
            //     const now = new Date().getTime();
            //     this.state.countdown = this.state.limitTime - Math.ceil((now - t) / 1000);
            // }
            this.openTimer();
        }
    }, {
        key: "backClick",
        value: function backClick() {
            this.ok && this.ok();
        }
        /**
         * 获取验证码
         */

    }, {
        key: "getCode",
        value: function getCode(event) {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!(!this.state.phone || !this.state.phoneReg.test(this.state.phone))) {
                                    _context.next = 3;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips });
                                return _context.abrupt("return");

                            case 3:
                                _context.next = 5;
                                return pull_1.sendCode(this.state.phone, this.state.oldCode);

                            case 5:
                                // updateStore('lastGetSmsCodeTime', new Date().getTime());
                                event_1.notify(event.node, 'ev-getCode', { value: this.state.phone });
                                this.state.countdown = this.state.limitTime;
                                this.paint();

                            case 8:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 显示新的区号
         */

    }, {
        key: "showNewCode",
        value: function showNewCode() {
            this.state.isShowNewCode = true;
            this.paint();
        }
        /**
         * 选择新的区号
         */

    }, {
        key: "chooseNewCode",
        value: function chooseNewCode(ind) {
            this.state.isShowNewCode = false;
            this.state.oldCode = this.state.codeList[ind];
            this.paint();
        }
        /**
         * 电话号码改变
         */

    }, {
        key: "phoneChange",
        value: function phoneChange(e) {
            this.state.phone = e.value;
        }
    }, {
        key: "openTimer",
        value: function openTimer() {
            var _this2 = this;

            setTimeout(function () {
                _this2.openTimer();
                if (_this2.state.countdown <= 0) return;
                _this2.state.countdown--;
                _this2.paint();
            }, 1000);
        }
    }]);

    return BindPhone;
}(widget_1.Widget);

exports.BindPhone = BindPhone;
})