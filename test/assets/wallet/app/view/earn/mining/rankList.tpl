(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 1913733026;_node.attrs["class"] = "new-page";_node.attrs["ev-next-click"] = "goHistory";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["style"] = "display: flex;flex-direction: column;";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 2215604891;_node2.attrs["w-class"] = "title-container";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["title"] = it1.cfgData.topBarTitle;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "linear-gradient(to right,#25D8A0,#33CACC)";
						//jpair suf

						_node4["background"] = jvalue;
					}
					//jpair pre

					{
						var _jvalue = "";
						_jvalue = "../../res/image/26_white.png";
						//jpair suf

						_node4["nextImg"] = _jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 1940417547;_node5.attrs["w-class"] = "nav";{
					var _$i = 0;
					for (var _iterator = it1.tabs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
						var _ref;

						if (_isArray) {
							if (_i >= _iterator.length) break;
							_ref = _iterator[_i++];
						} else {
							_i = _iterator.next();
							if (_i.done) break;
							_ref = _i.value;
						}

						var v = _ref;
						var i = _$i++;var isActive = i == it1.activeNum;_$temp = _node5;{
							var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 962646855;{
								var attrvalue = "";attrvalue += "nav-item ";attrvalue += isActive ? 'is-active' : '';attrvalue += "";_node6.attrs["w-class"] = attrvalue;
							}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["w-class"]));{
								var _attrvalue = "";_attrvalue += "tabsChangeClick(";_attrvalue += i;_attrvalue += ")";_node6.attrs["on-tap"] = _attrvalue;
							}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["on-tap"]));_$temp = _node6;{
								var _$parent7 = _$temp;_addText(v.tab, _$parent7);
							}_chFunc(_node6);_$parent6.children.push(_node6);
						}
					}
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "app-view-earn-mining-miningRank", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
				var _$parent9 = _$temp;_addJson(it1.tabs[it1.activeNum], _$parent9);
			}_chFunc(_node7);_$parent8.children.push(_node7);
		}_chFunc(_node);return _node;
	}
});