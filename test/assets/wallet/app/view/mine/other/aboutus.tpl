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
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.childHash = 3035325139;_node5.attrSize = 1;_node5.attrHash = 3169715147;_node5.attrs["w-class"] = "aboutus-img";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.childHash = 0;_node6.attrSize = 2;_node6.attrHash = 3547507648;_node6.attrs["src"] = "../../../res/image/img_logo.png";_node6.attrs["w-class"] = "logoimg";_$parent6.children.push(_node6);
				}_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 866865791;_node7.attrs["w-class"] = "version";_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = _installText("V", 232847882);;
					_$parent8.children.push(_node8);
				}_$temp = _node7;{
					var _$parent9 = _$temp;_addText(it1.version, _$parent9);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_$temp = _node4;{
				var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2002705810;_node9.attrs["w-class"] = "shortmess";_$temp = _node9;{
					var _$parent11 = _$temp;_addText(it1.cfgData.shortMess, _$parent11);
				}_chFunc(_node9);_$parent10.children.push(_node9);
			}{
				var _$i = 0;
				for (var _iterator = it1.data, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
					var _ref;

					if (_isArray) {
						if (_i >= _iterator.length) break;
						_ref = _iterator[_i++];
					} else {
						_i = _iterator.next();
						if (_i.done) break;
						_ref = _i.value;
					}

					var val = _ref;
					var ind = _$i++;_$temp = _node4;{
						var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 1810915363;{
							var attrvalue = "";attrvalue += "itemClick(e,";attrvalue += ind;attrvalue += ")";_node10.attrs["on-tap"] = attrvalue;
						}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["on-tap"]));_$temp = _node10;{
							var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "app-components-basicItem-basicItem", "sid": 8 };_node11.hasChild = false;_node11.child = null;_node11.attrHash = 0;_$temp = _node11;{
								var _$parent14 = _$temp;var _node12 = {}; //jpair pre

								_node12["name"] = val.value;
								//jpair suf
								//jpair pre

								_node12["describe"] = val.desc;
								//jpair suf
								_addJson(_node12, _$parent14);
							}_chFunc(_node11);_$parent13.children.push(_node11);
						}_chFunc(_node10);_$parent12.children.push(_node10);
					}
				}
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});