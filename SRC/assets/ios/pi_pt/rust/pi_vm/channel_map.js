_$define("pi_pt/rust/pi_vm/channel_map", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
/*
* 虚拟机通道
*/

var VMChannel = function (_nobject_1$NObject) {
  _inherits(VMChannel, _nobject_1$NObject);

  function VMChannel() {
    _classCallCheck(this, VMChannel);

    return _possibleConstructorReturn(this, (VMChannel.__proto__ || Object.getPrototypeOf(VMChannel)).apply(this, arguments));
  }

  return VMChannel;
}(nobject_1.NObject);

VMChannel._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_vm/channel_map.VMChannel", 3552256106, new Map(), []);
exports.VMChannel = VMChannel;
})