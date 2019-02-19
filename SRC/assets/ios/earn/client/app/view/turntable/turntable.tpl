(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 5;_node.attrHash = 3568239961;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-next-click"] = "goHistory";_node.attrs["ev-refresh-click"] = "refresh";topBarTitle = { "zh_Hans": "大转盘", "zh_Hant": "大轉盤", "en": "" };_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar2", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["scrollHeight"] = 0;
				//jpair suf
				//jpair pre

				_node3["text"] = topBarTitle;
				//jpair suf
				//jpair pre

				{
					var jvalue = "";
					jvalue = "../../res/image/26_white.png";
					//jpair suf

					_node3["nextImg"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 487306359;_node4.attrs["w-class"] = "content";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 2007810158;_node5.attrs["w-class"] = "center";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 181624061;_node6.attrs["w-class"] = "turntable-name";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 5 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 3151893672;{
							var attrvalue = "";attrvalue += "../../res/image/";attrvalue += it.selectTurntable.type;attrvalue += "title.png";_node7.attrs["src"] = attrvalue;
						}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["src"]));_node7.attrs["height"] = "100%";_chFunc(_node7);_$parent7.children.push(_node7);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2594014870;_node8.attrs["w-class"] = "turntable-main-bg";_$temp = _node8;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3883608738;_node9.attrs["style"] = "width:628px;height:628px;";_$temp = _node9;{
							var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "img", "sid": 8 };_node10.children = [];_node10.attrSize = 3;_node10.attrHash = 853674194;_node10.attrs["w-class"] = "turntable_bg";{
								var _attrvalue = "";_attrvalue += "../../res/image/";_attrvalue += it.selectTurntable.type;_attrvalue += "bg.png";_node10.attrs["src"] = _attrvalue;
							}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["src"]));_node10.attrs["width"] = "628px;";_chFunc(_node10);_$parent10.children.push(_node10);
						}_$temp = _node9;{
							var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3885367477;_node11.attrs["w-class"] = "turntable-container";_$temp = _node11;{
								var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 3624279621;_node12.attrs["w-class"] = "turntable-content";_$temp = _node12;{
									var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 11 };_node13.children = [];_node13.attrSize = 2;_node13.attrHash = 3025844711;_node13.attrs["w-class"] = "turntable-list";_node13.attrs["id"] = "turntable";for (var i in it.prizeList) {
										var item = it.prizeList[i];_$temp = _node13;{
											var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 12 };_node14.children = [];_node14.attrSize = 2;_node14.attrHash = 2693308742;_node14.attrs["w-class"] = "turntable-item";{
												var _attrvalue2 = "";_attrvalue2 += "transform: rotate(";_attrvalue2 += i * (360 / it.prizeList.length);_attrvalue2 += "deg)";_node14.attrs["style"] = _attrvalue2;
											}_node14.attrHash = _hash.nextHash(_node14.attrHash, _calTextHash(_node14.attrs["style"]));_$temp = _node14;{
												var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 13 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 2397045216;_node15.attrs["w-class"] = "turntable-item-bg";{
													var _attrvalue3 = "";_attrvalue3 += "border-width:270px ";_attrvalue3 += 270 * Math.tan(3.14 / it.prizeList.length);_attrvalue3 += "px 0px;border-top-color:";_attrvalue3 += i % 2 === 0 ? 'white' : '#EEF0FF';_attrvalue3 += "";_node15.attrs["style"] = _attrvalue3;
												}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["style"]));_chFunc(_node15);_$parent15.children.push(_node15);
											}_$temp = _node14;{
												var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 14 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 2636721525;_node16.attrs["w-class"] = "turntable-icontent";if (item.awardType !== 9527) {
													_$temp = _node16;{
														var _$parent17 = _$temp;var _node17 = { "attrs": {}, "tagName": "img", "sid": 15 };_node17.children = [];_node17.attrSize = 4;_node17.attrHash = 2069523205;_node17.attrs["w-class"] = "turntable-iicon";{
															var _attrvalue4 = "";_attrvalue4 += "../../res/image/virtualGoods/";_attrvalue4 += item.awardType;_attrvalue4 += ".jpg";_node17.attrs["src"] = _attrvalue4;
														}_node17.attrHash = _hash.nextHash(_node17.attrHash, _calTextHash(_node17.attrs["src"]));_node17.attrs["width"] = "70px";_node17.attrs["height"] = "70px";_chFunc(_node17);_$parent17.children.push(_node17);
													}
												} else {
													_$temp = _node16;{
														var _$parent18 = _$temp;var _node18 = { "attrs": {}, "tagName": "p", "sid": 16 };_node18.children = [];_node18.childHash = 4019693502;_node18.attrSize = 1;_node18.attrHash = 3591920047;_node18.attrs["w-class"] = "turntable-itext";_$temp = _node18;{
															var _$parent19 = _$temp;var _node19 = { "attrs": {}, "tagName": "span", "sid": 17 };_node19.children = [];_node19.childHash = 869358950;_node19.attrSize = 1;_node19.attrHash = 1312924612;_node19.attrs["style"] = "width:70px;height:70px;font-size:26px;";_$temp = _node19;{
																var _$parent20 = _$temp;var _node20 = _installText("谢谢惠顾", 1421579402);;
																_$parent20.children.push(_node20);
															}_$parent19.children.push(_node19);
														}_$parent18.children.push(_node18);
													}
												}_chFunc(_node16);_$parent16.children.push(_node16);
											}_chFunc(_node14);_$parent14.children.push(_node14);
										}
									}_chFunc(_node13);_$parent13.children.push(_node13);
								}_chFunc(_node12);_$parent12.children.push(_node12);
							}_$temp = _node11;{
								var _$parent21 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 18 };_node21.children = [];_node21.childHash = 643370937;_node21.attrSize = 1;_node21.attrHash = 866840928;_node21.attrs["w-class"] = "turntable-btn";_$temp = _node21;{
									var _$parent22 = _$temp;var _node22 = { "attrs": {}, "tagName": "img", "sid": 19 };_node22.children = [];_node22.childHash = 0;_node22.attrSize = 4;_node22.attrHash = 2568040266;_node22.attrs["on-tap"] = "goLottery";_node22.attrs["src"] = "../../res/image/turntable_btn.png";_node22.attrs["width"] = "100%";_node22.attrs["height"] = "100%";_$parent22.children.push(_node22);
								}_$parent21.children.push(_node21);
							}_chFunc(_node11);_$parent11.children.push(_node11);
						}_chFunc(_node9);_$parent9.children.push(_node9);
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent23 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 20 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 430562398;_node23.attrs["w-class"] = "bottom flex-col";_$temp = _node23;{
					var _$parent24 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 21 };_node24.children = [];_node24.attrSize = 1;_node24.attrHash = 3178656977;_node24.attrs["w-class"] = "sale";_$temp = _node24;{
						var _$parent25 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 22 };_node25.children = [];_node25.childHash = 4191611989;_node25.attrSize = 2;_node25.attrHash = 1062222256;_node25.attrs["w-class"] = "sale-money";_node25.attrs["on-tap"] = "btnClick(e,1)";_$temp = _node25;{
							var _$parent26 = _$temp;var _node26 = { "attrs": {}, "tagName": "widget", "sid": 23 };_node26.hasChild = false;_node26.child = null;_node26.childHash = 1620279894;_node26.attrHash = 2467408643;_node26.attrs["w-tag"] = "pi-ui-lang";_node26.tagName = _node26.attrs["w-tag"];_$temp = _node26;{
								var _$parent27 = _$temp;var _node27 = {}; //jpair pre

								{
									var _jvalue = "";
									_jvalue = "充值";
									//jpair suf

									_node27["zh_Hans"] = _jvalue;
								}
								//jpair pre

								{
									var _jvalue2 = "";
									_jvalue2 = "充值";
									//jpair suf

									_node27["zh_Hant"] = _jvalue2;
								}
								//jpair pre

								{
									var _jvalue3 = "";
									_jvalue3 = "";
									//jpair suf

									_node27["en"] = _jvalue3;
								}
								_addJson(_node27, _$parent27);
							}_$parent26.children.push(_node26);
						}_$parent25.children.push(_node25);
					}_$temp = _node24;{
						var _$parent28 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 24 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 1116855872;_node28.attrs["w-class"] = "sale-btn";_$temp = _node28;{
							var _$parent29 = _$temp;var _node29 = { "attrs": {}, "tagName": "widget", "sid": 25 };_node29.hasChild = false;_node29.child = null;_node29.attrHash = 2467408643;_node29.attrs["w-tag"] = "pi-ui-lang";_node29.tagName = _node29.attrs["w-tag"];_$temp = _node29;{
								var _$parent30 = _$temp;_addJson(it.showTip, _$parent30);
							}_chFunc(_node29);_$parent29.children.push(_node29);
						}_chFunc(_node28);_$parent28.children.push(_node28);
					}_$temp = _node24;{
						var _$parent31 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 26 };_node30.children = [];_node30.childHash = 3415931214;_node30.attrSize = 2;_node30.attrHash = 2421119802;_node30.attrs["w-class"] = "sale-money";_node30.attrs["on-tap"] = "btnClick(e,0)";_$temp = _node30;{
							var _$parent32 = _$temp;var _node31 = { "attrs": {}, "tagName": "img", "sid": 27 };_node31.children = [];_node31.childHash = 0;_node31.attrSize = 3;_node31.attrHash = 260855615;_node31.attrs["w-class"] = "AD-alert";_node31.attrs["src"] = "../../res/image/AD_alert.png";_node31.attrs["alt"] = "";_$parent32.children.push(_node31);
						}_$temp = _node30;{
							var _$parent33 = _$temp;var _node32 = { "attrs": {}, "tagName": "widget", "sid": 28 };_node32.hasChild = false;_node32.child = null;_node32.childHash = 652232686;_node32.attrHash = 2467408643;_node32.attrs["w-tag"] = "pi-ui-lang";_node32.tagName = _node32.attrs["w-tag"];_$temp = _node32;{
								var _$parent34 = _$temp;var _node33 = {}; //jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 = "广告";
									//jpair suf

									_node33["zh_Hans"] = _jvalue4;
								}
								//jpair pre

								{
									var _jvalue5 = "";
									_jvalue5 = "廣告";
									//jpair suf

									_node33["zh_Hant"] = _jvalue5;
								}
								//jpair pre

								{
									var _jvalue6 = "";
									_jvalue6 = "";
									//jpair suf

									_node33["en"] = _jvalue6;
								}
								_addJson(_node33, _$parent34);
							}_$parent33.children.push(_node32);
						}_$parent31.children.push(_node30);
					}_chFunc(_node24);_$parent24.children.push(_node24);
				}_$temp = _node23;{
					var _$parent35 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 29 };_node34.children = [];_node34.attrSize = 1;_node34.attrHash = 1554851800;_node34.attrs["w-class"] = "ticket";for (var _i in it.turntableList) {
						var _item = it.turntableList[_i];_$temp = _node34;{
							var _$parent36 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 30 };_node35.children = [];_node35.attrSize = 2;_node35.attrHash = 1944389375;{
								var _attrvalue5 = "";_attrvalue5 += "btnClick(e,2,";_attrvalue5 += _i;_attrvalue5 += ")";_node35.attrs["on-tap"] = _attrvalue5;
							}_node35.attrHash = _hash.nextHash(_node35.attrHash, _calTextHash(_node35.attrs["on-tap"]));{
								var _attrvalue6 = "";_attrvalue6 += "ticket-item ";_attrvalue6 += it.selectTurntable.type === _item.type ? 'select' : '';_attrvalue6 += "";_node35.attrs["w-class"] = _attrvalue6;
							}_node35.attrHash = _hash.nextHash(_node35.attrHash, _calTextHash(_node35.attrs["w-class"]));_$temp = _node35;{
								var _$parent37 = _$temp;var _node36 = { "attrs": {}, "tagName": "widget", "sid": 31 };_node36.hasChild = false;_node36.child = null;_node36.attrSize = 1;_node36.attrHash = 2274882126;_node36.attrs["w-tag"] = "pi-ui-lang";_node36.tagName = _node36.attrs["w-tag"];_node36.attrs["w-class"] = "ticket-num";_$temp = _node36;{
									var _$parent38 = _$temp;_addJson(_item.turntableName, _$parent38);
								}_chFunc(_node36);_$parent37.children.push(_node36);
							}_chFunc(_node35);_$parent36.children.push(_node35);
						}
					}_chFunc(_node34);_$parent35.children.push(_node34);
				}_chFunc(_node23);_$parent23.children.push(_node23);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});