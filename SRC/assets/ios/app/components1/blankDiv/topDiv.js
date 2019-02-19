_$define("app/components1/blankDiv/topDiv", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 顶部空白div  主要用来空出刘海高度
 */
var widget_1 = require("../../../pi/widget/widget");
var memstore_1 = require("../../store/memstore");
var constants_1 = require("../../utils/constants");
var forelet_1 = require("../../../pi/widget/forelet");
exports.forelet = new forelet_1.Forelet();
exports.WIDGET_NAME = module.id.replace(/\//g, '-');

var TopDiv = function (_widget_1$Widget) {
    _inherits(TopDiv, _widget_1$Widget);

    function TopDiv() {
        _classCallCheck(this, TopDiv);

        return _possibleConstructorReturn(this, (TopDiv.__proto__ || Object.getPrototypeOf(TopDiv)).apply(this, arguments));
    }

    _createClass(TopDiv, [{
        key: "create",
        value: function create() {
            _get(TopDiv.prototype.__proto__ || Object.getPrototypeOf(TopDiv.prototype), "create", this).call(this);
            this.props = {
                height: memstore_1.getStore('setting/topHeight', constants_1.topHeight)
            };
        }
    }]);

    return TopDiv;
}(widget_1.Widget);

exports.TopDiv = TopDiv;
memstore_1.register('setting/topHeight', function (topHeight) {
    var w = exports.forelet.getWidget(exports.WIDGET_NAME);
    exports.forelet.paint(topHeight);
    if (w) {
        w.props.height = topHeight;
        w.paint();
    }
});
})