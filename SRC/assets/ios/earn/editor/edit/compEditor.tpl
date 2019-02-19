(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = _installText("比赛信息：", 125535153);;
												_$parent2.children.push(_node2);
								}_$temp = _node;{
												var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 1 };_node3.children = [];_node3.attrHash = 0;_$temp = _node3;{
																var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4259609045;_node4.attrs["w-class"] = "competitions";_$temp = _node4;{
																				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "select", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 703498619;_node5.attrs["on-change"] = "compIndex";_node5.attrs["name"] = "compInfo";{
																								var _$i = 0;
																								for (var _iterator = it.compList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
																												var _ref;

																												if (_isArray) {
																																if (_i >= _iterator.length) break;
																																_ref = _iterator[_i++];
																												} else {
																																_i = _iterator.next();
																																if (_i.done) break;
																																_ref = _i.value;
																												}

																												var comp = _ref;
																												var i = _$i++;_$temp = _node5;{
																																var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "option", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2572395531;_node6.attrs["value"] = "";_$temp = _node6;{
																																				var _$parent7 = _$temp;_addText(comp.team1, _$parent7);
																																}_$temp = _node6;{
																																				var _$parent8 = _$temp;var _node7 = _installText("&nbsp; VS &nbsp;", 624393384);;
																																				_$parent8.children.push(_node7);
																																}_$temp = _node6;{
																																				var _$parent9 = _$temp;_addText(comp.team2, _$parent9);
																																}_$temp = _node6;{
																																				var _$parent10 = _$temp;var _node8 = _installText("&nbsp;", 1553561131);;
																																				_$parent10.children.push(_node8);
																																}_$temp = _node6;{
																																				var _$parent11 = _$temp;_addText(comp.time, _$parent11);
																																}_$temp = _node6;{
																																				var _$parent12 = _$temp;var _node9 = _installText("&nbsp; 奖金池", 432797276);;
																																				_$parent12.children.push(_node9);
																																}_$temp = _node6;{
																																				var _$parent13 = _$temp;_addText(comp.team1Num, _$parent13);
																																}_$temp = _node6;{
																																				var _$parent14 = _$temp;var _node10 = _installText("&nbsp;", 1553561131);;
																																				_$parent14.children.push(_node10);
																																}_$temp = _node6;{
																																				var _$parent15 = _$temp;_addText(comp.team2Num, _$parent15);
																																}_$temp = _node6;{
																																				var _$parent16 = _$temp;var _node11 = _installText("比赛结果", 3124863469);;
																																				_$parent16.children.push(_node11);
																																}_$temp = _node6;{
																																				var _$parent17 = _$temp;_addText(comp.result, _$parent17);
																																}_$temp = _node6;{
																																				var _$parent18 = _$temp;var _node12 = _installText("&nbsp; 结算状态", 1815931759);;
																																				_$parent18.children.push(_node12);
																																}_$temp = _node6;{
																																				var _$parent19 = _$temp;_addText(comp.state, _$parent19);
																																}_chFunc(_node6);_$parent6.children.push(_node6);
																												}
																								}
																				}_chFunc(_node5);_$parent5.children.push(_node5);
																}_$temp = _node4;{
																				var _$parent20 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 5 };_node13.children = [];_node13.attrHash = 0;if (it.compList[it.compIndex]) {
																								_$temp = _node13;{
																												var _$parent21 = _$temp;var _node14 = { "attrs": {}, "tagName": "button", "sid": 6 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 3739812824;{
																																var attrvalue = "";attrvalue += "addResult(e, ";attrvalue += 1;attrvalue += ", ";attrvalue += it.compList[it.compIndex].cid;attrvalue += ")";_node14.attrs["on-tap"] = attrvalue;
																												}_node14.attrHash = _hash.nextHash(_node14.attrHash, _calTextHash(_node14.attrs["on-tap"]));_$temp = _node14;{
																																var _$parent22 = _$temp;_addText(it.compList[it.compIndex].team1, _$parent22);
																												}_$temp = _node14;{
																																var _$parent23 = _$temp;var _node15 = _installText("胜", 826155093);;
																																_$parent23.children.push(_node15);
																												}_chFunc(_node14);_$parent21.children.push(_node14);
																								}_$temp = _node13;{
																												var _$parent24 = _$temp;var _node16 = { "attrs": {}, "tagName": "button", "sid": 7 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 3739812824;{
																																var _attrvalue = "";_attrvalue += "addResult(e, ";_attrvalue += 2;_attrvalue += ", ";_attrvalue += it.compList[it.compIndex].cid;_attrvalue += ")";_node16.attrs["on-tap"] = _attrvalue;
																												}_node16.attrHash = _hash.nextHash(_node16.attrHash, _calTextHash(_node16.attrs["on-tap"]));_$temp = _node16;{
																																var _$parent25 = _$temp;_addText(it.compList[it.compIndex].team2, _$parent25);
																												}_$temp = _node16;{
																																var _$parent26 = _$temp;var _node17 = _installText("胜", 826155093);;
																																_$parent26.children.push(_node17);
																												}_chFunc(_node16);_$parent24.children.push(_node16);
																								}_$temp = _node13;{
																												var _$parent27 = _$temp;var _node18 = { "attrs": {}, "tagName": "button", "sid": 8 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 850423922;{
																																var _attrvalue2 = "";_attrvalue2 += "settleGuessing(e, ";_attrvalue2 += it.compList[it.compIndex].cid;_attrvalue2 += ")";_node18.attrs["on-tap"] = _attrvalue2;
																												}_node18.attrHash = _hash.nextHash(_node18.attrHash, _calTextHash(_node18.attrs["on-tap"]));_$temp = _node18;{
																																var _$parent28 = _$temp;var _node19 = _installText("比赛结算", 3403510163);;
																																_$parent28.children.push(_node19);
																												}_chFunc(_node18);_$parent27.children.push(_node18);
																								}_$temp = _node13;{
																												var _$parent29 = _$temp;var _node20 = { "attrs": {}, "tagName": "button", "sid": 9 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 1038343024;{
																																var _attrvalue3 = "";_attrvalue3 += "cancelGuessing(e, ";_attrvalue3 += it.compList[it.compIndex].cid;_attrvalue3 += ")";_node20.attrs["on-tap"] = _attrvalue3;
																												}_node20.attrHash = _hash.nextHash(_node20.attrHash, _calTextHash(_node20.attrs["on-tap"]));_$temp = _node20;{
																																var _$parent30 = _$temp;var _node21 = _installText("取消比赛", 1282775016);;
																																_$parent30.children.push(_node21);
																												}_chFunc(_node20);_$parent29.children.push(_node20);
																								}
																				}_chFunc(_node13);_$parent20.children.push(_node13);
																}_chFunc(_node4);_$parent4.children.push(_node4);
												}_chFunc(_node3);_$parent3.children.push(_node3);
								}_$temp = _node;{
												var _$parent31 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 10 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 1794814868;_node22.attrs["w-class"] = "addCompInfo";_$temp = _node22;{
																var _$parent32 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 11 };_node23.children = [];_node23.attrHash = 0;_$temp = _node23;{
																				var _$parent33 = _$temp;var _node24 = _installText("队伍1：", 2510415459);;
																				_$parent33.children.push(_node24);
																}_$temp = _node23;{
																				var _$parent34 = _$temp;var _node25 = { "attrs": {}, "tagName": "select", "sid": 12 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 394364839;_node25.attrs["on-change"] = "inputTeam1";{
																								var _$i2 = 0;
																								for (var _iterator2 = it.teamList, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
																												var _ref2;

																												if (_isArray2) {
																																if (_i2 >= _iterator2.length) break;
																																_ref2 = _iterator2[_i2++];
																												} else {
																																_i2 = _iterator2.next();
																																if (_i2.done) break;
																																_ref2 = _i2.value;
																												}

																												var team = _ref2;
																												var _i3 = _$i2++;_$temp = _node25;{
																																var _$parent35 = _$temp;var _node26 = { "attrs": {}, "tagName": "option", "sid": 13 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 2572395531;_node26.attrs["value"] = "";_$temp = _node26;{
																																				var _$parent36 = _$temp;_addText(team.teamName, _$parent36);
																																}_chFunc(_node26);_$parent35.children.push(_node26);
																												}
																								}
																				}_chFunc(_node25);_$parent34.children.push(_node25);
																}_chFunc(_node23);_$parent32.children.push(_node23);
												}_$temp = _node22;{
																var _$parent37 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 14 };_node27.children = [];_node27.attrHash = 0;_$temp = _node27;{
																				var _$parent38 = _$temp;var _node28 = _installText("队伍2：", 2567984434);;
																				_$parent38.children.push(_node28);
																}_$temp = _node27;{
																				var _$parent39 = _$temp;var _node29 = { "attrs": {}, "tagName": "select", "sid": 15 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 640567819;_node29.attrs["on-change"] = "inputTeam2";{
																								var _$i3 = 0;
																								for (var _iterator3 = it.teamList, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
																												var _ref3;

																												if (_isArray3) {
																																if (_i4 >= _iterator3.length) break;
																																_ref3 = _iterator3[_i4++];
																												} else {
																																_i4 = _iterator3.next();
																																if (_i4.done) break;
																																_ref3 = _i4.value;
																												}

																												var _team = _ref3;
																												var _i5 = _$i3++;_$temp = _node29;{
																																var _$parent40 = _$temp;var _node30 = { "attrs": {}, "tagName": "option", "sid": 16 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 2572395531;_node30.attrs["value"] = "";_$temp = _node30;{
																																				var _$parent41 = _$temp;_addText(_team.teamName, _$parent41);
																																}_chFunc(_node30);_$parent40.children.push(_node30);
																												}
																								}
																				}_chFunc(_node29);_$parent39.children.push(_node29);
																}_chFunc(_node27);_$parent37.children.push(_node27);
												}_$temp = _node22;{
																var _$parent42 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 17 };_node31.children = [];_node31.attrHash = 0;_$temp = _node31;{
																				var _$parent43 = _$temp;var _node32 = _installText("比赛类型：", 564689024);;
																				_$parent43.children.push(_node32);
																}_$temp = _node31;{
																				var _$parent44 = _$temp;var _node33 = { "attrs": {}, "tagName": "select", "sid": 18 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 1060279601;_node33.attrs["on-change"] = "inputMatchType";{
																								var _$i4 = 0;
																								for (var _iterator4 = it.compInfoList, _isArray4 = Array.isArray(_iterator4), _i6 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
																												var _ref4;

																												if (_isArray4) {
																																if (_i6 >= _iterator4.length) break;
																																_ref4 = _iterator4[_i6++];
																												} else {
																																_i6 = _iterator4.next();
																																if (_i6.done) break;
																																_ref4 = _i6.value;
																												}

																												var compInfo = _ref4;
																												var _i7 = _$i4++;_$temp = _node33;{
																																var _$parent45 = _$temp;var _node34 = { "attrs": {}, "tagName": "option", "sid": 19 };_node34.children = [];_node34.attrSize = 1;_node34.attrHash = 2706347195;{
																																				var _attrvalue4 = "";_attrvalue4 += compInfo.pid;_attrvalue4 += "";_node34.attrs["value"] = _attrvalue4;
																																}_node34.attrHash = _hash.nextHash(_node34.attrHash, _calTextHash(_node34.attrs["value"]));_$temp = _node34;{
																																				var _$parent46 = _$temp;_addText(compInfo.name, _$parent46);
																																}_chFunc(_node34);_$parent45.children.push(_node34);
																												}
																								}
																				}_chFunc(_node33);_$parent44.children.push(_node33);
																}_chFunc(_node31);_$parent42.children.push(_node31);
												}_$temp = _node22;{
																var _$parent47 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 20 };_node35.children = [];_node35.attrHash = 0;_$temp = _node35;{
																				var _$parent48 = _$temp;var _node36 = _installText("比赛时间：", 37792554);;
																				_$parent48.children.push(_node36);
																}_$temp = _node35;{
																				var _$parent49 = _$temp;var _node37 = { "attrs": {}, "tagName": "input", "sid": 21 };_node37.children = [];_node37.attrSize = 3;_node37.attrHash = 1999333982;{
																								var _attrvalue5 = "";_attrvalue5 += it.time;_attrvalue5 += "";_node37.attrs["value"] = _attrvalue5;
																				}_node37.attrHash = _hash.nextHash(_node37.attrHash, _calTextHash(_node37.attrs["value"]));_node37.attrs["type"] = "datetime-local";_node37.attrs["on-input"] = "inputTime";_chFunc(_node37);_$parent49.children.push(_node37);
																}_chFunc(_node35);_$parent47.children.push(_node35);
												}_$temp = _node22;{
																var _$parent50 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 22 };_node38.children = [];_node38.attrHash = 0;_$temp = _node38;{
																				var _$parent51 = _$temp;var _node39 = _installText("队伍1初始奖池：", 3590742113);;
																				_$parent51.children.push(_node39);
																}_$temp = _node38;{
																				var _$parent52 = _$temp;var _node40 = { "attrs": {}, "tagName": "input", "sid": 23 };_node40.children = [];_node40.attrSize = 2;_node40.attrHash = 515773325;{
																								var _attrvalue6 = "";_attrvalue6 += it.team1Num;_attrvalue6 += "";_node40.attrs["value"] = _attrvalue6;
																				}_node40.attrHash = _hash.nextHash(_node40.attrHash, _calTextHash(_node40.attrs["value"]));_node40.attrs["on-input"] = "inputTeam1Num";_chFunc(_node40);_$parent52.children.push(_node40);
																}_chFunc(_node38);_$parent50.children.push(_node38);
												}_$temp = _node22;{
																var _$parent53 = _$temp;var _node41 = { "attrs": {}, "tagName": "div", "sid": 24 };_node41.children = [];_node41.attrHash = 0;_$temp = _node41;{
																				var _$parent54 = _$temp;var _node42 = _installText("队伍2初始奖池：", 1221511910);;
																				_$parent54.children.push(_node42);
																}_$temp = _node41;{
																				var _$parent55 = _$temp;var _node43 = { "attrs": {}, "tagName": "input", "sid": 25 };_node43.children = [];_node43.attrSize = 2;_node43.attrHash = 1986919510;{
																								var _attrvalue7 = "";_attrvalue7 += it.team2Num;_attrvalue7 += "";_node43.attrs["value"] = _attrvalue7;
																				}_node43.attrHash = _hash.nextHash(_node43.attrHash, _calTextHash(_node43.attrs["value"]));_node43.attrs["on-input"] = "inputTeam2Num";_chFunc(_node43);_$parent55.children.push(_node43);
																}_chFunc(_node41);_$parent53.children.push(_node41);
												}_chFunc(_node22);_$parent31.children.push(_node22);
								}_$temp = _node;{
												var _$parent56 = _$temp;var _node44 = { "attrs": {}, "tagName": "button", "sid": 26 };_node44.children = [];_node44.childHash = 370538247;_node44.attrSize = 2;_node44.attrHash = 1883954606;_node44.attrs["on-tap"] = "addComp";_node44.attrs["w-class"] = "btn";_$temp = _node44;{
																var _$parent57 = _$temp;var _node45 = _installText("添加比赛", 3508949049);;
																_$parent57.children.push(_node45);
												}_$parent56.children.push(_node44);
								}_$temp = _node;{
												var _$parent58 = _$temp;var _node46 = { "attrs": {}, "tagName": "input", "sid": 27 };_node46.children = [];_node46.childHash = 0;_node46.attrSize = 2;_node46.attrHash = 1569931192;_node46.attrs["type"] = "file";_node46.attrs["on-change"] = "uploadAvatar";_$parent58.children.push(_node46);
								}_chFunc(_node);return _node;
				}
});