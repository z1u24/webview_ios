_$define("pi_pt/rust/pi_db/db", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");

var TabMeta = function (_nobject_1$NObject) {
  _inherits(TabMeta, _nobject_1$NObject);

  function TabMeta() {
    _classCallCheck(this, TabMeta);

    return _possibleConstructorReturn(this, (TabMeta.__proto__ || Object.getPrototypeOf(TabMeta)).apply(this, arguments));
  }

  return TabMeta;
}(nobject_1.NObject);

TabMeta._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_db/db.TabMeta", 4196139072, new Map(), []);
exports.TabMeta = TabMeta;
/**
 * 表键值条目
 * @example
 */

var TabKV = function (_nobject_1$NObject2) {
  _inherits(TabKV, _nobject_1$NObject2);

  function TabKV() {
    _classCallCheck(this, TabKV);

    return _possibleConstructorReturn(this, (TabKV.__proto__ || Object.getPrototypeOf(TabKV)).apply(this, arguments));
  }

  return TabKV;
}(nobject_1.NObject);

TabKV._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_db/db.TabKV", 4288403449, new Map(), []);
exports.TabKV = TabKV;
})