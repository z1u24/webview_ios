_$define("earn/client/app/components/mine/mine", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * mine
 */
var event_1 = require("../../../../../pi/widget/event");
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");
var util_1 = require("../../utils/util");
var hoeType_s_1 = require("../../xls/hoeType.s");
var mineType_s_1 = require("../../xls/mineType.s");

var Mine = function (_widget_1$Widget) {
    _inherits(Mine, _widget_1$Widget);

    function Mine() {
        _classCallCheck(this, Mine);

        return _possibleConstructorReturn(this, (Mine.__proto__ || Object.getPrototypeOf(Mine)).apply(this, arguments));
    }

    _createClass(Mine, [{
        key: "setProps",
        value: function setProps(props, oldProps) {
            var mineImgUrl = '../../res/image/';
            var hpMax = 0;
            if (props.mineType === mineType_s_1.MineType.SmallMine) {
                mineImgUrl = props.selected ? mineImgUrl + "small_mine_active.png" : mineImgUrl + "small_mine.png";
                hpMax = util_1.getMiningMaxHp(mineType_s_1.MineType.SmallMine);
            } else if (props.mineType === mineType_s_1.MineType.MidMine) {
                mineImgUrl = props.selected ? mineImgUrl + "mid_mine_active.png" : mineImgUrl + "mid_mine.png";
                hpMax = util_1.getMiningMaxHp(mineType_s_1.MineType.MidMine);
            } else {
                mineImgUrl = props.selected ? mineImgUrl + "big_mine_active.png" : mineImgUrl + "big_mine.png";
                hpMax = util_1.getMiningMaxHp(mineType_s_1.MineType.BigMine);
            }
            var hoeImgUrl = '../../res/image/';
            if (props.selectedHoe === hoeType_s_1.HoeType.IronHoe) {
                hoeImgUrl = hoeImgUrl + "iron_hoe.png";
            } else if (props.selectedHoe === hoeType_s_1.HoeType.GoldHoe) {
                hoeImgUrl = hoeImgUrl + "gold_hoe.png";
            } else {
                hoeImgUrl = hoeImgUrl + "diamond_hoe.png";
            }
            this.props = Object.assign({}, props, { hpMax: hpMax,
                mineImgUrl: mineImgUrl,
                hoeImgUrl: hoeImgUrl });
            _get(Mine.prototype.__proto__ || Object.getPrototypeOf(Mine.prototype), "setProps", this).call(this, this.props, oldProps);
        }
    }, {
        key: "mineClick",
        value: function mineClick(event) {
            var _this2 = this;

            // console.log(this.props);
            this.$imgContainer = this.$imgContainer || painter_1.getRealNode(event.node.children[0]);
            this.$imgContainer.className = '';
            requestAnimationFrame(function () {
                _this2.$imgContainer.className = "mine-animated";
            });
            if (!this.props.selected || this.props.hp <= 0 || !this.props.beginMining) {
                event_1.notify(event.node, 'ev-mine-click', { itype: this.props.mineType, mineId: this.props.mineId });
                return;
            }
            this.$hoe = painter_1.getRealNode(event.node.children[2]);
            this.$hoe.className = '';
            requestAnimationFrame(function () {
                _this2.$hoe.className = "animated-hoeMining";
            });
            this.$parent = this.$parent || painter_1.getRealNode(event.node);
            var $rock = document.createElement('div');
            $rock.setAttribute('class', 'rock');
            var left = Math.random() * 200;
            var style = "position:absolute;font-size:38px;left:" + left + "px";
            $rock.setAttribute('style', style);
            // tslint:disable-next-line:no-inner-html
            $rock.innerHTML = "" + this.props.lossHp;
            this.$parent.appendChild($rock);
            var v0 = Math.random() * 500 + 300; // 初始加速度 300 --- 800
            var deg = Math.random() * 120 + 30; //  初始速度方向  30 --- 150
            var rad = deg / 360 * 2 * Math.PI; // 弧度
            var g = Math.random() * 500 + 500; // 重力加速度  500 --- 1000
            var duration = Math.floor(Math.random() * 500 + 1500); // 动画持续时间  1500 --- 2000 ms
            this.domMove($rock, v0, rad, g, duration, new Date().getTime());
            event_1.notify(event.node, 'ev-mine-click', { itype: this.props.mineType, mineId: this.props.mineId });
        }
        /**
         * 斜抛运动轨迹
         * @param $childDom 运动的dom
         * @param v0  初始加速度
         * @param rad 弧度
         * @param g 重力加速度
         * @param tStart 开始时间
         */

    }, {
        key: "domMove",
        value: function domMove($childDom, v0, rad, g, duration, tStart) {
            var _this3 = this;

            var tEnd = new Date().getTime();
            var interval = tEnd - tStart;
            var t = interval / 1000;
            var x = v0 * t * Math.cos(rad);
            var y = v0 * t * Math.sin(rad) - g * t * t / 2;
            $childDom.style.transform = "translate(" + x + "px," + -y + "px)";
            if (interval < duration) {
                requestAnimationFrame(function () {
                    _this3.domMove($childDom, v0, rad, g, duration, tStart);
                });
            } else {
                this.$parent.removeChild($childDom);
            }
        }
    }]);

    return Mine;
}(widget_1.Widget);

exports.Mine = Mine;
})