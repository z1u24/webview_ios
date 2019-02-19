(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;var opca = it.scrollHeight / 200 || 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1979317745;{
			var attrvalue = "";attrvalue += opca > 0 ? 'background:rgba(255, 255, 255, ' + opca + ');border-bottom: 1px solid #cccccc;' : '';attrvalue += "";_node.attrs["style"] = attrvalue;
		}_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["style"]));_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-blankDiv-topDiv", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 2946814719;_node2.attrHash = 0;_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 3880895855;_node3.attrs["w-class"] = "ga-top-banner";_$temp = _node3;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 1631622133;_node4.attrs["w-class"] = "left-container";_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.attrSize = 3;_node5.attrHash = 782177186;_node5.attrs["on-tap"] = "backPrePage";{
						var _attrvalue = "";_attrvalue += "../../res/image/";_attrvalue += opca > 0 ? 'left_arrow_blue.png' : 'left_arrow_white.png';_attrvalue += "";_node5.attrs["src"] = _attrvalue;
					}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["src"]));_node5.attrs["w-class"] = "ga-back";_chFunc(_node5);_$parent5.children.push(_node5);
				}_$temp = _node4;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "span", "sid": 5 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 2855747751;_node6.attrs["on-tap"] = "backPrePage";{
						var _attrvalue2 = "";_attrvalue2 += "color: ";_attrvalue2 += opca > 0 ? '#222' : '#fff';_attrvalue2 += "";_node6.attrs["style"] = _attrvalue2;
					}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["style"]));if (typeof it.text == "string") {
						_$temp = _node6;{
							var _$parent7 = _$temp;_addText(it.text, _$parent7);
						}
					} else {
						_$temp = _node6;{
							var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 6 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
								var _$parent9 = _$temp;_addJson(it.text, _$parent9);
							}_chFunc(_node7);_$parent8.children.push(_node7);
						}
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}if (it1) {
					_$temp = _node4;{
						var _$parent10 = _$temp;var _node8 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node8.hasChild = false;_node8.child = null;_node8.childHash = 907704923;_node8.attrSize = 1;_node8.attrHash = 1927727582;_node8.attrs["w-tag"] = "pi-ui-lang";_node8.tagName = _node8.attrs["w-tag"];_node8.attrs["w-class"] = "offline";_$temp = _node8;{
							var _$parent11 = _$temp;var _node9 = {}; //jpair pre

							{
								var jvalue = "";
								jvalue = "离线";
								//jpair suf

								_node9["zh_Hans"] = jvalue;
							}
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "離線";
								//jpair suf

								_node9["zh_Hant"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "Offline";
								//jpair suf

								_node9["en"] = _jvalue2;
							}
							_addJson(_node9, _$parent11);
						}_$parent10.children.push(_node8);
					}
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}if (it.nextImg) {
				_$temp = _node3;{
					var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "img", "sid": 8 };_node10.children = [];_node10.attrSize = 3;_node10.attrHash = 261073340;_node10.attrs["on-tap"] = "goNext";{
						var _attrvalue3 = "";_attrvalue3 = it.nextImg;_node10.attrs["src"] = _attrvalue3;
					}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["src"]));_node10.attrs["w-class"] = "ga-next";_chFunc(_node10);_$parent12.children.push(_node10);
				}
			}_$temp = _node3;{
				var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "img", "sid": 9 };_node11.children = [];_node11.attrSize = 4;_node11.attrHash = 738498029;_node11.attrs["on-tap"] = "refreshPage";{
					var _attrvalue4 = "";_attrvalue4 += "../../res/image1/";_attrvalue4 += opca > 0 ? 'refresh_blue.png' : 'refresh_white.png';_attrvalue4 += "";_node11.attrs["src"] = _attrvalue4;
				}_node11.attrHash = _hash.nextHash(_node11.attrHash, _calTextHash(_node11.attrs["src"]));_node11.attrs["w-class"] = "refreshBtn";{
					var _attrvalue5 = "";_attrvalue5 += it.refresh ? 'refreshing' : '';_attrvalue5 += "";_node11.attrs["class"] = _attrvalue5;
				}_node11.attrHash = _hash.nextHash(_node11.attrHash, _calTextHash(_node11.attrs["class"]));_chFunc(_node11);_$parent13.children.push(_node11);
			}_chFunc(_node3);_$parent3.children.push(_node3);
		}_chFunc(_node);return _node;
	}
});