_$define("pi/browser/android", function (require, exports, module){
"use strict";
/**
 * 音乐分享：必须有imageUrl(缩略图, 有的平台，无缩略图无法分享)
 * 			必须有title
 * 			必须有musicUrl(音乐的url)
 * 			可以有text(描述)
 * 			可以有url(点击跳转的url，qq分享有用)
 *
 * 图片分享：必须有imageUrl(分享的图片)
 *
 * 文字分享：必须有text(文本内容)
 * 			可以有title(标题，仅在qq中起作用，且qq分享必须含有title)
 * 			可以有url(点击跳转，仅在qq中起作用，且qq分享必须含有url)
 *
 * url分享：必须有url
 * 			必须有imageUrl(缩略图)
 * 			可以有text(标题，仅在qq和微博中起作用，且qq分享必须含有text)
 * 			可以有title(标题，仅在qq和微博中起作用，且qq分享必须含有title)
 *
 * 视频分享：未测试
 *
 */

Object.defineProperty(exports, "__esModule", { value: true });
exports.loginType = ['weixin', 'zhifubao', 'xiaomi'];
var ShareType;
(function (ShareType) {
    ShareType[ShareType["text"] = 0] = "text";
    ShareType[ShareType["image"] = 1] = "image";
    ShareType[ShareType["url"] = 2] = "url";
    ShareType[ShareType["music"] = 3] = "music";
    ShareType[ShareType["video"] = 4] = "video";
})(ShareType = exports.ShareType || (exports.ShareType = {}));
exports.SHARE_TYPE = 'shareType';
exports.SHARE_TEXT = 'text';
exports.SHARE_TITLE = 'title';
exports.SHARE_IMAGE_URL = 'imageUrl';
exports.SHARE_IMAGE_BYTE = 'imageByte';
exports.SHARE_URL = 'url';
exports.SHARE_VIDEO_URL = 'videoUrl';
exports.SHARE_MUSIC_URL = 'musicUrl';
var qqAppId = '101403709'; // qq appId
var wxAppId = 'wx2c75307e997deb3b'; // 微信appId
var wbAppId = '1725019549'; // 微博appId
exports.register = function () {
    self.YNWeiXin.register(wxAppId);
    self.YNWeiBo.register(wbAppId);
    self.YNTencent.register(qqAppId);
};
/**
 * @description 微信登录
 */
exports.loginWX = function () {
    var scope = 'snsapi_userinfo';
    var state = '111111';
    self.YNWeiXin.login(scope, state);
};
/**
 * @description 微信支付
 */
exports.WXPay = function () {
    self.YNWeiXin.pay();
};
/**
 * @description 分享给朋友
 */
exports.shareToFriend = function (info) {
    var data = {};
    initShareData(info, data, function () {
        self.YNWeiXin.shareToFriend(JSON.stringify(data));
    });
};
/**
 * @description 分享到朋友圈
 */
exports.shareToLine = function (info) {
    var data = {};
    initShareData(info, data, function () {
        self.YNWeiXin.shareToLine(JSON.stringify(data));
    });
};
/**
 * @description QQ登录
 */
exports.loginQQ = function () {
    self.YNTencent.login();
};
/**
 * @description 分享到qq
 */
exports.shareToQQ = function (info) {
    var data = {};
    initShareData(info, data, function () {
        self.YNTencent.share(JSON.stringify(data));
    });
};
/**
 * @description 微博登录
 */
exports.loginWB = function () {
    self.YNWeiBo.login();
};
/**
 * @description 分享到微博
 */
exports.shareToWB = function (info) {
    var data = {};
    initShareData(info, data, function () {
        self.YNWeiBo.share(JSON.stringify(data));
    });
};
/**
 * @description 支付宝支付
 */
exports.payZhiFuBao = function () {
    self.YNZhiFuBao.pay('');
};
var initShareData = function initShareData(info, result, callBack) {
    result.text = info.text ? info.text : '';
    result.title = info.title ? info.title : '';
    result.imageByte = info.imageByte ? info.imageByte : '';
    result.url = info.url ? info.url : '';
    result.videoUrl = info.videoUrl ? info.videoUrl : '';
    result.musicUrl = info.musicUrl ? info.musicUrl : '';
    result.imageUrl = '';
    result.shareType = info.shareType;
    if (!info.imageByte && info.imageUrl) {
        generateImg(info.imageUrl, function (img) {
            result.imageByte = getBase64Image(img);
            callBack();
        });
    } else {
        callBack();
    }
    return result;
};
var generateImg = function generateImg(imageUrl, callBack) {
    var img = new Image();
    img.decoding = "async";
    img.onload = function () {
        callBack(img);
    };
    img.src = imageUrl;
};
var getBase64Image = function getBase64Image(img) {
    // 创建一个空的canvas元素
    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    // Copy the image contents to the canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
};
})