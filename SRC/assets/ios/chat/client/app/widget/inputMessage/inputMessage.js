_$define("chat/client/app/widget/inputMessage/inputMessage", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * inputMessage 组件相关处理
 */
// ===========================导入
var root_1 = require("../../../../../pi/ui/root");
var base64_1 = require("../../../../../pi/util/base64");
var event_1 = require("../../../../../pi/widget/event");
var painter_1 = require("../../../../../pi/widget/painter");
var widget_1 = require("../../../../../pi/widget/widget");
var message_s_1 = require("../../../../server/data/db/message.s");
var native_1 = require("../../logic/native");
var upload_1 = require("../../net/upload");
// ===========================导出

var InputMessage = function (_widget_1$Widget) {
    _inherits(InputMessage, _widget_1$Widget);

    function InputMessage() {
        _classCallCheck(this, InputMessage);

        var _this = _possibleConstructorReturn(this, (InputMessage.__proto__ || Object.getPrototypeOf(InputMessage)).apply(this, arguments));

        _this.props = {
            message: '',
            isOnEmoji: false,
            isOnTools: false,
            isOnRadio: false,
            toolList: []
        };
        return _this;
    }

    _createClass(InputMessage, [{
        key: "setProps",
        value: function setProps(props) {
            _get(InputMessage.prototype.__proto__ || Object.getPrototypeOf(InputMessage.prototype), "setProps", this).call(this, props);
            this.props.toolList = [{ name: '拍摄', img: 'tool-camera.png' }, { name: '相册', img: 'tool-pictures.png'
                // { name:'红包',img:'tool-redEnv.png' }
            }];
        }
        // 麦克风输入处理

    }, {
        key: "radioStart",
        value: function radioStart(e) {
            var _this2 = this;

            console.log('点击开始录音');
            this.props.isOnRadio = true;
            this.radioTime = Date.now();
            this.paint();
            native_1.startRadio();
            // 超过60秒自动停止录音
            setTimeout(function () {
                _this2.radioEnd(e);
            }, 60000);
        }
        // 语音录入完成

    }, {
        key: "radioEnd",
        value: function radioEnd(e) {
            var _this3 = this;

            console.log('释放结束录音');
            this.props.isOnRadio = false;
            this.paint();
            native_1.endRadio(function (buffer) {
                upload_1.uploadFile(upload_1.arrayBuffer2File(buffer), function (radioUrl) {
                    console.log('录制的音频', radioUrl);
                    var res = {
                        message: radioUrl,
                        time: Math.ceil((Date.now() - _this3.radioTime) / 1000)
                    };
                    event_1.notify(e.node, 'ev-send', { value: JSON.stringify(res), msgType: message_s_1.MSG_TYPE.VOICE });
                });
            });
        }
        // 打开表情包图库

    }, {
        key: "playEmoji",
        value: function playEmoji(e) {
            painter_1.getRealNode(this.tree).getElementsByTagName('textarea')[0].blur();
            document.getElementById('emojiMap').style.height = root_1.getKeyBoardHeight() + "px";
            event_1.notify(e.node, 'ev-open-Emoji', {});
        }
        // 打开更多功能

    }, {
        key: "openTool",
        value: function openTool(e) {
            painter_1.getRealNode(this.tree).getElementsByTagName('textarea')[0].blur();
            document.getElementById('toolsMap').style.height = root_1.getKeyBoardHeight() + "px";
            event_1.notify(e.node, 'ev-open-Tools', {});
            // this.sendImg(e);
        }
        // 点击发送

    }, {
        key: "send",
        value: function send(e) {
            if (this.props.message !== '') {
                // 有输入才触发发送事件处理
                event_1.notify(e.node, 'ev-send', { value: this.props.message, msgType: message_s_1.MSG_TYPE.TXT });
            }
            this.props.message = '';
            this.paint();
        }
        // 选择功能

    }, {
        key: "pickTool",
        value: function pickTool(e, i) {
            switch (i) {
                case 0:
                    exports.sendPicture(e);
                    break;
                case 1:
                    exports.sendImage(e);
                    break;
                case 2:
                    exports.sendRedEnv(e);
                    break;
                default:
            }
            event_1.notify(e.node, 'ev-open-Tools', {});
        }
    }]);

    return InputMessage;
}(widget_1.Widget);

exports.InputMessage = InputMessage;
/**
 * 选择相册
 */
exports.sendImage = function (e) {
    var imagePicker = native_1.selectImage(function (w, h, url) {
        event_1.notify(e.node, 'ev-send-before', { value: "<img src=\"" + url + "\" alt=\"img\" class='imgMsg'></img>", msgType: message_s_1.MSG_TYPE.IMG });
        imagePicker.getContent({
            success: function success(buffer) {
                upload_1.imgResize(buffer, function (res) {
                    upload_1.uploadFile(upload_1.arrayBuffer2File(res.ab), function (imgUrlSuf) {
                        console.log('选择的照片', imgUrlSuf);
                        event_1.notify(e.node, 'ev-send', { value: "[" + imgUrlSuf + "]", msgType: message_s_1.MSG_TYPE.IMG });
                    });
                }, 600);
            }
        });
    });
};
/**
 * 拍摄照片
 */
exports.sendPicture = function (e) {
    native_1.openCamera(function (buffer) {
        event_1.notify(e.node, 'ev-send-before', { value: "<img src=\"data:image/jpeg;base64," + base64_1.arrayBufferToBase64(buffer) + "\" alt=\"img\" class='imgMsg'></img>", msgType: message_s_1.MSG_TYPE.IMG });
        upload_1.imgResize(buffer, function (res) {
            upload_1.uploadFile(upload_1.arrayBuffer2File(res.ab), function (imgUrlSuf) {
                console.log('拍摄的照片', imgUrlSuf);
                event_1.notify(e.node, 'ev-send', { value: "[" + imgUrlSuf + "]", msgType: message_s_1.MSG_TYPE.IMG });
            });
        }, 600);
    });
};
// 发送红包
exports.sendRedEnv = function (e) {
    root_1.popNew('app-view-earn-redEnvelope-writeRedEnv', { inFlag: 'chat' }, function (res) {
        /**
         * res:{message,rid} 留言，红包ID
         */
        if (res && res.rid) {
            event_1.notify(e.node, 'ev-send', { value: JSON.stringify(res), msgType: message_s_1.MSG_TYPE.REDENVELOPE });
        }
    });
};
})