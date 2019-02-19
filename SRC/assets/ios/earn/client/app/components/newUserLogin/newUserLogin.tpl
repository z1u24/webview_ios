(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 3097205650;_node.attrs["w-class"] = "modal-mask";_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 937271183;_node2.attrs["w-class"] = "body";_node2.attrs["class"] = "smallToBig";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.childHash = 4092651458;_node3.attrSize = 1;_node3.attrHash = 50958641;_node3.attrs["w-class"] = "one";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "widget", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.childHash = 3903465604;_node4.attrSize = 1;_node4.attrHash = 1739807805;_node4.attrs["w-class"] = "tips";_node4.attrs["w-tag"] = "pi-ui-lang";_node4.tagName = _node4.attrs["w-tag"];_$temp = _node4;{
						var _$parent5 = _$temp;var _node5 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "新用户登录成功";
							//jpair suf

							_node5["zh_Hans"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "新用戶登錄成功";
							//jpair suf

							_node5["zh_Hant"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "";
							//jpair suf

							_node5["en"] = _jvalue2;
						}
						_addJson(_node5, _$parent5);
					}_$parent4.children.push(_node4);
				}_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 2845724276;_node6.attrs["w-class"] = "two";{
					var _$i = 0;
					for (var _iterator = it.prizeList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
						var i = _$i++;_$temp = _node6;{
							var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 2317233806;_node7.attrs["w-class"] = "two-img";_$temp = _node7;{
								var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 6 };_node8.children = [];_node8.attrSize = 4;_node8.attrHash = 1929919945;{
									var attrvalue = "";attrvalue += "../../res/image/virtualGoods/";attrvalue += item.info.pid;attrvalue += ".jpg";_node8.attrs["src"] = attrvalue;
								}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["src"]));_node8.attrs["style"] = "border-radius: 50%;";_node8.attrs["width"] = "200px";_node8.attrs["height"] = "200px";_chFunc(_node8);_$parent8.children.push(_node8);
							}_chFunc(_node7);_$parent7.children.push(_node7);
						}_$temp = _node6;{
							var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node9.hasChild = false;_node9.child = null;_node9.attrSize = 1;_node9.attrHash = 1739807805;_node9.attrs["w-class"] = "tips";_node9.attrs["w-tag"] = "pi-ui-lang";_node9.tagName = _node9.attrs["w-tag"];_$temp = _node9;{
								var _$parent10 = _$temp;var _node10 = {}; //jpair pre

								{
									var _jvalue3 = "";
									_jvalue3 += item.info.zh_hans + item.count + item.info.unit;_jvalue3 += "";
									//jpair suf

									_node10["zh_Hans"] = _jvalue3;
								}
								//jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 += item.info.zh_hant + item.count + item.info.unit;_jvalue4 += "";
									//jpair suf

									_node10["zh_Hant"] = _jvalue4;
								}
								//jpair pre

								{
									var _jvalue5 = "";
									_jvalue5 = "";
									//jpair suf

									_node10["en"] = _jvalue5;
								}
								_addJson(_node10, _$parent10);
							}_chFunc(_node9);_$parent9.children.push(_node9);
						}
					}
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.childHash = 41651616;_node11.attrSize = 3;_node11.attrHash = 3834618450;_node11.attrs["w-class"] = "closeBtn";_node11.attrs["class"] = "smallToBig";_node11.attrs["on-tap"] = "close";_$temp = _node11;{
				var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 9 };_node12.children = [];_node12.childHash = 0;_node12.attrSize = 3;_node12.attrHash = 1767696083;_node12.attrs["src"] = "../../res/image1/close-white.png";_node12.attrs["width"] = "30px;";_node12.attrs["height"] = "30px;";_$parent12.children.push(_node12);
			}_$parent11.children.push(_node11);
		}_chFunc(_node);return _node;
	}
});