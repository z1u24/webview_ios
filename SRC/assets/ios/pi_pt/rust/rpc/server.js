_$define("pi_pt/rust/rpc/server", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");

var RPCServer = function (_nobject_1$NObject) {
    _inherits(RPCServer, _nobject_1$NObject);

    function RPCServer() {
        _classCallCheck(this, RPCServer);

        return _possibleConstructorReturn(this, (RPCServer.__proto__ || Object.getPrototypeOf(RPCServer)).apply(this, arguments));
    }

    return RPCServer;
}(nobject_1.NObject);

RPCServer._$info = new sinfo_1.StructInfo("pi_pt/rust/rpc/server.RPCServer", 3418977212, new Map(), []);
/**
 * @param mqtt:ServerNode
 * @return
 */
RPCServer.new = function (mqtt) {
    mqtt = mqtt.self;
    var result = vm_1.call(193751450, [mqtt]);
    result = new RPCServer(result);
    return result;
};
exports.RPCServer = RPCServer;
})