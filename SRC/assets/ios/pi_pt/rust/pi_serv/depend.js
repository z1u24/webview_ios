_$define("pi_pt/rust/pi_serv/depend", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
//use pi_base::util::now_millisecond;

var Depend = function (_nobject_1$NObject) {
  _inherits(Depend, _nobject_1$NObject);

  function Depend() {
    _classCallCheck(this, Depend);

    return _possibleConstructorReturn(this, (Depend.__proto__ || Object.getPrototypeOf(Depend)).apply(this, arguments));
  }

  return Depend;
}(nobject_1.NObject);

Depend._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_serv/depend.Depend", 1797798710, new Map(), []);
exports.Depend = Depend;
})