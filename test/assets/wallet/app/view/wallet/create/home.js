_$define("app/view/wallet/create/home", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * create a wallet
 */
var root_1 = require("../../../../pi/ui/root");
var forelet_1 = require("../../../../pi/widget/forelet");
var widget_1 = require("../../../../pi/widget/widget");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var CreateEnter = function (_widget_1$Widget) {
    _inherits(CreateEnter, _widget_1$Widget);

    function CreateEnter() {
        _classCallCheck(this, CreateEnter);

        return _possibleConstructorReturn(this, (CreateEnter.__proto__ || Object.getPrototypeOf(CreateEnter)).apply(this, arguments));
    }

    _createClass(CreateEnter, [{
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "createByImgClick",
        value: function createByImgClick() {
            root_1.popNew('app-view-wallet-create-createWalletByImage');
        }
    }, {
        key: "walletImportClicke",
        value: function walletImportClicke() {
            root_1.popNew('app-view-wallet-import-home');
        }
    }, {
        key: "createStandardClick",
        value: function createStandardClick() {
            root_1.popNew('app-view-wallet-create-createWallet');
        }
    }]);

    return CreateEnter;
}(widget_1.Widget);

exports.CreateEnter = CreateEnter;
})