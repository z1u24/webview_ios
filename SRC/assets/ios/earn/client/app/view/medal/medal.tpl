(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 3380790512;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-refresh-click"] = "refresh";topBarTitle = { "zh_Hans": "勋章成就", "zh_Hant": "勳章成就", "en": "" };_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "widget", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrSize = 1;_node2.attrHash = 3741528033;_node2.attrs["style"] = "position: fixed;width: 100%;";_node2.attrs["w-tag"] = "app-components1-topBar-topBar2";_node2.tagName = _node2.attrs["w-tag"];_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["scrollHeight"] = it.scrollHeight;
				//jpair suf
				//jpair pre

				_node3["text"] = topBarTitle;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 1238710910;_node4.attrs["w-class"] = "content flex-col";_node4.attrs["on-scroll"] = "scrollPage";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 654896157;_node5.attrs["w-class"] = "content-bg";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2699025860;_node6.attrs["w-class"] = "myMedal mat";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 4213874497;_node7.attrs["w-class"] = "myMedal-top";_$temp = _node7;{
							var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 6 };_node8.children = [];_node8.attrSize = 3;_node8.attrHash = 3319756328;{
								var attrvalue = "";attrvalue += "../../res/image/medals/medal";attrvalue += it.mineMedal.rankMedal;attrvalue += ".png";_node8.attrs["src"] = attrvalue;
							}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["src"]));_node8.attrs["height"] = "100%";_node8.attrs["style"] = "margin-right:20px;";_chFunc(_node8);_$parent8.children.push(_node8);
						}_$temp = _node7;{
							var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3927232125;_node9.attrs["style"] = "display: flex;flex-direction: column;align-items: left;width: 100%";_$temp = _node9;{
								var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.attrSize = 1;_node10.attrHash = 1316367038;_node10.attrs["w-class"] = "myMedal-text";_node10.attrs["w-tag"] = "pi-ui-lang";_node10.tagName = _node10.attrs["w-tag"];_$temp = _node10;{
									var _$parent11 = _$temp;_addJson(it.mineMedal.desc, _$parent11);
								}_chFunc(_node10);_$parent10.children.push(_node10);
							}_$temp = _node9;{
								var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3907298252;_node11.attrs["w-class"] = "rank-desc";_$temp = _node11;{
									var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "span", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 948569768;_node12.attrs["style"] = "font-size: 24px;";_$temp = _node12;{
										var _$parent14 = _$temp;var _node13 = _installText("阶级：", 1138009593);;
										_$parent14.children.push(_node13);
									}_$temp = _node12;{
										var _$parent15 = _$temp;_addText(it.mineMedal.nowClass, _$parent15);
									}_chFunc(_node12);_$parent13.children.push(_node12);
								}_$temp = _node11;{
									var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "widget", "sid": 11 };_node14.hasChild = false;_node14.child = null;_node14.attrSize = 1;_node14.attrHash = 4124700090;_node14.attrs["style"] = "font-size: 24px;";_node14.attrs["w-tag"] = "pi-ui-lang";_node14.tagName = _node14.attrs["w-tag"];_$temp = _node14;{
										var _$parent17 = _$temp;var _node15 = {}; //jpair pre

										{
											var jvalue = "";
											jvalue += "下一等级还需：";jvalue += it.mineMedal.nextNeedKt;jvalue += "KT";
											//jpair suf

											_node15["zh_Hans"] = jvalue;
										}
										//jpair pre

										{
											var _jvalue = "";
											_jvalue += "下一等級還需：";_jvalue += it.mineMedal.nextNeedKt;_jvalue += "KT";
											//jpair suf

											_node15["zh_Hant"] = _jvalue;
										}
										//jpair pre

										{
											var _jvalue2 = "";
											_jvalue2 = "";
											//jpair suf

											_node15["en"] = _jvalue2;
										}
										_addJson(_node15, _$parent17);
									}_chFunc(_node14);_$parent16.children.push(_node14);
								}_chFunc(_node11);_$parent12.children.push(_node11);
							}_$temp = _node9;{
								var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 12 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 2370597609;_node16.attrs["w-class"] = "total-linear";_$temp = _node16;{
									var _$parent19 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 13 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 625969870;{
										var _attrvalue = "";_attrvalue += "width:";_attrvalue += it.mineMedal.ktNum / (it.mineMedal.ktNum + it.mineMedal.nextNeedKt) * 100;_attrvalue += "%;height: 100%;";_node17.attrs["style"] = _attrvalue;
									}_node17.attrHash = _hash.nextHash(_node17.attrHash, _calTextHash(_node17.attrs["style"]));_$temp = _node17;{
										var _$parent20 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 14 };_node18.children = [];_node18.childHash = 2946814719;_node18.attrSize = 2;_node18.attrHash = 3238919959;_node18.attrs["w-class"] = "now-linear";_node18.attrs["class"] = "gradually-width";_$parent20.children.push(_node18);
									}_chFunc(_node17);_$parent19.children.push(_node17);
								}_chFunc(_node16);_$parent18.children.push(_node16);
							}_chFunc(_node9);_$parent9.children.push(_node9);
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}_$temp = _node6;{
						var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 15 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 2776773763;_node19.attrs["w-class"] = "myCollect";_$temp = _node19;{
							var _$parent22 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 16 };_node20.children = [];_node20.attrSize = 2;_node20.attrHash = 1387309800;_node20.attrs["w-class"] = "myCollect-box";_node20.attrs["on-tap"] = "goMyCollect";_$temp = _node20;{
								var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "widget", "sid": 17 };_node21.hasChild = false;_node21.child = null;_node21.childHash = 2587657713;_node21.attrSize = 1;_node21.attrHash = 3404970835;_node21.attrs["w-class"] = "myCollect-text";_node21.attrs["w-tag"] = "pi-ui-lang";_node21.tagName = _node21.attrs["w-tag"];_$temp = _node21;{
									var _$parent24 = _$temp;var _node22 = {}; //jpair pre

									{
										var _jvalue3 = "";
										_jvalue3 = "我的收集";
										//jpair suf

										_node22["zh_Hans"] = _jvalue3;
									}
									//jpair pre

									{
										var _jvalue4 = "";
										_jvalue4 = "我的收集";
										//jpair suf

										_node22["zh_Hant"] = _jvalue4;
									}
									//jpair pre

									{
										var _jvalue5 = "";
										_jvalue5 = "";
										//jpair suf

										_node22["en"] = _jvalue5;
									}
									_addJson(_node22, _$parent24);
								}_$parent23.children.push(_node21);
							}_$temp = _node20;{
								var _$parent25 = _$temp;var _node23 = { "attrs": {}, "tagName": "span", "sid": 18 };_node23.children = [];_node23.attrHash = 0;_$temp = _node23;{
									var _$parent26 = _$temp;_addText(it.collectMedal, _$parent26);
								}_$temp = _node23;{
									var _$parent27 = _$temp;var _node24 = _installText("/", 883865250);;
									_$parent27.children.push(_node24);
								}_$temp = _node23;{
									var _$parent28 = _$temp;_addText(it.totalMedal, _$parent28);
								}_chFunc(_node23);_$parent25.children.push(_node23);
							}_$temp = _node20;{
								var _$parent29 = _$temp;var _node25 = { "attrs": {}, "tagName": "img", "sid": 19 };_node25.children = [];_node25.childHash = 0;_node25.attrSize = 2;_node25.attrHash = 2944695448;_node25.attrs["src"] = "../../res/image1/rightArrow-white.png";_node25.attrs["height"] = "48px";_$parent29.children.push(_node25);
							}_chFunc(_node20);_$parent22.children.push(_node20);
						}_$temp = _node19;{
							var _$parent30 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 20 };_node26.children = [];_node26.childHash = 3133122770;_node26.attrSize = 2;_node26.attrHash = 2022565092;_node26.attrs["w-class"] = "share";_node26.attrs["on-tap"] = "shareClick";_$temp = _node26;{
								var _$parent31 = _$temp;var _node27 = { "attrs": {}, "tagName": "img", "sid": 21 };_node27.children = [];_node27.childHash = 0;_node27.attrSize = 2;_node27.attrHash = 2717980877;_node27.attrs["src"] = "../../res/image1/share-white.png";_node27.attrs["height"] = "48px";_$parent31.children.push(_node27);
							}_$temp = _node26;{
								var _$parent32 = _$temp;var _node28 = { "attrs": {}, "tagName": "widget", "sid": 22 };_node28.hasChild = false;_node28.child = null;_node28.childHash = 805007000;_node28.attrSize = 1;_node28.attrHash = 3404970835;_node28.attrs["w-class"] = "myCollect-text";_node28.attrs["w-tag"] = "pi-ui-lang";_node28.tagName = _node28.attrs["w-tag"];_$temp = _node28;{
									var _$parent33 = _$temp;var _node29 = {}; //jpair pre

									{
										var _jvalue6 = "";
										_jvalue6 = "分享勋章画报";
										//jpair suf

										_node29["zh_Hans"] = _jvalue6;
									}
									//jpair pre

									{
										var _jvalue7 = "";
										_jvalue7 = "分享勋章画报";
										//jpair suf

										_node29["zh_Hant"] = _jvalue7;
									}
									//jpair pre

									{
										var _jvalue8 = "";
										_jvalue8 = "";
										//jpair suf

										_node29["en"] = _jvalue8;
									}
									_addJson(_node29, _$parent33);
								}_$parent32.children.push(_node28);
							}_$parent30.children.push(_node26);
						}_chFunc(_node19);_$parent21.children.push(_node19);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent34 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 23 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 4252679546;_node30.attrs["w-class"] = "body";{
					var _$i = 0;
					for (var _iterator = it.medalList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
						var _ref;

						if (_isArray) {
							if (_i >= _iterator.length) break;
							_ref = _iterator[_i++];
						} else {
							_i = _iterator.next();
							if (_i.done) break;
							_ref = _i.value;
						}

						var item = _ref;
						var i = _$i++;_$temp = _node30;{
							var _$parent35 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 24 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 2394204476;_node31.attrs["w-class"] = "allMedal mat flex-col";_$temp = _node31;{
								var _$parent36 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 25 };_node32.children = [];_node32.attrSize = 1;_node32.attrHash = 2859392060;_node32.attrs["w-class"] = "allMedal-top";_$temp = _node32;{
									var _$parent37 = _$temp;var _node33 = { "attrs": {}, "tagName": "widget", "sid": 26 };_node33.hasChild = false;_node33.child = null;_node33.attrSize = 1;_node33.attrHash = 4078060940;_node33.attrs["w-class"] = "allMedal-title";_node33.attrs["w-tag"] = "pi-ui-lang";_node33.tagName = _node33.attrs["w-tag"];_$temp = _node33;{
										var _$parent38 = _$temp;_addJson(item.title, _$parent38);
									}_chFunc(_node33);_$parent37.children.push(_node33);
								}_chFunc(_node32);_$parent36.children.push(_node32);
							}_$temp = _node31;{
								var _$parent39 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 27 };_node34.children = [];_node34.attrSize = 1;_node34.attrHash = 2141443749;_node34.attrs["w-class"] = "allMedal-bottom";{
									var _$i2 = 0;
									for (var _iterator2 = item.medal, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
										var _ref2;

										if (_isArray2) {
											if (_i2 >= _iterator2.length) break;
											_ref2 = _iterator2[_i2++];
										} else {
											_i2 = _iterator2.next();
											if (_i2.done) break;
											_ref2 = _i2.value;
										}

										var item1 = _ref2;
										var j = _$i2++;_$temp = _node34;{
											var _$parent40 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 28 };_node35.children = [];_node35.attrSize = 2;_node35.attrHash = 2713377584;_node35.attrs["w-class"] = "flex-col";{
												var _attrvalue2 = "";_attrvalue2 += "medalShow(e,";_attrvalue2 += item1.id;_attrvalue2 += ")";_node35.attrs["on-tap"] = _attrvalue2;
											}_node35.attrHash = _hash.nextHash(_node35.attrHash, _calTextHash(_node35.attrs["on-tap"]));_$temp = _node35;{
												var _$parent41 = _$temp;var _node36 = { "attrs": {}, "tagName": "img", "sid": 29 };_node36.children = [];_node36.attrSize = 3;_node36.attrHash = 1882201210;{
													var _attrvalue3 = "";_attrvalue3 += "../../res/image/medals/";_attrvalue3 += item1.img;_attrvalue3 += ".png";_node36.attrs["src"] = _attrvalue3;
												}_node36.attrHash = _hash.nextHash(_node36.attrHash, _calTextHash(_node36.attrs["src"]));{
													var _attrvalue4 = "";_attrvalue4 += item1.isHave ? '' : 'grayscale';_attrvalue4 += "";_node36.attrs["class"] = _attrvalue4;
												}_node36.attrHash = _hash.nextHash(_node36.attrHash, _calTextHash(_node36.attrs["class"]));_node36.attrs["height"] = "120px";_chFunc(_node36);_$parent41.children.push(_node36);
											}_$temp = _node35;{
												var _$parent42 = _$temp;var _node37 = { "attrs": {}, "tagName": "widget", "sid": 30 };_node37.hasChild = false;_node37.child = null;_node37.attrSize = 1;_node37.attrHash = 3614470514;_node37.attrs["w-class"] = "allMedal-item-text";_node37.attrs["w-tag"] = "pi-ui-lang";_node37.tagName = _node37.attrs["w-tag"];_$temp = _node37;{
													var _$parent43 = _$temp;_addJson(item1.title, _$parent43);
												}_chFunc(_node37);_$parent42.children.push(_node37);
											}_chFunc(_node35);_$parent40.children.push(_node35);
										}
									}
								}_chFunc(_node34);_$parent39.children.push(_node34);
							}_chFunc(_node31);_$parent35.children.push(_node31);
						}
					}
				}_chFunc(_node30);_$parent34.children.push(_node30);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});