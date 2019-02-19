_$define("chat/client/app/widget/randomName/randomName", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 随机获取名字组件
 */
// ================================ 导入
var event_1 = require("../../../../../pi/widget/event");
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");
var nameWareHouse_1 = require("./nameWareHouse");
// ================================ 导出

var RandomName = function (_widget_1$Widget) {
    _inherits(RandomName, _widget_1$Widget);

    function RandomName() {
        _classCallCheck(this, RandomName);

        return _possibleConstructorReturn(this, (RandomName.__proto__ || Object.getPrototypeOf(RandomName)).apply(this, arguments));
    }

    _createClass(RandomName, [{
        key: "setProps",
        value: function setProps(props) {
            _get(RandomName.prototype.__proto__ || Object.getPrototypeOf(RandomName.prototype), "setProps", this).call(this, props);
            this.state = {
                name: props.name
            };
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
        /**
         * 名字改变
         */

    }, {
        key: "nameChange",
        value: function nameChange(e) {
            this.state.name = e.value;
            event_1.notify(e.node, 'ev-rName-change', { value: e.value });
            this.paint();
        }
        /**
         * 随机获取新名字
         */

    }, {
        key: "randomPlayName",
        value: function randomPlayName(e) {
            var _this2 = this;

            this.state.name = exports.playerName();
            event_1.notify(e.node, 'ev-rName-change', { value: this.state.name });
            var img = painter_1.getRealNode(this.tree).getElementsByTagName('img')[0];
            img.classList.add('random');
            setTimeout(function () {
                img.classList.remove('random');
                _this2.paint();
            }, 1000);
        }
    }]);

    return RandomName;
}(widget_1.Widget);

exports.RandomName = RandomName;
/**
 * 获取随机名字
 */
exports.playerName = function () {
    var num1 = nameWareHouse_1.nameWare[0].length;
    var num2 = nameWareHouse_1.nameWare[1].length;
    var name = '';
    // tslint:disable-next-line:max-line-length
    name = exports.unicodeArray2Str(nameWareHouse_1.nameWare[0][Math.floor(Math.random() * num1)]) + exports.unicodeArray2Str(nameWareHouse_1.nameWare[1][Math.floor(Math.random() * num2)]);
    return name;
};
/**
 * unicode数组转字符串
 */
exports.unicodeArray2Str = function (arr) {
    var str = '';
    if (!arr || typeof arr === 'string') {
        // 如果本身不存在或是字符串则直接返回
        return str;
    }
    for (var i = 0; i < arr.length; i++) {
        str += String.fromCharCode(arr[i]);
    }
    return str;
};
})