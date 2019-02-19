_$define("pi_pt/async/util", function (require, exports, module){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bon_1 = require("../../pi/util/bon");
var nobject_1 = require("../vm/nobject");
var util_1 = require("../../pi/struct/util");
var meta_init_1 = require("../../pi/struct/meta_init");
var vm_1 = require("../vm/vm");
var mgr_1 = require("../rust/pi_db/mgr");
//写入一个数组
exports.writeArray = function (o, bb, nobjs) {
    var i = 0;
    if (!o) {
        bb.writeNil();
    } else {
        bb.writeCt(o, function () {
            bb.writeU32(3); //数组类型
            bb.writeArray(o, function (el) {
                //写NativeObject
                var r = exports.writeany(bb, el, i);
                if (r) {
                    nobjs.push(r.self);
                    i++;
                }
            });
        });
    }
};
//读一个数组， 只有在确信bb中的下一个元素是数组或null是使用
exports.readArray = function (bb, nobjs) {
    var t = bb.getType();
    if (t === 0) {
        return null;
    }
    bb.readCt(function (bb, t) {
        return bb.readArray(function () {
            return exports.readany(bb, nobjs);
        });
    });
};
exports.writeany = function (bb, el, index) {
    if (el instanceof nobject_1.NObject) {
        bb.writeU8(255); //nativeObject类型是255
        bb.writeU32(el.constructor._$info.name_hash); //写hash
        bb.writeInt(index); //写index
        return el;
    } else {
        util_1.write(el, bb); //写其他类型
    }
};
exports.readany = function (bb, nobjs) {
    var t = bb.getType();
    if (t === 255) {
        bb.readU8();
        var t_hash = bb.readU32();
        var index = bb.readInt();
        var meta = meta_init_1.mgr.lookup(t_hash);
        return new meta.construct(nobjs[index]);
    } else {
        var a = util_1.read(bb, meta_init_1.mgr);
        return a;
    }
};
//根据参数个数不同， 使用不同的调用方式
var fnMap = {
    0: function _(f, _args) {
        return f();
    },
    1: function _(f, args) {
        return f(args[0]);
    },
    2: function _(f, args) {
        return f(args[0], args[1]);
    },
    3: function _(f, args) {
        return f(args[0], args[1], args[2]);
    },
    4: function _(f, args) {
        return f(args[0], args[1], args[2], args[3]);
    },
    5: function _(f, args) {
        return f(args[0], args[1], args[2], args[3], args[4]);
    },
    6: function _(f, args) {
        return f(args[0], args[1], args[2], args[3], args[4], args[5]);
    },
    7: function _(f, args) {
        return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    },
    8: function _(f, args) {
        return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
    },
    9: function _(f, args) {
        return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
    },
    10: function _(f, args) {
        return f(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
    }
};
var request = function request(path, args, nobjs, callbackIndex, mgr, vmChannel) {
    self._$db_mgr = new mgr_1.Mgr(mgr); //将mgr定义到全局域上
    //解析接口路径
    var index = path.lastIndexOf(".");
    var mod = path.slice(0, index) + ".r";
    var funName = path.slice(index + 1, path.length);
    //参数解析
    var arr = exports.readArray(new bon_1.BonBuffer(args), nobjs);
    //调用函数
    var r = fnMap[arr ? arr.length : 0](pi_modules[mod].exports[funName], arr);
    //返回值序列化
    var bbr = new bon_1.BonBuffer();
    var nobj = exports.writeany(bbr, r, 0);
    //回应请求
    vm_1.NativeObject.call(2, [vmChannel, bbr.getBuffer(), [nobj], callbackIndex]);
};
self._$async = request; //将异步调用请求接收接口定义到全局上， 供底层调用
})