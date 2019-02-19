(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 5;_node.attrHash = 2044154398;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["on-tap"] = "closeSetting";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-next-click"] = "goSetting";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 928170999;_node2.attrs["style"] = "background:black;";topBarTitle = { "zh_Hans": "LOL赛事竞猜", "zh_Hant": "LOL賽事競猜", "en": "" };_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "widget", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 2388812205;_node3.attrs["w-tag"] = "app-components1-topBar-topBar2";_node3.tagName = _node3.attrs["w-tag"];_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["scrollHeight"] = 0;
					//jpair suf
					//jpair pre

					_node4["text"] = topBarTitle;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "../../res/image/26_white.png";
						//jpair suf

						_node4["nextImg"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 487306359;_node5.attrs["w-class"] = "content";if (it.showMoreSetting) {
				_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 1902335354;_node6.attrs["w-class"] = "moreSetting";_node6.attrs["on-tap"] = "setting(0)";if (it.noPassword) {
						_$temp = _node6;{
							var _$parent7 = _$temp;var _node7 = _installText("关闭免密支付", 1567336438);;
							_$parent7.children.push(_node7);
						}
					} else {
						_$temp = _node6;{
							var _$parent8 = _$temp;var _node8 = _installText("开启免密支付", 317932040);;
							_$parent8.children.push(_node8);
						}
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}
			}_$temp = _node5;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 5 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 621309583;_node9.attrs["w-class"] = "topbar";{
					var _$i = 0;
					for (var _iterator = it.topbarList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
						var i = _$i++;_$temp = _node9;{
							var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 6 };_node10.children = [];_node10.attrSize = 2;_node10.attrHash = 1631625710;{
								var attrvalue = "";attrvalue += "changeTopbar(";attrvalue += i;attrvalue += ")";_node10.attrs["on-tap"] = attrvalue;
							}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["on-tap"]));{
								var _attrvalue = "";_attrvalue += "topbar-itme ";_attrvalue += item.name === it.selectTopbar.name ? 'topbar-item-sel' : '';_attrvalue += "";_node10.attrs["w-class"] = _attrvalue;
							}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["w-class"]));_$temp = _node10;{
								var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node11.hasChild = false;_node11.child = null;_node11.attrHash = 2467408643;_node11.attrs["w-tag"] = "pi-ui-lang";_node11.tagName = _node11.attrs["w-tag"];_$temp = _node11;{
									var _$parent12 = _$temp;_addJson(item.title, _$parent12);
								}_chFunc(_node11);_$parent11.children.push(_node11);
							}_chFunc(_node10);_$parent10.children.push(_node10);
						}
					}
				}_chFunc(_node9);_$parent9.children.push(_node9);
			}_$temp = _node5;{
				var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 1357212223;_node12.attrs["style"] = "height:100%;";_$temp = _node12;{
					var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "widget", "sid": 9 };_node13.hasChild = false;_node13.child = null;_node13.attrHash = 2721375664;{
						var _attrvalue2 = "";_attrvalue2 += it.selectTopbar.component;_attrvalue2 += "";_node13.attrs["w-tag"] = _attrvalue2;
					}_node13.attrHash = _hash.nextHash(_node13.attrHash, _calTextHash(_node13.attrs["w-tag"]));_node13.tagName = _node13.attrs["w-tag"];_chFunc(_node13);_$parent14.children.push(_node13);
				}_chFunc(_node12);_$parent13.children.push(_node12);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});