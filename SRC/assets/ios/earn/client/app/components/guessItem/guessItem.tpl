(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 4252679546;_node.attrs["w-class"] = "body";_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 2075101291;_node2.attrs["w-class"] = "guess-top";_$temp = _node2;{
																var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "span", "sid": 2 };_node3.children = [];_node3.attrHash = 0;_$temp = _node3;{
																				var _$parent4 = _$temp;_addText(it.guessData.matchName, _$parent4);
																}_chFunc(_node3);_$parent3.children.push(_node3);
												}_$temp = _node2;{
																var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrHash = 0;_$temp = _node4;{
																				var _$parent6 = _$temp;var _node5 = _installText("截止：", 3328677346);;
																				_$parent6.children.push(_node5);
																}_$temp = _node4;{
																				var _$parent7 = _$temp;_addText(it.guessData.time.slice(11), _$parent7);
																}_chFunc(_node4);_$parent5.children.push(_node4);
												}_chFunc(_node2);_$parent2.children.push(_node2);
								}_$temp = _node;{
												var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 3861020665;_node6.attrs["w-class"] = "guess-center";{
																var attrvalue = "";attrvalue = it.showBtn ? "goGuess" : "";_node6.attrs["on-tap"] = attrvalue;
												}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["on-tap"]));_$temp = _node6;{
																var _$parent9 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 2104235054;_node7.attrs["w-class"] = "guess-center-team";_$temp = _node7;{
																				var _$parent10 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 6 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 2839472699;{
																								var _attrvalue = "";_attrvalue += "../../res/image/guessTeam/";_attrvalue += it.guessData.team1;_attrvalue += ".png";_node8.attrs["src"] = _attrvalue;
																				}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["src"]));_node8.attrs["height"] = "100px";_chFunc(_node8);_$parent10.children.push(_node8);
																}_$temp = _node7;{
																				var _$parent11 = _$temp;var _node9 = { "attrs": {}, "tagName": "span", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 1471759536;_node9.attrs["style"] = "margin-top:10px";_$temp = _node9;{
																								var _$parent12 = _$temp;_addText(it.guessData.team1, _$parent12);
																				}_chFunc(_node9);_$parent11.children.push(_node9);
																}if (it.showOdds) {
																				_$temp = _node7;{
																								var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrHash = 0;_$temp = _node10;{
																												var _$parent14 = _$temp;var _node11 = { "attrs": {}, "tagName": "span", "sid": 9 };_node11.children = [];_node11.childHash = 730164838;_node11.attrHash = 0;_$temp = _node11;{
																																var _$parent15 = _$temp;var _node12 = _installText("赔率", 3934527411);;
																																_$parent15.children.push(_node12);
																												}_$parent14.children.push(_node11);
																								}_$temp = _node10;{
																												var _$parent16 = _$temp;var _node13 = { "attrs": {}, "tagName": "span", "sid": 10 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 85325984;_node13.attrs["style"] = "color:#1E6DEF";_$temp = _node13;{
																																var _$parent17 = _$temp;_addText(it.oddsTeam1, _$parent17);
																												}_chFunc(_node13);_$parent16.children.push(_node13);
																								}_chFunc(_node10);_$parent13.children.push(_node10);
																				}
																}_chFunc(_node7);_$parent9.children.push(_node7);
												}_$temp = _node6;{
																var _$parent18 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 11 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 2682043149;_node14.attrs["w-class"] = "guess-center-vs";_$temp = _node14;{
																				var _$parent19 = _$temp;var _node15 = { "attrs": {}, "tagName": "span", "sid": 12 };_node15.children = [];_node15.childHash = 3847882286;_node15.attrSize = 1;_node15.attrHash = 880802571;_node15.attrs["style"] = "font-size:32px;margin-bottom: 20px;";_$temp = _node15;{
																								var _$parent20 = _$temp;var _node16 = _installText("VS", 239896397);;
																								_$parent20.children.push(_node16);
																				}_$parent19.children.push(_node15);
																}if (it.showBtn) {
																				if (it.guessBtn) {
																								_$temp = _node14;{
																												var _$parent21 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 13 };_node17.children = [];_node17.childHash = 530566769;_node17.attrSize = 2;_node17.attrHash = 1467373440;_node17.attrs["on-tap"] = "btnClick(e,0)";_node17.attrs["w-class"] = "guess-btn";_$temp = _node17;{
																																var _$parent22 = _$temp;var _node18 = _installText("预测", 1219805318);;
																																_$parent22.children.push(_node18);
																												}_$parent21.children.push(_node17);
																								}
																				} else {
																								if (it.guessData.result === 3) {
																												_$temp = _node14;{
																																var _$parent23 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.childHash = 3047262766;_node19.attrSize = 1;_node19.attrHash = 730137635;_node19.attrs["w-class"] = "guess-btn notguess";_$temp = _node19;{
																																				var _$parent24 = _$temp;var _node20 = _installText("比赛取消", 3983587483);;
																																				_$parent24.children.push(_node20);
																																}_$parent23.children.push(_node19);
																												}
																								} else {
																												_$temp = _node14;{
																																var _$parent25 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 15 };_node21.children = [];_node21.childHash = 2436010348;_node21.attrSize = 1;_node21.attrHash = 730137635;_node21.attrs["w-class"] = "guess-btn notguess";_$temp = _node21;{
																																				var _$parent26 = _$temp;var _node22 = _installText("停止预测", 1656891585);;
																																				_$parent26.children.push(_node22);
																																}_$parent25.children.push(_node21);
																												}
																								}
																				}
																}_chFunc(_node14);_$parent18.children.push(_node14);
												}_$temp = _node6;{
																var _$parent27 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 16 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 2104235054;_node23.attrs["w-class"] = "guess-center-team";_$temp = _node23;{
																				var _$parent28 = _$temp;var _node24 = { "attrs": {}, "tagName": "img", "sid": 17 };_node24.children = [];_node24.attrSize = 2;_node24.attrHash = 2839472699;{
																								var _attrvalue2 = "";_attrvalue2 += "../../res/image/guessTeam/";_attrvalue2 += it.guessData.team2;_attrvalue2 += ".png";_node24.attrs["src"] = _attrvalue2;
																				}_node24.attrHash = _hash.nextHash(_node24.attrHash, _calTextHash(_node24.attrs["src"]));_node24.attrs["height"] = "100px";_chFunc(_node24);_$parent28.children.push(_node24);
																}_$temp = _node23;{
																				var _$parent29 = _$temp;var _node25 = { "attrs": {}, "tagName": "span", "sid": 18 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 1471759536;_node25.attrs["style"] = "margin-top:10px";_$temp = _node25;{
																								var _$parent30 = _$temp;_addText(it.guessData.team2, _$parent30);
																				}_chFunc(_node25);_$parent29.children.push(_node25);
																}if (it.showOdds) {
																				_$temp = _node23;{
																								var _$parent31 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 19 };_node26.children = [];_node26.attrHash = 0;_$temp = _node26;{
																												var _$parent32 = _$temp;var _node27 = { "attrs": {}, "tagName": "span", "sid": 20 };_node27.children = [];_node27.childHash = 730164838;_node27.attrHash = 0;_$temp = _node27;{
																																var _$parent33 = _$temp;var _node28 = _installText("赔率", 3934527411);;
																																_$parent33.children.push(_node28);
																												}_$parent32.children.push(_node27);
																								}_$temp = _node26;{
																												var _$parent34 = _$temp;var _node29 = { "attrs": {}, "tagName": "span", "sid": 21 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 85325984;_node29.attrs["style"] = "color:#1E6DEF";_$temp = _node29;{
																																var _$parent35 = _$temp;_addText(it.oddsTeam2, _$parent35);
																												}_chFunc(_node29);_$parent34.children.push(_node29);
																								}_chFunc(_node26);_$parent31.children.push(_node26);
																				}
																}_chFunc(_node23);_$parent27.children.push(_node23);
												}_chFunc(_node6);_$parent8.children.push(_node6);
								}_$temp = _node;{
												var _$parent36 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 22 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 3905152307;_node30.attrs["w-class"] = "guess-bottom";_$temp = _node30;{
																var _$parent37 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 23 };_node31.children = [];_node31.attrSize = 2;_node31.attrHash = 4243752314;_node31.attrs["w-class"] = "suport-left";{
																				var _attrvalue3 = "";_attrvalue3 += "width:";_attrvalue3 += it.guessData.team1Num / (it.guessData.team2Num + it.guessData.team1Num) * 100;_attrvalue3 += "%";_node31.attrs["style"] = _attrvalue3;
																}_node31.attrHash = _hash.nextHash(_node31.attrHash, _calTextHash(_node31.attrs["style"]));_$temp = _node31;{
																				var _$parent38 = _$temp;_addText(it.guessData.team1Num, _$parent38);
																}_$temp = _node31;{
																				var _$parent39 = _$temp;var _node32 = _installText("ST", 3826742053);;
																				_$parent39.children.push(_node32);
																}_$temp = _node31;{
																				var _$parent40 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 24 };_node33.children = [];_node33.childHash = 2946814719;_node33.attrSize = 1;_node33.attrHash = 374818280;_node33.attrs["w-class"] = "line";_$parent40.children.push(_node33);
																}_chFunc(_node31);_$parent37.children.push(_node31);
												}_$temp = _node30;{
																var _$parent41 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 25 };_node34.children = [];_node34.attrSize = 2;_node34.attrHash = 2281429107;_node34.attrs["w-class"] = "suport-right";{
																				var _attrvalue4 = "";_attrvalue4 += "width:";_attrvalue4 += it.guessData.team2Num / (it.guessData.team2Num + it.guessData.team1Num) * 100;_attrvalue4 += "%";_node34.attrs["style"] = _attrvalue4;
																}_node34.attrHash = _hash.nextHash(_node34.attrHash, _calTextHash(_node34.attrs["style"]));_$temp = _node34;{
																				var _$parent42 = _$temp;_addText(it.guessData.team2Num, _$parent42);
																}_$temp = _node34;{
																				var _$parent43 = _$temp;var _node35 = _installText("ST", 3826742053);;
																				_$parent43.children.push(_node35);
																}_chFunc(_node34);_$parent41.children.push(_node34);
												}_chFunc(_node30);_$parent36.children.push(_node30);
								}_chFunc(_node);return _node;
				}
});