_$define("chat/client/app/net/upload", function (require, exports, module){
"use strict";

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../../../../app/config");
var resize_1 = require("../../../../pi/widget/resize/resize");
/**
 * uploadFile to server
 * @param file file
 */
exports.uploadFile = function (file, successCb, faileCb) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var formData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        formData = new FormData();

                        formData.append('upload', file);
                        fetch(config_1.uploadFileUrl + "?$forceServer=1", {
                            body: formData,
                            method: 'POST',
                            mode: 'cors' // no-cors, cors, *same-origin
                        }).then(function (response) {
                            return response.json();
                        }).then(function (res) {
                            console.log('uploadFile success ', res);
                            if (res.result === 1) {
                                successCb && successCb(res.sid);
                            }
                        }).catch(function (err) {
                            console.log('uploadFile fail ', err);
                            faileCb && faileCb(err);
                        });

                    case 3:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
/**
 * arrayBuffer转file格式
 */
exports.arrayBuffer2File = function (buffer) {
    var u8Arr = new Uint8Array(buffer);
    var blob = new Blob([u8Arr], { type: 'image/jpeg' });
    var newFile = new File([blob], 'avatar.jpeg', { type: blob.type });
    console.log('arrayBuffer2File = ', newFile);
    return newFile;
};
/**
 * arrayBuffer图片压缩
 * @param buffer 图片arraybuffer
 */
exports.imgResize = function (buffer, callback) {
    var wid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;

    var file = exports.arrayBuffer2File(buffer);
    var fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = function () {
        var dataUrl = fr.result.toString();
        resize_1.resize({ url: dataUrl, width: wid, ratio: 0.3, type: 'jpeg' }, function (res) {
            console.log('resize---------', res);
            callback(res);
        });
    };
};
})