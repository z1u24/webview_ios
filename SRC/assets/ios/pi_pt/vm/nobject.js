_$define("pi_pt/vm/nobject", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../pi/struct/struct_mgr");

var NObject = function (_struct_mgr_1$Struct) {
    _inherits(NObject, _struct_mgr_1$Struct);

    //static __genMeta?:any;//Json
    //__h:number;//类型hash
    function NObject(self) {
        _classCallCheck(this, NObject);

        var _this = _possibleConstructorReturn(this, (NObject.__proto__ || Object.getPrototypeOf(NObject)).call(this));

        _this.self = self;
        //hash && (this.__meta = {hash:hash, gen:gen});
        return _this;
    }

    return NObject;
}(struct_mgr_1.Struct);

exports.NObject = NObject;
})