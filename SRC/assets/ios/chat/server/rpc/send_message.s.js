_$define("chat/server/rpc/send_message.s", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var struct_mgr_1 = require("../../../pi/struct/struct_mgr");
var sinfo_1 = require("../../../pi/struct/sinfo");

var sendMessage = function (_struct_mgr_1$Struct) {
    _inherits(sendMessage, _struct_mgr_1$Struct);

    function sendMessage() {
        _classCallCheck(this, sendMessage);

        return _possibleConstructorReturn(this, (sendMessage.__proto__ || Object.getPrototypeOf(sendMessage)).apply(this, arguments));
    }

    _createClass(sendMessage, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.src = bb.readUtf8();
            this.dst = bb.readUtf8();
            this.msgType = bb.readInt();
            this.msgId = bb.readInt();
            this.payload = bb.readUtf8();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeUtf8(this.src);
            bb.writeUtf8(this.dst);
            bb.writeInt(this.msgType);
            bb.writeInt(this.msgId);
            bb.writeUtf8(this.payload);
        }
    }]);

    return sendMessage;
}(struct_mgr_1.Struct);

sendMessage._$info = new sinfo_1.StructInfo("chat/server/rpc/send_message.sendMessage", 2703175991, null, [new sinfo_1.FieldInfo("src", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("dst", new sinfo_1.EnumType(sinfo_1.Type.Str), null), new sinfo_1.FieldInfo("msgType", new sinfo_1.EnumType(sinfo_1.Type.U8), null), new sinfo_1.FieldInfo("msgId", new sinfo_1.EnumType(sinfo_1.Type.Usize), null), new sinfo_1.FieldInfo("payload", new sinfo_1.EnumType(sinfo_1.Type.Str), null)]);
exports.sendMessage = sendMessage;

var messageReceivedAck = function (_struct_mgr_1$Struct2) {
    _inherits(messageReceivedAck, _struct_mgr_1$Struct2);

    function messageReceivedAck() {
        _classCallCheck(this, messageReceivedAck);

        return _possibleConstructorReturn(this, (messageReceivedAck.__proto__ || Object.getPrototypeOf(messageReceivedAck)).apply(this, arguments));
    }

    _createClass(messageReceivedAck, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.ack = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBool(this.ack);
        }
    }]);

    return messageReceivedAck;
}(struct_mgr_1.Struct);

messageReceivedAck._$info = new sinfo_1.StructInfo("chat/server/rpc/send_message.messageReceivedAck", 3720604776, null, [new sinfo_1.FieldInfo("ack", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.messageReceivedAck = messageReceivedAck;

var messageDeliveredAck = function (_struct_mgr_1$Struct3) {
    _inherits(messageDeliveredAck, _struct_mgr_1$Struct3);

    function messageDeliveredAck() {
        _classCallCheck(this, messageDeliveredAck);

        return _possibleConstructorReturn(this, (messageDeliveredAck.__proto__ || Object.getPrototypeOf(messageDeliveredAck)).apply(this, arguments));
    }

    _createClass(messageDeliveredAck, [{
        key: "bonDecode",
        value: function bonDecode(bb) {
            this.ack = bb.readBool();
        }
    }, {
        key: "bonEncode",
        value: function bonEncode(bb) {
            bb.writeBool(this.ack);
        }
    }]);

    return messageDeliveredAck;
}(struct_mgr_1.Struct);

messageDeliveredAck._$info = new sinfo_1.StructInfo("chat/server/rpc/send_message.messageDeliveredAck", 55659149, null, [new sinfo_1.FieldInfo("ack", new sinfo_1.EnumType(sinfo_1.Type.Bool), null)]);
exports.messageDeliveredAck = messageDeliveredAck;
})