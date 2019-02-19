_$define("pi_pt/rust/pi_vm/pi_vm_impl", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");
/*
* 虚拟机工厂
*/

var VMFactory = function (_nobject_1$NObject) {
    _inherits(VMFactory, _nobject_1$NObject);

    function VMFactory() {
        _classCallCheck(this, VMFactory);

        //为指定虚拟机工厂增加代码，必须使用所有权，以保证运行时不会不安全的增加代码，复制对象将无法增加代码
        /**
         * @param self
         * @param code:Arc<Vec<u8>>
         * @return
         */
        var _this = _possibleConstructorReturn(this, (VMFactory.__proto__ || Object.getPrototypeOf(VMFactory)).apply(this, arguments));

        _this.append = function (code) {
            code = code.self;
            var result = vm_1.call(1487978276, [_this.self, code]);
            result = new VMFactory(result);
            return result;
        };
        return _this;
    }

    return VMFactory;
}(nobject_1.NObject);

VMFactory._$info = new sinfo_1.StructInfo("pi_pt/rust/pi_vm/pi_vm_impl.VMFactory", 1373771230, new Map(), []);
//构建一个虚拟机工厂
/**
 * @param size:usize
 * @param auth:Arc<NativeObjsAuth>
 * @return
 */
VMFactory.new = function (size, auth) {
    auth = auth.self;
    var result = vm_1.call(2222376158, [size, auth]);
    result = new VMFactory(result);
    return result;
};
exports.VMFactory = VMFactory;
})