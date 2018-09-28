(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 68049059;_node2.attrs["w-class"] = "top-bar";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 977460424;_node3.attrs["w-class"] = "top-bar-container";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 3 };_node4.children = [];_node4.childHash = 0;_node4.attrSize = 3;_node4.attrHash = 811906972;_node4.attrs["on-tap"] = "backPrePage";_node4.attrs["src"] = "../../../res/image/left_arrow_blue.png";_node4.attrs["w-class"] = "ga-back";_$parent4.children.push(_node4);
				}_$temp = _node3;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 3;_node5.attrHash = 3790413469;_node5.attrs["w-class"] = "input-father";_node5.attrs["ev-input-change"] = "searchTextChange";_node5.attrs["ev-input-clear"] = "searchTextClear";_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "app-components-input-suffixInput", "sid": 5 };_node6.hasChild = false;_node6.child = null;_node6.attrHash = 0;_$temp = _node6;{
							var _$parent7 = _$temp;var _node7 = {}; //jpair pre

							{
								var jvalue = "";
								jvalue = "Search";
								//jpair suf

								_node7["placeHolder"] = jvalue;
							}
							//jpair pre

							_node7["clearable"] = true;
							//jpair suf
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "background-color:#f3f6f9;";
								//jpair suf

								_node7["style"] = _jvalue;
							}
							_addJson(_node7, _$parent7);
						}_chFunc(_node6);_$parent6.children.push(_node6);
					}_chFunc(_node5);_$parent5.children.push(_node5);
				}_$temp = _node3;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.childHash = 1389856324;_node8.attrSize = 1;_node8.attrHash = 158911223;_node8.attrs["on-tap"] = "searchClick";_$temp = _node8;{
						var _$parent9 = _$temp;var _node9 = _installText("搜索", 2457836845);;
						_$parent9.children.push(_node9);
					}_$parent8.children.push(_node8);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 4252679546;_node10.attrs["w-class"] = "body";if (it1.showAssetList.length <= 0) {
				_$temp = _node10;{
					var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.childHash = 987660516;_node11.attrSize = 1;_node11.attrHash = 3400304430;_node11.attrs["w-class"] = "no-record";_$temp = _node11;{
						var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 9 };_node12.children = [];_node12.childHash = 0;_node12.attrSize = 2;_node12.attrHash = 2587700459;_node12.attrs["src"] = "../../../res/image/search_no.png";_node12.attrs["w-class"] = "no-record-icon";_$parent12.children.push(_node12);
					}_$temp = _node11;{
						var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.childHash = 3081176933;_node13.attrHash = 0;_$temp = _node13;{
							var _$parent14 = _$temp;var _node14 = _installText("没有找到您想要的", 2774545884);;
							_$parent14.children.push(_node14);
						}_$parent13.children.push(_node13);
					}_$parent11.children.push(_node11);
				}
			} else {
				_$temp = _node10;{
					var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 11 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 1592626594;_node15.attrs["w-class"] = "asset-list";{
						var _$i = 0;
						for (var _iterator = it1.showAssetList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var i = _$i++;_$temp = _node15;{
								var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 12 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 1972608002;_node16.attrs["w-class"] = "list-item";_$temp = _node16;{
									var _$parent17 = _$temp;var _node17 = { "attrs": {}, "tagName": "app-components-threeParaItem-threeParaItem", "sid": 13 };_node17.hasChild = false;_node17.child = null;_node17.attrHash = 0;_$temp = _node17;{
										var _$parent18 = _$temp;var _node18 = {}; //jpair pre

										{
											var _jvalue2 = "";
											_jvalue2 += v.currencyName;_jvalue2 += ".png";
											//jpair suf

											_node18["img"] = _jvalue2;
										}
										//jpair pre

										_node18["title"] = v.currencyName;
										//jpair suf
										//jpair pre

										_node18["desc"] = v.description;
										//jpair suf
										_addJson(_node18, _$parent18);
									}_chFunc(_node17);_$parent17.children.push(_node17);
								}if (v.canSwtiched) {
									_$temp = _node16;{
										var _$parent19 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.attrSize = 2;_node19.attrHash = 1829124678;_node19.attrs["w-class"] = "swtich-btn";{
											var attrvalue = "";attrvalue += "onSwitchChange(e,";attrvalue += i;attrvalue += ")";_node19.attrs["ev-switch-click"] = attrvalue;
										}_node19.attrHash = _hash.nextHash(_node19.attrHash, _calTextHash(_node19.attrs["ev-switch-click"]));_$temp = _node19;{
											var _$parent20 = _$temp;var _node20 = { "attrs": {}, "tagName": "app-components-switch-switch", "sid": 15 };_node20.hasChild = false;_node20.child = null;_node20.attrHash = 0;_$temp = _node20;{
												var _$parent21 = _$temp;var _node21 = {}; //jpair pre

												_node21["types"] = v.added;
												//jpair suf
												_addJson(_node21, _$parent21);
											}_chFunc(_node20);_$parent20.children.push(_node20);
										}_chFunc(_node19);_$parent19.children.push(_node19);
									}
								}_chFunc(_node16);_$parent16.children.push(_node16);
							}
						}
					}_chFunc(_node15);_$parent15.children.push(_node15);
				}
			}_chFunc(_node10);_$parent10.children.push(_node10);
		}_chFunc(_node);return _node;
	}
});