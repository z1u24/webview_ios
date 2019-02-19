_$define("pi_pt/rust/https/upload", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
/*
* 默认的http文件上传处理器
*/

var FileUpload = function (_nobject_1$NObject) {
  _inherits(FileUpload, _nobject_1$NObject);

  function FileUpload() {
    _classCallCheck(this, FileUpload);

    return _possibleConstructorReturn(this, (FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).apply(this, arguments));
  }

  return FileUpload;
}(nobject_1.NObject);

FileUpload._$info = new sinfo_1.StructInfo("pi_pt/rust/https/upload.FileUpload", 212995252, new Map(), []);
//构建文件上传处理器
/**
 * @param root:P
 * @return
 */
FileUpload.newString = function (root) {
  var result = vm_1.call(170528392, [root]);
  result = new FileUpload(result);
  return result;
};
exports.FileUpload = FileUpload;
})