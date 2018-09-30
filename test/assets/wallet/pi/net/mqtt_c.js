_$define("pi/net/mqtt_c", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
/*
* mqtt模块， 用于消息发布和订阅
* mqtt消息协议：
    压缩方式：（0：不压缩， 1：lz4压缩， 2: zstd压缩）-- 占2位
    是否差异比较：（0：否， 1：是）-- 占1位
    版本号：-- 占5位，------------------------以上总共1字节
    原始数据大小：仅在发布数据为压缩数据时需要，  类型为PInt, PInt类型参考./util/bon.ts
    剩余部分：消息内容
*/
var mqtt_1 = require("./mqtt");
var lz4 = require("../util/lz4");
var rsync_1 = require("../util/rsync");
var bon_1 = require("../util/bon");
/**
 * mqtt客户端
 * @example
 */

var Client = function () {
    function Client(host, port, clientId, compressTap, option) {
        _classCallCheck(this, Client);

        this.lastMsg = new Map(); //需要使用差异比较进行数据同步的主题，每次发布时，应该保存最后发布的数据
        //可以为主题设置0个或多个tag，其中"compressMode"，"isRsync"为内置tag，用于配置主题数据的压缩模式，是否使用差异比较进行数据同步
        this.tags = new Map();
        this.listeners = [];
        var c = new mqtt_1.MqttClient(host, port, clientId);
        var scope = this;
        var onmessage = function onmessage(message) {
            scope.onMessageArrived(message);
        };
        c.onMessageArrived = onmessage;
        option = option ? option : {};
        c.connect(option);
        this.mc = c;
        this.rsync = new rsync_1.RSync(32);
        this.compressTap = compressTap || 64;
    }
    //设置tag


    _createClass(Client, [{
        key: "setTag",
        value: function setTag(topic, key, value) {
            var tag = this.tags.get(topic);
            if (!tag) {
                tag = new Map();
                this.tags.set(topic, tag);
            }
            tag.set(key, value);
        }
        //设置压缩阀值

    }, {
        key: "setCompressTap",
        value: function setCompressTap(value) {
            this.compressTap = value;
        }
        /**
         * @description 发布消息
         */

    }, {
        key: "publish",
        value: function publish(topic, message) {
            var qos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
            var retained = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            var messageHeadBb = new bon_1.BonBuffer();
            var tag = this.tags.get(topic),
                isRsync = void 0,
                compressMode = void 0,
                originalSize = void 0;
            if (tag) {
                isRsync = tag.get("isRsync");
                compressMode = tag.get("compressMode");
            } else {
                isRsync = 0; //默认不进行差异比较
                compressMode = 1; //默认lz4压缩
            }
            //如果需要进行差异比较，将发布数据改为差异数据
            // if(isRsync){
            // 	let last = this.lastMsg.get(topic);
            // 	this.lastMsg.set(topic, message);
            // 	if(!last){
            // 		isRsync = 0;
            // 	}else{
            // 		let bb1 = new BonBuffer()
            // 		encodeDiffs(this.rsync.diff(message, this.rsync.checksum(last)), bb1);
            // 		message = bb1.getBuffer();
            // 	}	
            // }
            // //如果数据大于压缩阀值，对其进行压缩 
            // if(message.length > this.compressTap){
            // 	originalSize = message.length;
            // 	if(compressMode === CompressMode.LZ4){
            // 		message = lz4.compress(message);
            // 	}else if(compressMode === CompressMode.ZSTD){
            // 		//todo
            // 	}else if(compressMode === CompressMode.NONE){
            // 		compressMode = 0;
            // 	}else{
            // 		throw "压缩方式不支持， mode：" + compressMode;
            // 	}	
            // }else{
            compressMode = 0;
            //}
            var first = (isRsync << 2) + compressMode;
            messageHeadBb.writeU8(first);
            originalSize && messageHeadBb.writePInt(originalSize);
            var messageHead = messageHeadBb.getBuffer();
            var u8 = new Uint8Array(messageHead.length + message.length);
            u8.set(messageHead);
            u8.set(message, messageHead.length);
            this.mc.publish(topic, u8, qos, retained);
        }
        /**
         * @description 订阅消息
         */

    }, {
        key: "subscribe",
        value: function subscribe(filter, subscribeOptions) {
            if (!subscribeOptions) {
                subscribeOptions = { qos: 0 };
            } else if (!subscribeOptions.qos) {
                subscribeOptions.qos = 0;
            }
            this.mc.subscribe(filter, subscribeOptions);
        }
        /**
         * @description 退订
         */

    }, {
        key: "unsubscribe",
        value: function unsubscribe(filter, subscribeOptions) {
            this.mc.unsubscribe(filter, subscribeOptions);
        }
        /**
         * @description 关闭连接
         */

    }, {
        key: "disconnect",
        value: function disconnect() {
            this.mc.disconnect();
        }
        /**
         * @description 事件
         */

    }, {
        key: "onMessage",
        value: function onMessage(cb) {
            this.listeners.push(cb);
        }
    }, {
        key: "onMessageArrived",
        value: function onMessageArrived(message) {
            try {
                var payload = message.payloadBytes;
                var c = payload[0] >> 6 & 3; //压缩方式（0：不压缩，1：lz4压缩, 2:zstd压缩）
                var r = payload[0] >> 5 & 1; //是否为差异部分
                payload = new Uint8Array(payload.buffer, payload.byteOffset + 1);
                if (c) {
                    var view = new DataView(payload.buffer.slice(payload.byteOffset, payload.byteOffset + 4));
                    var len = view.getUint32(0, true);
                    payload = new Uint8Array(payload.buffer, payload.byteOffset + 4);
                    if (c === 1) {
                        payload = lz4.decompress(payload, len);
                    } else if (c === 2) {
                        //todo
                    } else {
                        throw "压缩方式不支持，mode：" + c;
                    }
                }
                var topic = message.destinationName;
                for (var i = 0; i < this.listeners.length; i++) {
                    this.listeners[i](topic, payload);
                }
            } catch (error) {
                //mqtt会捕获并消耗掉该异常，并移除websokect的监听函数，导致无法收到后续消息却难以找到找到线索，因此此处将错误信息打印出来
                console.log(error);
                throw error;
            }
        }
    }]);

    return Client;
}();

exports.Client = Client;
//压缩模式
var CompressMode;
(function (CompressMode) {
    CompressMode[CompressMode["NONE"] = 0] = "NONE";
    CompressMode[CompressMode["LZ4"] = 1] = "LZ4";
    CompressMode[CompressMode["ZSTD"] = 2] = "ZSTD";
})(CompressMode || (CompressMode = {}));
})