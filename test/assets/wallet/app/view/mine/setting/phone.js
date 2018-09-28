_$define("app/view/mine/setting/phone", function (require, exports, module){
"use strict";

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
/**
 * 云端绑定手机
 */
// =================================================导入
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var pull_1 = require("../../../net/pull");
var tools_1 = require("../../../utils/tools");
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
                phone: '',
                code: [],
                isSuccess: true,
                cfgData: tools_1.getLanguage(this)
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 输入完成后确认
         */

    }, {
        key: "doSure",
        value: function doSure() {
            return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var data;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.state.phone) {
                                    _context.next = 5;
                                    break;
                                }

                                root_1.popNew('app-components-message-message', { content: this.state.cfgData.tips });
                                this.state.code = [];
                                this.paint();
                                return _context.abrupt("return");

                            case 5:
                                _context.next = 7;
                                return pull_1.regPhone(this.state.phone, this.state.code.join(''));

                            case 7:
                                data = _context.sent;

                                if (data && data.result === 1) {
                                    this.ok();
                                } else {
                                    this.state.isSuccess = false;
                                    this.state.code = [];
                                    this.paint();
                                }

                            case 9:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /**
         * 手机号改变
         */

    }, {
        key: "phoneChange",
        value: function phoneChange(e) {
            this.state.phone = e.value;
        }
        /**
         * 验证码改变
         */

    }, {
        key: "codeChange",
        value: function codeChange(e) {
            if (e.value) {
                this.state.code.push(e.value);
                var ind = this.state.code.length;
                // tslint:disable-next-line:prefer-template
                document.getElementById('codeInput' + (ind - 1)).getElementsByTagName('input')[0].blur();
                if (ind < 4) {
                    // tslint:disable-next-line:prefer-template
                    document.getElementById('codeInput' + ind).getElementsByTagName('input')[0].focus();
                }
            }
            this.paint();
            if (this.state.code.length === 4) {
                this.doSure();
            }
        }
        /**
         * 验证码输入框聚焦
         */

    }, {
        key: "codeFocus",
        value: function codeFocus() {
            var ind = this.state.code.length < 4 ? this.state.code.length : 3;
            // tslint:disable-next-line:prefer-template
            document.getElementById('codeInput' + ind).getElementsByTagName('input')[0].focus();
            this.paint();
        }
    }]);

    return BindPhone;
}(widget_1.Widget);

exports.BindPhone = BindPhone;
})