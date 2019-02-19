_$define("app/view/mine/other/aboutus", function (require, exports, module){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var root_1 = require("../../../../pi/ui/root");
var lang_1 = require("../../../../pi/util/lang");
var widget_1 = require("../../../../pi/widget/widget");
var modulConfig_1 = require("../../../modulConfig");
var tools_1 = require("../../../utils/tools");

var Aboutus = function (_widget_1$Widget) {
    _inherits(Aboutus, _widget_1$Widget);

    function Aboutus() {
        _classCallCheck(this, Aboutus);

        return _possibleConstructorReturn(this, (Aboutus.__proto__ || Object.getPrototypeOf(Aboutus)).apply(this, arguments));
    }

    _createClass(Aboutus, [{
        key: "create",
        value: function create() {
            _get(Aboutus.prototype.__proto__ || Object.getPrototypeOf(Aboutus.prototype), "create", this).call(this);
            this.language = this.config.value[lang_1.getLang()];
            this.props = {
                version: tools_1.getLocalVersion(),
                data: [{ value: this.language.itemTitle[0], components: 'app-view-mine-other-privacypolicy' }, { value: this.language.itemTitle[1], components: '' }, { value: this.language.itemTitle[2], components: '' }],
                walletLogo: modulConfig_1.getModulConfig('WALLET_LOGO'),
                walletName: modulConfig_1.getModulConfig('WALLET_NAME')
            };
        }
    }, {
        key: "itemClick",
        value: function itemClick(e, index) {
            if (index === 0 && this.props.data[index].components !== '') {
                root_1.popNew(this.props.data[index].components);
            } else if (index === 1) {
                // 版本更新
                h5CheckUpdate();
            } else {
                // TODO 分享下载
                // popNew('app-components-share-share', { 
                //     shareType: ShareToPlatforms.TYPE_LINK,
                //     url: shareDownload,
                //     title:`${this.props.walletName}钱包`,
                //     content:`我正在使用${this.props.walletName}，邀您一起来使用！` 
                // });
                // console.error(shareDownload);
                root_1.popNew('app-view-mine-other-shareDownload');
            }
        }
    }, {
        key: "backPrePage",
        value: function backPrePage() {
            this.ok && this.ok();
        }
    }]);

    return Aboutus;
}(widget_1.Widget);

exports.Aboutus = Aboutus;
var h5CheckUpdate = function h5CheckUpdate() {
    var h5UpdateMod = pi_modules.update.exports;
    var appUpdateMod = pi_modules.appUpdate.exports;
    // needUpdateCode 0 1 2 3 
    h5UpdateMod.checkUpdate(function (needUpdateCode) {
        // 判断当前app版本是否大于等于依赖的版本号
        var appLocalVersion = appUpdateMod.getAppLocalVersion();
        var canUpdate = false;
        if (appLocalVersion) {
            var dependAppVersionArr = h5UpdateMod.getDependAppVersion().split('.');
            var appLocalVersionArr = appUpdateMod.getAppLocalVersion().split('.');
            for (var i = 0; i < dependAppVersionArr.length; i++) {
                if (i === dependAppVersionArr.length - 1) {
                    canUpdate = appLocalVersionArr[i] >= dependAppVersionArr[i];
                    break;
                }
                if (appLocalVersionArr[i] < dependAppVersionArr[i]) {
                    canUpdate = false;
                    break;
                } else if (appLocalVersionArr[i] > dependAppVersionArr[i]) {
                    canUpdate = true;
                    break;
                }
            }
        } else {
            // 还没获取到本地版本号  不更新
            canUpdate = false;
        }
        var remoteVersion = h5UpdateMod.getRemoteVersion();
        var option = {
            updated: h5UpdateMod.getH5Updated(),
            version: remoteVersion.slice(0, remoteVersion.length - 1).join('.')
        };
        // 更新h5
        var updateH5 = function updateH5() {
            // 注：必须堵住原有的界面操作，不允许任何触发操作
            h5UpdateMod.update(function (e) {
                // {type: "saveFile", total: 4, count: 1}
                console.log('update progress: ', e);
                pi_update.updateProgress(e);
            });
        };
        // debugger;
        if (needUpdateCode === 1 && canUpdate) {
            option.alertBtnText = '更新未完成';
            pi_update.alert(option, updateH5);
        } else if (needUpdateCode === 2 && canUpdate) {
            option.alertBtnText = '版本有重大变化';
            pi_update.alert(option, updateH5);
        } else if (needUpdateCode === 3 && canUpdate) {
            pi_update.confirm(option, function (ok) {
                if (ok) {
                    updateH5();
                }
            });
        } else {
            tools_1.popNewMessage('已是最新版本');
        }
    });
};
})