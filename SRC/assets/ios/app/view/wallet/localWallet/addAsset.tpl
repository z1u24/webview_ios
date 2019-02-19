(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-blankDiv-topDiv", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 2946814719;_node2.attrHash = 0;_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 68049059;_node3.attrs["w-class"] = "top-bar";_$temp = _node3;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 977460424;_node4.attrs["w-class"] = "top-bar-container";_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 3;_node5.attrHash = 811906972;_node5.attrs["on-tap"] = "backPrePage";_node5.attrs["src"] = "../../../res/image/left_arrow_blue.png";_node5.attrs["w-class"] = "ga-back";_$parent5.children.push(_node5);
				}_$temp = _node4;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 3;_node6.attrHash = 3790413469;_node6.attrs["w-class"] = "input-father";_node6.attrs["ev-input-change"] = "searchTextChange";_node6.attrs["ev-input-clear"] = "searchTextClear";Search = { "zh_Hans": "Search", "zh_Hant": "Search", "en": "" };_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 6 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
							var _$parent8 = _$temp;var _node8 = {}; //jpair pre

							_node8["placeHolder"] = Search;
							//jpair suf
							//jpair pre

							{
								var jvalue = "";
								jvalue = "true";
								//jpair suf

								_node8["clearable"] = jvalue;
							}
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "background-color:#f3f6f9;";
								//jpair suf

								_node8["style"] = _jvalue;
							}
							//jpair pre

							_node8["notUnderLine"] = true;
							//jpair suf
							_addJson(_node8, _$parent8);
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node4;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.childHash = 2332833319;_node9.attrSize = 2;_node9.attrHash = 2591522053;_node9.attrs["on-tap"] = "searchClick";_node9.attrs["style"] = "border: 24px solid transparent;";_$temp = _node9;{
						var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.childHash = 3295833308;_node10.attrHash = 0;_$temp = _node10;{
							var _$parent11 = _$temp;var _node11 = {}; //jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "搜索";
								//jpair suf

								_node11["zh_Hans"] = _jvalue2;
							}
							//jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "搜索";
								//jpair suf

								_node11["zh_Hant"] = _jvalue3;
							}
							//jpair pre

							{
								var _jvalue4 = "";
								_jvalue4 = "";
								//jpair suf

								_node11["en"] = _jvalue4;
							}
							_addJson(_node11, _$parent11);
						}_$parent10.children.push(_node10);
					}_$parent9.children.push(_node9);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}_chFunc(_node3);_$parent3.children.push(_node3);
		}_$temp = _node;{
			var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 4252679546;_node12.attrs["w-class"] = "body";if (it.showAssetList.length <= 0) {
				_$temp = _node12;{
					var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.childHash = 2578216191;_node13.attrSize = 1;_node13.attrHash = 3400304430;_node13.attrs["w-class"] = "no-record";_$temp = _node13;{
						var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "img", "sid": 11 };_node14.children = [];_node14.childHash = 0;_node14.attrSize = 2;_node14.attrHash = 2587700459;_node14.attrs["src"] = "../../../res/image/search_no.png";_node14.attrs["w-class"] = "no-record-icon";_$parent14.children.push(_node14);
					}_$temp = _node13;{
						var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 12 };_node15.children = [];_node15.childHash = 3565829092;_node15.attrHash = 0;_$temp = _node15;{
							var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 13 };_node16.hasChild = false;_node16.child = null;_node16.childHash = 1363042275;_node16.attrHash = 0;_$temp = _node16;{
								var _$parent17 = _$temp;var _node17 = {}; //jpair pre

								{
									var _jvalue5 = "";
									_jvalue5 = "沒有找到您想要的";
									//jpair suf

									_node17["zh_Hans"] = _jvalue5;
								}
								//jpair pre

								{
									var _jvalue6 = "";
									_jvalue6 = "沒有找到您想要的";
									//jpair suf

									_node17["zh_Hant"] = _jvalue6;
								}
								//jpair pre

								{
									var _jvalue7 = "";
									_jvalue7 = "";
									//jpair suf

									_node17["en"] = _jvalue7;
								}
								_addJson(_node17, _$parent17);
							}_$parent16.children.push(_node16);
						}_$parent15.children.push(_node15);
					}_$parent13.children.push(_node13);
				}
			} else {
				_$temp = _node12;{
					var _$parent18 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 14 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 1592626594;_node18.attrs["w-class"] = "asset-list";{
						var _$i = 0;
						for (var _iterator = it.showAssetList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var i = _$i++;_$temp = _node18;{
								var _$parent19 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 15 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 1972608002;_node19.attrs["w-class"] = "list-item";_$temp = _node19;{
									var _$parent20 = _$temp;var _node20 = { "attrs": {}, "tagName": "app-components-threeParaItem-threeParaItem", "sid": 16 };_node20.hasChild = false;_node20.child = null;_node20.attrHash = 0;_$temp = _node20;{
										var _$parent21 = _$temp;var _node21 = {}; //jpair pre

										{
											var _jvalue8 = "";
											_jvalue8 += v.currencyName;_jvalue8 += ".png";
											//jpair suf

											_node21["img"] = _jvalue8;
										}
										//jpair pre

										_node21["title"] = v.currencyName;
										//jpair suf
										//jpair pre

										_node21["desc"] = v.description;
										//jpair suf
										_addJson(_node21, _$parent21);
									}_chFunc(_node20);_$parent20.children.push(_node20);
								}if (v.canSwtiched) {
									_$temp = _node19;{
										var _$parent22 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 17 };_node22.children = [];_node22.attrSize = 2;_node22.attrHash = 1829124678;_node22.attrs["w-class"] = "swtich-btn";{
											var attrvalue = "";attrvalue += "onSwitchChange(e,";attrvalue += i;attrvalue += ")";_node22.attrs["ev-switch-click"] = attrvalue;
										}_node22.attrHash = _hash.nextHash(_node22.attrHash, _calTextHash(_node22.attrs["ev-switch-click"]));_$temp = _node22;{
											var _$parent23 = _$temp;var _node23 = { "attrs": {}, "tagName": "app-components-switch-switch", "sid": 18 };_node23.hasChild = false;_node23.child = null;_node23.attrHash = 0;_$temp = _node23;{
												var _$parent24 = _$temp;var _node24 = {}; //jpair pre

												_node24["types"] = v.added;
												//jpair suf
												_addJson(_node24, _$parent24);
											}_chFunc(_node23);_$parent23.children.push(_node23);
										}_chFunc(_node22);_$parent22.children.push(_node22);
									}
								}_chFunc(_node19);_$parent19.children.push(_node19);
							}
						}
					}_chFunc(_node18);_$parent18.children.push(_node18);
				}
			}_chFunc(_node12);_$parent12.children.push(_node12);
		}_chFunc(_node);return _node;
	}
});