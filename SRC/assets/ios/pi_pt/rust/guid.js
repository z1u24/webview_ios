_$define("pi_pt/rust/guid", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../vm/vm");
var nobject_1 = require("../vm/nobject");
var sinfo_1 = require("../../pi/struct/sinfo");
var util_1 = require("../../pi/bigint/util");
// Guid生成器

var GuidGen = function (_nobject_1$NObject) {
  _inherits(GuidGen, _nobject_1$NObject);

  function GuidGen() {
    _classCallCheck(this, GuidGen);

    return _possibleConstructorReturn(this, (GuidGen.__proto__ || Object.getPrototypeOf(GuidGen)).apply(this, arguments));
  }

  return GuidGen;
}(nobject_1.NObject);

GuidGen._$info = new sinfo_1.StructInfo("pi_pt/rust/guid/.GuidGen", 3694327039, new Map(), []);
/**
 * @param node_time:u64
 * @param node_id:u16
 * @return
 */
GuidGen.new = function (node_time, node_id) {
  node_time = util_1.u64ToBuffer(node_time);
  var result = vm_1.call(596751388, [node_time, node_id]);
  result = new GuidGen(result);
  return result;
};
exports.GuidGen = GuidGen;
})