_$define("earn/client/app/test/compEditor", function (require, exports, module){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var tools_1 = require("../../../../app/utils/tools");
var root_1 = require("../../../../pi/ui/root");
var widget_1 = require("../../../../pi/widget/widget");
var constant_1 = require("../../../server/data/constant");
var guessing_s_1 = require("../../../server/data/db/guessing.s");
var guessingCompetition_p_1 = require("../../../server/rpc/guessingCompetition.p");
var competition_s_1 = require("../../../xlsx/competition.s");
var init_1 = require("../net/init");
var cfgMap_1 = require("../store/cfgMap");
var tools_2 = require("../utils/tools");

var CompEditor = function (_widget_1$Widget) {
    _inherits(CompEditor, _widget_1$Widget);

    function CompEditor() {
        _classCallCheck(this, CompEditor);

        var _this = _possibleConstructorReturn(this, (CompEditor.__proto__ || Object.getPrototypeOf(CompEditor)).apply(this, arguments));

        _this.props = {
            compList: [],
            teamList: exports.getTeamCfg1(),
            compInfoList: exports.getCompCfg(),
            cid: 0,
            team1: exports.getTeamCfg1()[0].teamName,
            team2: exports.getTeamCfg1()[0].teamName,
            matchType: exports.getCompCfg()[0].pid,
            time: '',
            team1Num: 0,
            team2Num: 0,
            result: 0,
            compIndex: 0
        };
        return _this;
    }

    _createClass(CompEditor, [{
        key: "create",
        value: function create() {
            _get(CompEditor.prototype.__proto__ || Object.getPrototypeOf(CompEditor.prototype), "create", this).call(this);
            this.initData();
        }
    }, {
        key: "initData",
        value: function initData() {
            var _this2 = this;

            get_competitions().then(function (res) {
                _this2.props.compList = res;
                _this2.paint();
                console.log('initData in !!!!!!!!!!!!!!!!!!!', _this2.props.compList);
            });
            this.paint();
        }
    }, {
        key: "inputTeam1",
        value: function inputTeam1(event) {
            this.props.team1 = event.currentTarget.value;
        }
    }, {
        key: "inputTeam2",
        value: function inputTeam2(event) {
            this.props.team2 = event.currentTarget.value;
            console.log('inputTeam2!!!!!!', event.currentTarget.value);
        }
    }, {
        key: "inputMatchType",
        value: function inputMatchType(event) {
            this.props.matchType = event.currentTarget.value;
            console.log('inputMatchType!!!!!!', event.currentTarget.value);
        }
    }, {
        key: "inputTime",
        value: function inputTime(event) {
            this.props.time = event.currentTarget.value;
        }
    }, {
        key: "inputTeam1Num",
        value: function inputTeam1Num(event) {
            this.props.team1Num = event.currentTarget.value;
        }
    }, {
        key: "inputTeam2Num",
        value: function inputTeam2Num(event) {
            this.props.team2Num = event.currentTarget.value;
        }
    }, {
        key: "addComp",
        value: function addComp() {
            add_competition(this.props.team1, this.props.team2, this.props.matchType, this.props.time, this.props.team1Num, this.props.team2Num);
            this.initData();
            this.paint();
        }
    }, {
        key: "addResult",
        value: function addResult(e, result, cid) {
            var _this3 = this;

            root_1.popNew('earn-client-app-test-modalBox', {
                title: '注意',
                content: '确认比赛结果'
            }, function () {
                add_result(result, cid);
                _this3.initData();
                _this3.paint();
            });
        }
    }, {
        key: "settleGuessing",
        value: function settleGuessing(e, cid) {
            var _this4 = this;

            root_1.popNew('earn-client-app-test-modalBox', {
                title: '注意',
                content: '是否结算比赛'
            }, function () {
                settle_guessing(cid);
                _this4.initData();
                _this4.paint();
            });
        }
    }, {
        key: "cancelGuessing",
        value: function cancelGuessing(e, cid) {
            var _this5 = this;

            root_1.popNew('earn-client-app-test-modalBox', {
                title: '注意',
                content: '是否取消比赛'
            }, function () {
                cancel_guessing(cid);
                _this5.initData();
                _this5.paint();
            });
        }
    }, {
        key: "compIndex",
        value: function compIndex(event) {
            this.props.compIndex = event.srcElement.selectedIndex;
            this.paint();
        }
    }, {
        key: "uploadAvatar",
        value: function uploadAvatar(event) {
            console.log('res!!!!!', event);
            var file = event.srcElement.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                console.log(reader.result);
                exports.uploadFile(reader.result);
            };
        }
    }]);

    return CompEditor;
}(widget_1.Widget);

exports.CompEditor = CompEditor;
// 获取比赛信息
var get_competitions = function get_competitions() {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(guessingCompetition_p_1.get_main_competitions, null, function (r) {
            console.log(r);
            if (r.reslutCode === constant_1.RESULT_SUCCESS) {
                var compList = JSON.parse(r.msg);
                var resData = [];
                compList.list.forEach(function (element) {
                    var data = {
                        cid: element.comp.cid,
                        team1: exports.getTeamCfg(competition_s_1.LOLTeamInfosCfg._$info.name, element.comp.team1).teamName,
                        team2: exports.getTeamCfg(competition_s_1.LOLTeamInfosCfg._$info.name, element.comp.team2).teamName,
                        time: tools_2.timestampFormat(element.comp.time),
                        result: element.comp.result,
                        state: element.comp.state,
                        team1Num: element.team1num,
                        team2Num: element.team2num
                    };
                    resData.push(data);
                });
                console.log('比赛信息!!!!!!!!：', resData);
                resolve(resData);
            } else {
                reject(r);
            }
        });
    });
};
// 新增比赛
var add_competition = function add_competition(team1Name, team2Name, matchType, time, team1Num, team2Num) {
    return new Promise(function (resolve, reject) {
        var cfgName = competition_s_1.LOLTeamInfosCfg._$info.name;
        if (!time) {
            alert('请输入比赛时间');
            return;
        }
        console.log('比赛类型!!!!!!!!：', matchType);
        var team1 = exports.getTeamCfg(cfgName, null, team1Name).pid;
        var team2 = exports.getTeamCfg(cfgName, null, team2Name).pid;
        console.log('队伍编号!!!!!!!!：', team1);
        if (!team1 || !team2) alert('队伍名不存在');
        var addComp = new guessing_s_1.AddCompetition(team1, team2, time, matchType, team1Num, team2Num);
        console.log('addComp!!!!!!!!!!!!!!', addComp);
        init_1.clientRpcFunc(guessingCompetition_p_1.add_competitions, addComp, function (r) {
            console.log(r);
            if (r.reslutCode === constant_1.RESULT_SUCCESS) {
                alert('添加比赛成功');
                resolve(r);
            } else {
                reject(r);
            }
        });
    });
};
// 添加比赛结果
var add_result = function add_result(winTeam, cid) {
    return new Promise(function (resolve, reject) {
        var compResult = new guessing_s_1.CompResult(cid, winTeam);
        init_1.clientRpcFunc(guessingCompetition_p_1.input_competition_result, compResult, function (r) {
            console.log(r);
            if (r.reslutCode === constant_1.RESULT_SUCCESS) {
                alert('比赛结果录入成功');
                resolve(r);
            } else {
                reject(r);
            }
        });
    });
};
// 结算比赛
var settle_guessing = function settle_guessing(cid) {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(guessingCompetition_p_1.settle_guessing_award, cid, function (r) {
            console.log(r);
            if (r.reslutCode === constant_1.RESULT_SUCCESS) {
                alert('比赛结算成功');
                resolve(r);
            } else {
                reject(r);
            }
        });
    });
};
// 取消比赛 退回下注额
var cancel_guessing = function cancel_guessing(cid) {
    return new Promise(function (resolve, reject) {
        init_1.clientRpcFunc(guessingCompetition_p_1.cancle_guessing, cid, function (r) {
            console.log(r);
            if (r.reslutCode === constant_1.RESULT_SUCCESS) {
                alert('比赛取消成功');
                resolve(r);
            } else {
                reject(r);
            }
        });
    });
};
// 上传文件
exports.uploadFile = function (base64) {
    return __awaiter(undefined, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var file, formData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('uploadFile in !!!!!!!!!!!!!');
                        file = tools_1.base64ToFile(base64);
                        formData = new FormData();

                        formData.append('upload', file);
                        fetch(config_1.uploadFileUrl + "?$forceServer=1", {
                            body: formData,
                            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                            // credentials: 'same-origin', // include, same-origin, *omit
                            headers: {
                                'user-agent': 'Mozilla/4.0 MDN Example'
                            },
                            method: 'POST',
                            mode: 'no-cors' // no-cors, cors, *same-origin
                            // redirect: 'follow', // manual, *follow, error
                            // referrer: 'no-referrer' // *client, no-referrer
                        }).then(function (response) {
                            return response.json();
                        }).then(function (res) {
                            console.log('uploadFile success ', res);
                            tools_1.popNewMessage('图片上传成功');
                            if (res.result === 1) {
                                var sid = res.sid;
                                alert("\u56FE\u7247\u4E0A\u4F20\u6210\u529F" + sid);
                            }
                        }).catch(function (err) {
                            console.log('uploadFile fail ', err);
                            tools_1.popNewMessage('图片上传失败');
                        });

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
};
exports.getTeamCfg = function (cfgName, teamNum, teamName) {
    var cfgs = cfgMap_1.getMap(cfgName);
    for (var _iterator = cfgs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var _ref2 = _ref,
            _ref3 = _slicedToArray(_ref2, 2),
            k = _ref3[0],
            cfg = _ref3[1];

        if (cfg.pid === teamNum) {
            return cfg;
        }
        if (cfg.teamName === teamName) {
            return cfg;
        }
    }
    return;
};
/**
 * 获取队伍信息
 * @param teamNum 可选,队伍编号，不填返回所有
 */
exports.getTeamCfg1 = function (teamNum) {
    var cfgs = cfgMap_1.getMap(competition_s_1.LOLTeamInfosCfg._$info.name);
    var filterCfgs = [];
    for (var _iterator2 = cfgs, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref4 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref4 = _i2.value;
        }

        var _ref5 = _ref4,
            _ref6 = _slicedToArray(_ref5, 2),
            k = _ref6[0],
            cfg = _ref6[1];

        if (teamNum && teamNum === cfg.pid) {
            return cfg;
        } else {
            filterCfgs.push(cfg);
        }
    }
    return filterCfgs;
};
/**
 * 获取赛事信息
 * @param teamNum 可选,队伍编号，不填返回所有
 */
exports.getCompCfg = function (compType) {
    var cfgs = cfgMap_1.getMap(competition_s_1.LOLTypeCfg._$info.name);
    var filterCfgs = [];
    for (var _iterator3 = cfgs, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref7;

        if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref7 = _iterator3[_i3++];
        } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref7 = _i3.value;
        }

        var _ref8 = _ref7,
            _ref9 = _slicedToArray(_ref8, 2),
            k = _ref9[0],
            cfg = _ref9[1];

        if (compType && compType === cfg.pid) {
            return cfg;
        } else {
            filterCfgs.push(cfg);
        }
    }
    return filterCfgs;
};
})