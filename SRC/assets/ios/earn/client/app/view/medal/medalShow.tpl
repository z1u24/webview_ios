(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";topBarTitle = { "zh_Hans": "勋章", "zh_Hant": "勳章", "en": "" };_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "widget", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 2388812205;_node2.attrs["w-tag"] = "app-components1-topBar-topBar2";_node2.tagName = _node2.attrs["w-tag"];_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["scrollHeight"] = 0;
				//jpair suf
				//jpair pre

				_node3["text"] = topBarTitle;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 2749889518;_node4.attrs["w-class"] = "content flex-col";_node4.attrs["class"] = "fadein";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 4;_node5.attrHash = 3761303842;{
					var attrvalue = "";attrvalue += it.isHave ? '' : 'grayscale';attrvalue += "";_node5.attrs["class"] = attrvalue;
				}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["class"]));_node5.attrs["id"] = "medalShow";_node5.attrs["w-class"] = "medal";{
					var _attrvalue = "";_attrvalue += "transform:translate( ";_attrvalue += it.moveX;_attrvalue += "px , ";_attrvalue += it.moveY;_attrvalue += "px ) scale(";_attrvalue += it.imgScale;_attrvalue += ");transition:";_attrvalue += it.imgScale !== 1 ? 'none' : 'transform 0.5s ease';_attrvalue += ";";_node5.attrs["style"] = _attrvalue;
				}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["style"]));if (it.isHave) {
					_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.childHash = 0;_node6.attrSize = 4;_node6.attrHash = 61700112;_node6.attrs["class"] = "sunShine";_node6.attrs["src"] = "../../res/image/medalShow_bg.png";_node6.attrs["width"] = "480px";_node6.attrs["height"] = "480px";_$parent6.children.push(_node6);
					}
				} else {
					_$temp = _node5;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.childHash = 2946814719;_node7.attrSize = 2;_node7.attrHash = 4211930561;_node7.attrs["class"] = "sunShine";_node7.attrs["style"] = "width:480px;height:480px";_$parent7.children.push(_node7);
					}
				}_$temp = _node5;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 6 };_node8.children = [];_node8.attrSize = 3;_node8.attrHash = 3830307928;_node8.attrs["w-class"] = "medal-img";{
						var _attrvalue2 = "";_attrvalue2 += "../../res/image/medals/";_attrvalue2 += it.medalImg;_attrvalue2 += ".png";_node8.attrs["src"] = _attrvalue2;
					}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["src"]));_node8.attrs["width"] = "480px";_chFunc(_node8);_$parent8.children.push(_node8);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 42359464;_node9.attrs["w-class"] = "flex-col";_node9.attrs["style"] = "margin-top: -100px;";_$temp = _node9;{
					var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.attrSize = 1;_node10.attrHash = 642504149;_node10.attrs["w-class"] = "medal-title";_node10.attrs["w-tag"] = "pi-ui-lang";_node10.tagName = _node10.attrs["w-tag"];_$temp = _node10;{
						var _$parent11 = _$temp;_addJson(it.medalTitle, _$parent11);
					}_chFunc(_node10);_$parent10.children.push(_node10);
				}if (it.medalType === 0) {
					_$temp = _node9;{
						var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "widget", "sid": 9 };_node11.hasChild = false;_node11.child = null;_node11.attrSize = 1;_node11.attrHash = 873744636;_node11.attrs["w-class"] = "medal-desc";_node11.attrs["w-tag"] = "pi-ui-lang";_node11.tagName = _node11.attrs["w-tag"];_$temp = _node11;{
							var _$parent13 = _$temp;var _node12 = {}; //jpair pre

							{
								var jvalue = "";
								jvalue += "挖矿达到";jvalue += it.condition;jvalue += "KT";
								//jpair suf

								_node12["zh_Hans"] = jvalue;
							}
							//jpair pre

							{
								var _jvalue = "";
								_jvalue += "挖礦達到";_jvalue += it.condition;_jvalue += "KT";
								//jpair suf

								_node12["zh_Hant"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "";
								//jpair suf

								_node12["en"] = _jvalue2;
							}
							_addJson(_node12, _$parent13);
						}_chFunc(_node11);_$parent12.children.push(_node11);
					}
				} else {
					_$temp = _node9;{
						var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "p", "sid": 10 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 2813371484;_node13.attrs["w-class"] = "medal-desc";_$temp = _node13;{
							var _$parent15 = _$temp;_addText(it.condition, _$parent15);
						}_chFunc(_node13);_$parent14.children.push(_node13);
					}
				}_chFunc(_node9);_$parent9.children.push(_node9);
			}if (it.isHave) {
				_$temp = _node4;{
					var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "widget", "sid": 11 };_node14.hasChild = false;_node14.child = null;_node14.childHash = 548463782;_node14.attrSize = 2;_node14.attrHash = 4121584340;_node14.attrs["on-tap"] = "putoutMedal";_node14.attrs["w-class"] = "medal-btn";_node14.attrs["w-tag"] = "pi-ui-lang";_node14.tagName = _node14.attrs["w-tag"];_$temp = _node14;{
						var _$parent17 = _$temp;var _node15 = {}; //jpair pre

						{
							var _jvalue3 = "";
							_jvalue3 = "挂出去";
							//jpair suf

							_node15["zh_Hans"] = _jvalue3;
						}
						//jpair pre

						{
							var _jvalue4 = "";
							_jvalue4 = "掛出去";
							//jpair suf

							_node15["zh_Hant"] = _jvalue4;
						}
						//jpair pre

						{
							var _jvalue5 = "";
							_jvalue5 = "";
							//jpair suf

							_node15["en"] = _jvalue5;
						}
						_addJson(_node15, _$parent17);
					}_$parent16.children.push(_node14);
				}
			} else {
				_$temp = _node4;{
					var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "widget", "sid": 12 };_node16.hasChild = false;_node16.child = null;_node16.childHash = 2292901380;_node16.attrHash = 2467408643;_node16.attrs["w-tag"] = "pi-ui-lang";_node16.tagName = _node16.attrs["w-tag"];_$temp = _node16;{
						var _$parent19 = _$temp;var _node17 = {}; //jpair pre

						{
							var _jvalue6 = "";
							_jvalue6 = "";
							//jpair suf

							_node17["zh_Hans"] = _jvalue6;
						}
						//jpair pre

						{
							var _jvalue7 = "";
							_jvalue7 = "";
							//jpair suf

							_node17["zh_Hant"] = _jvalue7;
						}
						//jpair pre

						{
							var _jvalue8 = "";
							_jvalue8 = "";
							//jpair suf

							_node17["en"] = _jvalue8;
						}
						_addJson(_node17, _$parent19);
					}_$parent18.children.push(_node16);
				}
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});