(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 818483009;_node.attrs["style"] = "width:100%;height:100%;display: flex;";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 904429599;_node2.attrs["w-class"] = "tabs";if (it.type === 0) {
				{
					var _$i = 0;
					for (var _iterator = it.tabBarList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
						var i = _$i++;if (i == it.isActive) {
							_$temp = _node2;{
								var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "widget", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrSize = 1;_node3.attrHash = 264436563;{
									var attrvalue = "";attrvalue = v.components;_node3.attrs["w-tag"] = attrvalue;
								}_node3.attrHash = _hash.nextHash(_node3.attrHash, _calTextHash(_node3.attrs["w-tag"]));_node3.tagName = _node3.attrs["w-tag"];_node3.attrs["style"] = "visibility:visible;z-index:0;position:absolute;width:100%;height:100%;";_$temp = _node3;{
									var _$parent4 = _$temp;var _node4 = {}; //jpair pre

									_node4["isActive"] = i == it.isActive;
									//jpair suf
									_addJson(_node4, _$parent4);
								}_chFunc(_node3);_$parent3.children.push(_node3);
							}
						} else if (it.old[i]) {
							_$temp = _node2;{
								var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "widget", "sid": 3 };_node5.hasChild = false;_node5.child = null;_node5.attrSize = 1;_node5.attrHash = 2140759890;{
									var _attrvalue = "";_attrvalue = v.components;_node5.attrs["w-tag"] = _attrvalue;
								}_node5.attrHash = _hash.nextHash(_node5.attrHash, _calTextHash(_node5.attrs["w-tag"]));_node5.tagName = _node5.attrs["w-tag"];_node5.attrs["style"] = "visibility:hidden;z-index:-1;position: absolute;width:100%;height:100%;";_$temp = _node5;{
									var _$parent6 = _$temp;var _node6 = {}; //jpair pre

									_node6["isActive"] = i == it.isActive;
									//jpair suf
									_addJson(_node6, _$parent6);
								}_chFunc(_node5);_$parent5.children.push(_node5);
							}
						}
					}
				}
			} else if (it.type === 1) {
				_$temp = _node2;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "widget", "sid": 4 };_node7.hasChild = false;_node7.child = null;_node7.attrSize = 1;_node7.attrHash = 3518817415;{
						var _attrvalue2 = "";_attrvalue2 = it.tabBarList[it.isActive].components;_node7.attrs["w-tag"] = _attrvalue2;
					}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["w-tag"]));_node7.tagName = _node7.attrs["w-tag"];_node7.attrs["style"] = "position:absolute;width:100%;height:100%;";_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = {}; //jpair pre

						_node8["isActive"] = false;
						//jpair suf
						_addJson(_node8, _$parent8);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}
			} else {
				{
					var _$i2 = 0;
					for (var _iterator2 = it.tabBarList, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
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
						var _i3 = _$i2++;_$temp = _node2;{
							var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 5 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 727777735;{
								var _attrvalue3 = "";_attrvalue3 += "visibility: ";_attrvalue3 += _v.modulName == it.isActive ? 'visible' : 'hidden';_attrvalue3 += "; z-index:";_attrvalue3 += _v.modulName == it.isActive ? 0 : -1;_attrvalue3 += "; position:absolute; width:100%;height:100%;";_node9.attrs["style"] = _attrvalue3;
							}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["style"]));_$temp = _node9;{
								var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 6 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 782767477;{
									var _attrvalue4 = "";_attrvalue4 = _v.components;_node10.attrs["w-tag"] = _attrvalue4;
								}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["w-tag"]));_node10.tagName = _node10.attrs["w-tag"];_$temp = _node10;{
									var _$parent11 = _$temp;var _node11 = {}; //jpair pre

									_node11["isActive"] = _v.modulName == it.isActive;
									//jpair suf
									_addJson(_node11, _$parent11);
								}_chFunc(_node10);_$parent10.children.push(_node10);
							}_chFunc(_node9);_$parent9.children.push(_node9);
						}
					}
				}
			}if (it.loading) {
				_$temp = _node2;{
					var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 7 };_node12.children = [];_node12.childHash = 1119818784;_node12.attrSize = 1;_node12.attrHash = 1568276380;_node12.attrs["w-class"] = "loading-container";_$temp = _node12;{
						var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "app-components1-loading-loading1", "sid": 8 };_node13.hasChild = false;_node13.child = null;_node13.childHash = 2359726162;_node13.attrHash = 0;_$temp = _node13;{
							var _$parent14 = _$temp;var _node14 = {};_addJson(_node14, _$parent14);
						}_$parent13.children.push(_node13);
					}_$parent12.children.push(_node12);
				}
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 9 };_node15.children = [];_node15.attrSize = 3;_node15.attrHash = 623601314;_node15.attrs["w-class"] = "ga-bottom-tab-bar-container";{
				var _attrvalue5 = "";_attrvalue5 += it.tabBarAnimateClasss;_attrvalue5 += "";_node15.attrs["class"] = _attrvalue5;
			}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["class"]));_node15.attrs["style"] = "display:none;";_$temp = _node15;{
				var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 10 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 4187184062;_node16.attrs["style"] = " display: flex;height: 110px;width: 100%;";{
					var _$i3 = 0;
					for (var _iterator3 = it.tabBarList, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
						var _ref3;

						if (_isArray3) {
							if (_i4 >= _iterator3.length) break;
							_ref3 = _iterator3[_i4++];
						} else {
							_i4 = _iterator3.next();
							if (_i4.done) break;
							_ref3 = _i4.value;
						}

						var item = _ref3;
						var index = _$i3++;_$temp = _node16;{
							var _$parent17 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 11 };_node17.children = [];_node17.attrSize = 2;_node17.attrHash = 848835576;{
								var _attrvalue6 = "";_attrvalue6 += "ga-tab-bar-item ";_attrvalue6 += it.isActive == item.modulName ? 'ga-tab-bar-item-active' : '';_attrvalue6 += "";_node17.attrs["w-class"] = _attrvalue6;
							}_node17.attrHash = _hash.nextHash(_node17.attrHash, _calTextHash(_node17.attrs["w-class"]));{
								var _attrvalue7 = "";_attrvalue7 += "tabBarChangeListener(e,";_attrvalue7 += index;_attrvalue7 += ")";_node17.attrs["on-down"] = _attrvalue7;
							}_node17.attrHash = _hash.nextHash(_node17.attrHash, _calTextHash(_node17.attrs["on-down"]));_$temp = _node17;{
								var _$parent18 = _$temp;var _node18 = { "attrs": {}, "tagName": "img", "sid": 12 };_node18.children = [];_node18.attrSize = 2;_node18.attrHash = 231184886;{
									var _attrvalue8 = "";_attrvalue8 += "../../res/image1/";_attrvalue8 += it.isActive == item.modulName ? item.iconActive : item.icon;_attrvalue8 += "";_node18.attrs["src"] = _attrvalue8;
								}_node18.attrHash = _hash.nextHash(_node18.attrHash, _calTextHash(_node18.attrs["src"]));_node18.attrs["w-class"] = "ga-tab-bar-icon";_chFunc(_node18);_$parent18.children.push(_node18);
							}_$temp = _node17;{
								var _$parent19 = _$temp;var _node19 = { "attrs": {}, "tagName": "span", "sid": 13 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 1456402504;_node19.attrs["w-class"] = "ga-tab-bar-text";_$temp = _node19;{
									var _$parent20 = _$temp;var _node20 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 14 };_node20.hasChild = false;_node20.child = null;_node20.attrHash = 0;_$temp = _node20;{
										var _$parent21 = _$temp;_addJson(item.text, _$parent21);
									}_chFunc(_node20);_$parent20.children.push(_node20);
								}_chFunc(_node19);_$parent19.children.push(_node19);
							}_chFunc(_node17);_$parent17.children.push(_node17);
						}
					}
				}_chFunc(_node16);_$parent16.children.push(_node16);
			}_chFunc(_node15);_$parent15.children.push(_node15);
		}_chFunc(_node);return _node;
	}
});