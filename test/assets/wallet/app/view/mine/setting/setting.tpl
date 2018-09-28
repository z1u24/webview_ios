(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2139844790;_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it1.cfgData.topBarTitle;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 487306359;_node4.attrs["w-class"] = "content";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 2593981653;_node5.attrs["w-class"] = "userHead";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 3301232707;{
						var attrvalue = "";attrvalue += it1.userHead;attrvalue += "";_node6.attrs["src"] = attrvalue;
					}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["src"]));_node6.attrs["w-class"] = "headImg";_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "span", "sid": 5 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 827016762;_node7.attrs["w-class"] = "headName";_node7.attrs["ev-input-change"] = "userNameChange";if (it1.userInput) {
						_$temp = _node7;{
							var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 6 };_node8.hasChild = false;_node8.child = null;_node8.attrHash = 0;_$temp = _node8;{
								var _$parent9 = _$temp;var _node9 = {}; //jpair pre

								_node9["input"] = it1.userName;
								//jpair suf
								//jpair pre

								_node9["placeHolder"] = it1.cfgData.itemTitle[0];
								//jpair suf
								//jpair pre

								{
									var jvalue = "";
									jvalue = "autofocus";
									//jpair suf

									_node9["autofocus"] = jvalue;
								}
								_addJson(_node9, _$parent9);
							}_chFunc(_node8);_$parent8.children.push(_node8);
						}
					} else {
						_$temp = _node7;{
							var _$parent10 = _$temp;_addText(it1.userName, _$parent10);
						}
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}_$temp = _node5;{
					var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "img", "sid": 7 };_node10.children = [];_node10.childHash = 0;_node10.attrSize = 3;_node10.attrHash = 423402012;_node10.attrs["src"] = "../../../res/image/edit.png";_node10.attrs["style"] = "width: 40px;height: 40px;margin-right: 30px;";_node10.attrs["on-tap"] = "changeInput";_$parent11.children.push(_node10);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 4069439927;_node11.attrs["style"] = "margin-bottom: 30px;";_$temp = _node11;{
					var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 701657680;_node12.attrs["w-class"] = "mode";_$temp = _node12;{
						var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 2676660207;_node13.attrs["on-tap"] = "itemClick(0)";_$temp = _node13;{
							var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "app-components-basicItem-basicItem", "sid": 11 };_node14.hasChild = false;_node14.child = null;_node14.attrHash = 0;_$temp = _node14;{
								var _$parent16 = _$temp;var _node15 = {}; //jpair pre

								_node15["name"] = it1.cfgData.itemTitle[1];
								//jpair suf
								//jpair pre

								_node15["describe"] = it1.cfgData.bindPhone;
								//jpair suf
								//jpair pre

								{
									var _jvalue = "";
									_jvalue = "margin:0;";
									//jpair suf

									_node15["style"] = _jvalue;
								}
								_addJson(_node15, _$parent16);
							}_chFunc(_node14);_$parent15.children.push(_node14);
						}_chFunc(_node13);_$parent14.children.push(_node13);
					}_$temp = _node12;{
						var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 12 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 606951485;_node16.attrs["on-tap"] = "itemClick(1)";_$temp = _node16;{
							var _$parent18 = _$temp;var _node17 = { "attrs": {}, "tagName": "app-components-basicItem-basicItem", "sid": 13 };_node17.hasChild = false;_node17.child = null;_node17.attrHash = 0;_$temp = _node17;{
								var _$parent19 = _$temp;var _node18 = {}; //jpair pre

								_node18["name"] = it1.cfgData.itemTitle[2];
								//jpair suf
								//jpair pre

								{
									var _jvalue2 = "";
									_jvalue2 = "margin:0;border:none;";
									//jpair suf

									_node18["style"] = _jvalue2;
								}
								_addJson(_node18, _$parent19);
							}_chFunc(_node17);_$parent18.children.push(_node17);
						}_chFunc(_node16);_$parent17.children.push(_node16);
					}_chFunc(_node12);_$parent13.children.push(_node12);
				}_$temp = _node11;{
					var _$parent20 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 701657680;_node19.attrs["w-class"] = "mode";_$temp = _node19;{
						var _$parent21 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 15 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 37076750;_node20.attrs["on-tap"] = "itemClick(2)";_$temp = _node20;{
							var _$parent22 = _$temp;var _node21 = { "attrs": {}, "tagName": "app-components-basicItem-basicItem", "sid": 16 };_node21.hasChild = false;_node21.child = null;_node21.attrHash = 0;_$temp = _node21;{
								var _$parent23 = _$temp;var _node22 = {}; //jpair pre

								_node22["name"] = it1.cfgData.itemTitle[3];
								//jpair suf
								//jpair pre

								_node22["describe"] = it1.itemList[0].list[it1.itemList[0].selected];
								//jpair suf
								//jpair pre

								{
									var _jvalue3 = "";
									_jvalue3 = "margin:0;";
									//jpair suf

									_node22["style"] = _jvalue3;
								}
								_addJson(_node22, _$parent23);
							}_chFunc(_node21);_$parent22.children.push(_node21);
						}_chFunc(_node20);_$parent21.children.push(_node20);
					}_$temp = _node19;{
						var _$parent24 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 17 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 1308655200;_node23.attrs["on-tap"] = "itemClick(3)";_$temp = _node23;{
							var _$parent25 = _$temp;var _node24 = { "attrs": {}, "tagName": "app-components-basicItem-basicItem", "sid": 18 };_node24.hasChild = false;_node24.child = null;_node24.attrHash = 0;_$temp = _node24;{
								var _$parent26 = _$temp;var _node25 = {}; //jpair pre

								_node25["name"] = it1.cfgData.itemTitle[4];
								//jpair suf
								//jpair pre

								_node25["describe"] = it1.itemList[1].list[it1.itemList[1].selected];
								//jpair suf
								//jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 = "margin:0;";
									//jpair suf

									_node25["style"] = _jvalue4;
								}
								_addJson(_node25, _$parent26);
							}_chFunc(_node24);_$parent25.children.push(_node24);
						}_chFunc(_node23);_$parent24.children.push(_node23);
					}_$temp = _node19;{
						var _$parent27 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 19 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 3219375291;_node26.attrs["on-tap"] = "itemClick(4)";_$temp = _node26;{
							var _$parent28 = _$temp;var _node27 = { "attrs": {}, "tagName": "app-components-basicItem-basicItem", "sid": 20 };_node27.hasChild = false;_node27.child = null;_node27.attrHash = 0;_$temp = _node27;{
								var _$parent29 = _$temp;var _node28 = {}; //jpair pre

								_node28["name"] = it1.cfgData.itemTitle[5];
								//jpair suf
								//jpair pre

								_node28["describe"] = it1.itemList[2].list[it1.itemList[2].selected];
								//jpair suf
								//jpair pre

								{
									var _jvalue5 = "";
									_jvalue5 = "margin:0;border:none;";
									//jpair suf

									_node28["style"] = _jvalue5;
								}
								_addJson(_node28, _$parent29);
							}_chFunc(_node27);_$parent28.children.push(_node27);
						}_chFunc(_node26);_$parent27.children.push(_node26);
					}_chFunc(_node19);_$parent20.children.push(_node19);
				}_$temp = _node11;{
					var _$parent30 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 21 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 701657680;_node29.attrs["w-class"] = "mode";_$temp = _node29;{
						var _$parent31 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 22 };_node30.children = [];_node30.attrSize = 3;_node30.attrHash = 4210731546;_node30.attrs["w-class"] = "item";_node30.attrs["ev-switch-click"] = "onSwitchChange";{
							var _attrvalue = "";_attrvalue += it1.openLockScreen ? '' : 'border-bottom: none;';_attrvalue += "";_node30.attrs["style"] = _attrvalue;
						}_node30.attrHash = _hash.nextHash(_node30.attrHash, _calTextHash(_node30.attrs["style"]));_$temp = _node30;{
							var _$parent32 = _$temp;var _node31 = { "attrs": {}, "tagName": "span", "sid": 23 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 136397174;_node31.attrs["w-class"] = "itemName";_$temp = _node31;{
								var _$parent33 = _$temp;_addText(it1.cfgData.itemTitle[6], _$parent33);
							}_chFunc(_node31);_$parent32.children.push(_node31);
						}_$temp = _node30;{
							var _$parent34 = _$temp;var _node32 = { "attrs": {}, "tagName": "app-components-switch-switch", "sid": 24 };_node32.hasChild = false;_node32.child = null;_node32.attrHash = 0;_$temp = _node32;{
								var _$parent35 = _$temp;var _node33 = {}; //jpair pre

								_node33["types"] = it1.openLockScreen;
								//jpair suf
								_addJson(_node33, _$parent35);
							}_chFunc(_node32);_$parent34.children.push(_node32);
						}_chFunc(_node30);_$parent31.children.push(_node30);
					}if (it1.openLockScreen) {
						_$temp = _node29;{
							var _$parent36 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 25 };_node34.children = [];_node34.attrSize = 3;_node34.attrHash = 3880859379;_node34.attrs["w-class"] = "item";_node34.attrs["on-tap"] = "oldLockPsw(0)";_node34.attrs["style"] = "border-bottom: none;";_$temp = _node34;{
								var _$parent37 = _$temp;var _node35 = { "attrs": {}, "tagName": "span", "sid": 26 };_node35.children = [];_node35.attrSize = 1;_node35.attrHash = 136397174;_node35.attrs["w-class"] = "itemName";_$temp = _node35;{
									var _$parent38 = _$temp;_addText(it1.cfgData.itemTitle[7], _$parent38);
								}_chFunc(_node35);_$parent37.children.push(_node35);
							}_chFunc(_node34);_$parent36.children.push(_node34);
						}
					}_chFunc(_node29);_$parent30.children.push(_node29);
				}_$temp = _node11;{
					var _$parent39 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 27 };_node36.children = [];_node36.attrSize = 1;_node36.attrHash = 701657680;_node36.attrs["w-class"] = "mode";_$temp = _node36;{
						var _$parent40 = _$temp;var _node37 = { "attrs": {}, "tagName": "div", "sid": 28 };_node37.children = [];_node37.attrSize = 3;_node37.attrHash = 3658692590;_node37.attrs["w-class"] = "item";_node37.attrs["on-tap"] = "logOut";_node37.attrs["style"] = "border-bottom: none;";_$temp = _node37;{
							var _$parent41 = _$temp;var _node38 = { "attrs": {}, "tagName": "span", "sid": 29 };_node38.children = [];_node38.attrSize = 2;_node38.attrHash = 1484981403;_node38.attrs["w-class"] = "itemName";_node38.attrs["style"] = "color: #F5A264;";_$temp = _node38;{
								var _$parent42 = _$temp;_addText(it1.cfgData.itemTitle[8], _$parent42);
							}_chFunc(_node38);_$parent41.children.push(_node38);
						}_chFunc(_node37);_$parent40.children.push(_node37);
					}_chFunc(_node36);_$parent39.children.push(_node36);
				}_chFunc(_node11);_$parent12.children.push(_node11);
			}_$temp = _node4;{
				var _$parent43 = _$temp;var _node39 = { "attrs": {}, "tagName": "div", "sid": 30 };_node39.children = [];_node39.childHash = 2946814719;_node39.attrSize = 1;_node39.attrHash = 1100010770;_node39.attrs["style"] = "height: 128px;";_$parent43.children.push(_node39);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});