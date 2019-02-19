_$define("pi_pt/rust/atom", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../vm/vm");
var nobject_1 = require("../vm/nobject");
var sinfo_1 = require("../../pi/struct/sinfo");
// 原子字符串

var Atom = function (_nobject_1$NObject) {
  _inherits(Atom, _nobject_1$NObject);

  function Atom() {
    _classCallCheck(this, Atom);

    return _possibleConstructorReturn(this, (Atom.__proto__ || Object.getPrototypeOf(Atom)).apply(this, arguments));
  }

  return Atom;
}(nobject_1.NObject);

Atom._$info = new sinfo_1.StructInfo("pi_pt/rust/atom/.Atom", 495084715, new Map(), []);
/**
 * @param s:String
 * @return atom::Atom
 */
Atom.fromFrom = function (s) {
  var result = vm_1.call(1574906633, [s]);
  result = new Atom(result);
  return result;
};
exports.Atom = Atom;
})