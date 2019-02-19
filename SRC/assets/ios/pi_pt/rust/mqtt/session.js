_$define("pi_pt/rust/mqtt/session", function (require, exports, module){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
//use std::sync::Arc;
//use std::mem::transmute;
var vm_1 = require("../../vm/vm");
var nobject_1 = require("../../vm/nobject");
var sinfo_1 = require("../../../pi/struct/sinfo");

var Session = function (_nobject_1$NObject) {
    _inherits(Session, _nobject_1$NObject);

    function Session() {
        _classCallCheck(this, Session);

        //回应消息
        /**
         * @param self
         * @param _topic:Atom
         * @param msg:Vec<u8>
         */
        var _this = _possibleConstructorReturn(this, (Session.__proto__ || Object.getPrototypeOf(Session)).apply(this, arguments));

        _this.respond = function (_topic, msg) {
            _topic = _topic.self;
            msg = msg.self;
            vm_1.call(3560614167, [_this.self, _topic, msg]);
        };
        return _this;
    }

    return Session;
}(nobject_1.NObject);

Session._$info = new sinfo_1.StructInfo("pi_pt/rust/mqtt/session.Session", 107216069, new Map(), []);
exports.Session = Session;
})