(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;var item = it1.list[it1.selected];_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 3642232822;_node.attrs["class"] = "new-page";_node.attrs["style"] = "background: #F2F2F2;";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-next-click"] = "goHistory";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it1.cfgData.topBarTitle;
				//jpair suf
				//jpair pre

				{
					var jvalue = "";
					jvalue = "../../res/image/26_white.png";
					//jpair suf

					_node3["nextImg"] = jvalue;
				}
				//jpair pre

				{
					var _jvalue = "";
					_jvalue = "#F46262;";
					//jpair suf

					_node3["background"] = _jvalue;
				}
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "form", "sid": 2 };_node4.children = [];_node4.attrSize = 3;_node4.attrHash = 1689435913;_node4.attrs["w-class"] = "content";_node4.attrs["ev-selectBox-change"] = "changeCoin";_node4.attrs["id"] = "content";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "app-components-selectBox-selectBox", "sid": 3 };_node5.hasChild = false;_node5.child = null;_node5.attrHash = 0;_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = {}; //jpair pre

					_node6["list"] = it1.list;
					//jpair suf
					//jpair pre

					_node6["selected"] = it1.selected;
					//jpair suf
					_addJson(_node6, _$parent6);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 4 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 1463251463;_node7.attrs["style"] = "font-size: 28px;color: #888888;margin: 30px;";_$temp = _node7;{
					var _$parent8 = _$temp;_addText(it1.cfgData.changePin[0], _$parent8);
				}_$temp = _node7;{
					var _$parent9 = _$temp;_addText(it1.showPin ? it1.cfgData.changePin[1] : it1.cfgData.changePin[2], _$parent9);
				}_$temp = _node7;{
					var _$parent10 = _$temp;_addText(it1.cfgData.changePin[3], _$parent10);
				}_$temp = _node7;{
					var _$parent11 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 5 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 2219126117;_node8.attrs["style"] = "color: #3988E8;";_node8.attrs["on-tap"] = "changePin";_$temp = _node8;{
						var _$parent12 = _$temp;_addText(it1.showPin ? it1.cfgData.redEnvType[0] : it1.cfgData.redEnvType[1], _$parent12);
					}_chFunc(_node8);_$parent11.children.push(_node8);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_$temp = _node4;{
				var _$parent13 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 3533776900;_node9.attrs["ev-input-change"] = "changeAmount";_$temp = _node9;{
					var _$parent14 = _$temp;var _node10 = { "attrs": {}, "tagName": "app-components-basicInput-basicInput", "sid": 7 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 0;_$temp = _node10;{
						var _$parent15 = _$temp;var _node11 = {}; //jpair pre

						_node11["prepend"] = it1.showPin ? it1.cfgData.amountTitle[0] : it1.cfgData.amountTitle[1];
						//jpair suf
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "0";
							//jpair suf

							_node11["placeholder"] = _jvalue2;
						}
						//jpair pre

						{
							var _jvalue3 = "";
							_jvalue3 = "number";
							//jpair suf

							_node11["itype"] = _jvalue3;
						}
						//jpair pre

						_node11["append"] = item.name;
						//jpair suf
						//jpair pre

						_node11["isShowPin"] = it1.showPin;
						//jpair suf
						//jpair pre

						_node11["input"] = it1.oneAmount;
						//jpair suf
						_addJson(_node11, _$parent15);
					}_chFunc(_node10);_$parent14.children.push(_node10);
				}_chFunc(_node9);_$parent13.children.push(_node9);
			}_$temp = _node4;{
				var _$parent16 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrSize = 2;_node12.attrHash = 2820222986;_node12.attrs["style"] = "margin: 10px 0;";_node12.attrs["ev-input-change"] = "changeNumber";_$temp = _node12;{
					var _$parent17 = _$temp;var _node13 = { "attrs": {}, "tagName": "app-components-basicInput-basicInput", "sid": 9 };_node13.hasChild = false;_node13.child = null;_node13.attrHash = 0;_$temp = _node13;{
						var _$parent18 = _$temp;var _node14 = {}; //jpair pre

						_node14["prepend"] = it1.cfgData.countTitle[0];
						//jpair suf
						//jpair pre

						{
							var _jvalue4 = "";
							_jvalue4 = "0";
							//jpair suf

							_node14["placeholder"] = _jvalue4;
						}
						//jpair pre

						{
							var _jvalue5 = "";
							_jvalue5 = "number";
							//jpair suf

							_node14["itype"] = _jvalue5;
						}
						//jpair pre

						_node14["append"] = it1.cfgData.countTitle[1];
						//jpair suf
						//jpair pre

						_node14["input"] = it1.totalNum;
						//jpair suf
						_addJson(_node14, _$parent18);
					}_chFunc(_node13);_$parent17.children.push(_node13);
				}_chFunc(_node12);_$parent16.children.push(_node12);
			}_$temp = _node4;{
				var _$parent19 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 10 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 1163210031;_node15.attrs["style"] = "margin: 10px 0;";_$temp = _node15;{
					var _$parent20 = _$temp;var _node16 = { "attrs": {}, "tagName": "app-components-basicInput-basicInput", "sid": 11 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 0;_$temp = _node16;{
						var _$parent21 = _$temp;var _node17 = {}; //jpair pre

						_node17["prepend"] = it1.cfgData.messTitle[0];
						//jpair suf
						//jpair pre

						_node17["placeholder"] = it1.cfgData.messTitle[1];
						//jpair suf
						//jpair pre

						_node17["input"] = it1.message;
						//jpair suf
						_addJson(_node17, _$parent21);
					}_chFunc(_node16);_$parent20.children.push(_node16);
				}_chFunc(_node15);_$parent19.children.push(_node15);
			}_$temp = _node4;{
				var _$parent22 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 12 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 2713131367;_node18.attrs["w-class"] = "totalNum";_$temp = _node18;{
					var _$parent23 = _$temp;_addText(it1.totalAmount + " " + item.name, _$parent23);
				}_chFunc(_node18);_$parent22.children.push(_node18);
			}_$temp = _node4;{
				var _$parent24 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 13 };_node19.children = [];_node19.attrSize = 2;_node19.attrHash = 596930179;_node19.attrs["style"] = "margin: 0 40px;";_node19.attrs["ev-btn-tap"] = "send";_$temp = _node19;{
					var _$parent25 = _$temp;var _node20 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 14 };_node20.hasChild = false;_node20.child = null;_node20.attrHash = 0;_$temp = _node20;{
						var _$parent26 = _$temp;var _node21 = {}; //jpair pre

						_node21["name"] = it1.cfgData.btnName;
						//jpair suf
						//jpair pre

						{
							var _jvalue6 = "";
							_jvalue6 = "big";
							//jpair suf

							_node21["types"] = _jvalue6;
						}
						//jpair pre

						{
							var _jvalue7 = "";
							_jvalue7 = "background:#F46262;";
							//jpair suf

							_node21["style"] = _jvalue7;
						}
						_addJson(_node21, _$parent26);
					}_chFunc(_node20);_$parent25.children.push(_node20);
				}_chFunc(_node19);_$parent24.children.push(_node19);
			}_$temp = _node4;{
				var _$parent27 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 15 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 3885815947;_node22.attrs["style"] = "font-size: 24px;color: #888888;text-align: center;margin-top: 40px;";_$temp = _node22;{
					var _$parent28 = _$temp;_addText(it1.cfgData.tips[0], _$parent28);
				}_chFunc(_node22);_$parent27.children.push(_node22);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});