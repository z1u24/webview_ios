_$define("app/view/mine/setting/itemList", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * radioList
 */
// =============================================导入
var localLanguage_1 = require("../../../../pi/browser/localLanguage");
var lang_1 = require("../../../../pi/util/lang");
var widget_1 = require("../../../../pi/widget/widget");
var memstore_1 = require("../../../store/memstore");
// ================================================导出

var ItemList = function (_widget_1$Widget) {
    _inherits(ItemList, _widget_1$Widget);

    function ItemList() {
        _classCallCheck(this, ItemList);

        return _possibleConstructorReturn(this, (ItemList.__proto__ || Object.getPrototypeOf(ItemList)).apply(this, arguments));
    }

    _createClass(ItemList, [{
        key: "setProps",
        value: function setProps(oldProps, props) {
            _get(ItemList.prototype.__proto__ || Object.getPrototypeOf(ItemList.prototype), "setProps", this).call(this, oldProps, props);
            console.log(oldProps);
            this.props = Object.assign({}, this.props, { selectedIndex: 0, list1: [], keys: [] });
            var list = [];
            var keys = [];
            for (var i in this.props.list) {
                list.push(this.props.list[i]);
                keys.push(i);
            }
            var val = this.props.list[this.props.selected];
            this.props.selectedIndex = list.indexOf(val);
            this.props.list1 = list;
            this.props.keys = keys;
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }, {
        key: "changeSelect",
        value: function changeSelect(e) {
            if (this.props.flag === 0) {
                lang_1.setLang(this.props.keys[e.value === 2 ? 0 : e.value]);
                var appLanguage = new localLanguage_1.LocalLanguageMgr();
                appLanguage.init();
                appLanguage.setAppLan({
                    success: function success(localLan) {},
                    fail: function fail(result) {}, language: localLanguage_1.appLanguageList[this.props.keys[e.value === 2 ? 0 : e.value]]
                });
                memstore_1.setStore('setting/language', this.props.keys[e.value === 2 ? 0 : e.value]);
            } else if (this.props.flag === 1) {
                memstore_1.setStore('setting/currencyUnit', this.props.keys[e.value]);
            } else {
                memstore_1.setStore('setting/changeColor', this.props.keys[e.value]);
            }
        }
    }]);

    return ItemList;
}(widget_1.Widget);

exports.ItemList = ItemList;
})