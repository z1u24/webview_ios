(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 2215604891;_node2.attrs["w-class"] = "title-container";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 3657751928;_node3.attrs["w-class"] = "user-container";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 3 };_node4.children = [];_node4.attrSize = 3;_node4.attrHash = 3210133245;{
						var attrvalue = "";attrvalue += it1.avatar ? it1.avatar : '../../../res/image1/default_avatar.png';attrvalue += "";_node4.attrs["src"] = attrvalue;
					}_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["src"]));_node4.attrs["w-class"] = "avatar";_node4.attrs["on-tap"] = "showMine";_chFunc(_node4);_$parent4.children.push(_node4);
				}_$temp = _node3;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 2866552653;_node5.attrs["w-class"] = "total-asset";_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = _installText("￥", 3615707983);;
						_$parent6.children.push(_node6);
					}_$temp = _node5;{
						var _$parent7 = _$temp;_addText(it1.totalAsset, _$parent7);
					}_chFunc(_node5);_$parent5.children.push(_node5);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 4105260532;_node7.attrs["w-class"] = "nav-wrap";_$temp = _node7;{
					var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1940417547;_node8.attrs["w-class"] = "nav";{
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
							var i = _$i++;var isActive = i === it1.activeNum;_$temp = _node8;{
								var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 1235456931;{
									var _attrvalue = "";_attrvalue += "nav-item ";_attrvalue += isActive ? 'is-active' : '';_attrvalue += "";_node9.attrs["w-class"] = _attrvalue;
								}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["w-class"]));{
									var _attrvalue2 = "";_attrvalue2 += "tabsChangeClick(e,";_attrvalue2 += i;_attrvalue2 += ")";_node9.attrs["on-tap"] = _attrvalue2;
								}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["on-tap"]));_$temp = _node9;{
									var _$parent11 = _$temp;_addText(v.tab, _$parent11);
								}_chFunc(_node9);_$parent10.children.push(_node9);
							}
						}
					}_chFunc(_node8);_$parent9.children.push(_node8);
				}_chFunc(_node7);_$parent8.children.push(_node7);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}{
			var _$i2 = 0;
			for (var _iterator2 = it1.tabs, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
				var _ref2;

				if (_isArray2) {
					if (_i2 >= _iterator2.length) break;
					_ref2 = _iterator2[_i2++];
				} else {
					_i2 = _iterator2.next();
					if (_i2.done) break;
					_ref2 = _i2.value;
				}

				var _v = _ref2;
				var _i3 = _$i2++;var _isActive = _i3 === it1.activeNum;_$temp = _node;{
					var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.attrSize = 1;_node10.attrHash = 262263398;{
						var _attrvalue3 = "";_attrvalue3 = _v.components;_node10.attrs["w-tag"] = _attrvalue3;
					}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["w-tag"]));_node10.tagName = _node10.attrs["w-tag"];{
						var _attrvalue4 = "";_attrvalue4 += "visibility: ";_attrvalue4 += _isActive ? 'visible' : 'hidden';_attrvalue4 += "; z-index:";_attrvalue4 += _isActive ? 0 : -1;_attrvalue4 += ";  width:100%;";_attrvalue4 += _isActive ? 'flex:1 0 0;' : 'height: 0;';_attrvalue4 += "";_node10.attrs["style"] = _attrvalue4;
					}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["style"]));_$temp = _node10;{
						var _$parent13 = _$temp;var _node11 = {}; //jpair pre

						_node11["isActive"] = _isActive;
						//jpair suf
						_addJson(_node11, _$parent13);
					}_chFunc(_node10);_$parent12.children.push(_node10);
				}
			}
		}_chFunc(_node);return _node;
	}
});