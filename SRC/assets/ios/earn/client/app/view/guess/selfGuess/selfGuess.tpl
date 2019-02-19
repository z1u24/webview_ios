(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 4252679546;_node.attrs["w-class"] = "body";{
			var _$i = 0;
			for (var _iterator = it.myGuessList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
				var i = _$i++;_$temp = _node;{
					var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 738844491;{
						var attrvalue = "";attrvalue += "goDetail(";attrvalue += i;attrvalue += ")";_node2.attrs["on-tap"] = attrvalue;
					}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["on-tap"]));_$temp = _node2;{
						var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "widget", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 1529494859;_node3.attrs["w-tag"] = "earn-client-app-components-guessItem-guessItem";_node3.tagName = _node3.attrs["w-tag"];_$temp = _node3;{
							var _$parent4 = _$temp;var _node4 = {}; //jpair pre

							_node4["guessData"] = item.guessData;
							//jpair suf
							_addJson(_node4, _$parent4);
						}_chFunc(_node3);_$parent3.children.push(_node3);
					}_$temp = _node2;{
						var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3850006131;_node5.attrs["w-class"] = "guess-detail";_$temp = _node5;{
							var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3347620257;_node6.attrs["w-class"] = "guess-detail-item";_$temp = _node6;{
								var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "widget", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.childHash = 3843722546;_node7.attrHash = 2467408643;_node7.attrs["w-tag"] = "pi-ui-lang";_node7.tagName = _node7.attrs["w-tag"];_$temp = _node7;{
									var _$parent8 = _$temp;var _node8 = {}; //jpair pre

									{
										var jvalue = "";
										jvalue = "我的竞猜";
										//jpair suf

										_node8["zh_Hans"] = jvalue;
									}
									//jpair pre

									{
										var _jvalue = "";
										_jvalue = "我的競猜";
										//jpair suf

										_node8["zh_Hant"] = _jvalue;
									}
									//jpair pre

									{
										var _jvalue2 = "";
										_jvalue2 = "";
										//jpair suf

										_node8["en"] = _jvalue2;
									}
									_addJson(_node8, _$parent8);
								}_$parent7.children.push(_node7);
							}_$temp = _node6;{
								var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "span", "sid": 6 };_node9.children = [];_node9.attrHash = 0;_$temp = _node9;{
									var _$parent10 = _$temp;_addText(item.teamName, _$parent10);
								}_$temp = _node9;{
									var _$parent11 = _$temp;var _node10 = _installText("胜", 826155093);;
									_$parent11.children.push(_node10);
								}_chFunc(_node9);_$parent9.children.push(_node9);
							}_chFunc(_node6);_$parent6.children.push(_node6);
						}_$temp = _node5;{
							var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 7 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3347620257;_node11.attrs["w-class"] = "guess-detail-item";_$temp = _node11;{
								var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "widget", "sid": 8 };_node12.hasChild = false;_node12.child = null;_node12.childHash = 2827965227;_node12.attrHash = 2467408643;_node12.attrs["w-tag"] = "pi-ui-lang";_node12.tagName = _node12.attrs["w-tag"];_$temp = _node12;{
									var _$parent14 = _$temp;var _node13 = {}; //jpair pre

									{
										var _jvalue3 = "";
										_jvalue3 = "我的购买";
										//jpair suf

										_node13["zh_Hans"] = _jvalue3;
									}
									//jpair pre

									{
										var _jvalue4 = "";
										_jvalue4 = "我的購買";
										//jpair suf

										_node13["zh_Hant"] = _jvalue4;
									}
									//jpair pre

									{
										var _jvalue5 = "";
										_jvalue5 = "";
										//jpair suf

										_node13["en"] = _jvalue5;
									}
									_addJson(_node13, _$parent14);
								}_$parent13.children.push(_node12);
							}_$temp = _node11;{
								var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "span", "sid": 9 };_node14.children = [];_node14.attrHash = 0;_$temp = _node14;{
									var _$parent16 = _$temp;_addText(item.guessing.guessSTnum, _$parent16);
								}_$temp = _node14;{
									var _$parent17 = _$temp;var _node15 = _installText("ST", 3826742053);;
									_$parent17.children.push(_node15);
								}_chFunc(_node14);_$parent15.children.push(_node14);
							}_chFunc(_node11);_$parent12.children.push(_node11);
						}_$temp = _node5;{
							var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 10 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 3347620257;_node16.attrs["w-class"] = "guess-detail-item";if (item.guessData.state !== 2) {
								_$temp = _node16;{
									var _$parent19 = _$temp;var _node17 = { "attrs": {}, "tagName": "widget", "sid": 11 };_node17.hasChild = false;_node17.child = null;_node17.childHash = 2668064081;_node17.attrHash = 2467408643;_node17.attrs["w-tag"] = "pi-ui-lang";_node17.tagName = _node17.attrs["w-tag"];_$temp = _node17;{
										var _$parent20 = _$temp;var _node18 = {}; //jpair pre

										{
											var _jvalue6 = "";
											_jvalue6 = "预期收益";
											//jpair suf

											_node18["zh_Hans"] = _jvalue6;
										}
										//jpair pre

										{
											var _jvalue7 = "";
											_jvalue7 = "預期收益";
											//jpair suf

											_node18["zh_Hant"] = _jvalue7;
										}
										//jpair pre

										{
											var _jvalue8 = "";
											_jvalue8 = "";
											//jpair suf

											_node18["en"] = _jvalue8;
										}
										_addJson(_node18, _$parent20);
									}_$parent19.children.push(_node17);
								}
							} else {
								_$temp = _node16;{
									var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "widget", "sid": 12 };_node19.hasChild = false;_node19.child = null;_node19.childHash = 1314823351;_node19.attrHash = 2467408643;_node19.attrs["w-tag"] = "pi-ui-lang";_node19.tagName = _node19.attrs["w-tag"];_$temp = _node19;{
										var _$parent22 = _$temp;var _node20 = {}; //jpair pre

										{
											var _jvalue9 = "";
											_jvalue9 = "实际收益";
											//jpair suf

											_node20["zh_Hans"] = _jvalue9;
										}
										//jpair pre

										{
											var _jvalue10 = "";
											_jvalue10 = "實際收益";
											//jpair suf

											_node20["zh_Hant"] = _jvalue10;
										}
										//jpair pre

										{
											var _jvalue11 = "";
											_jvalue11 = "";
											//jpair suf

											_node20["en"] = _jvalue11;
										}
										_addJson(_node20, _$parent22);
									}_$parent21.children.push(_node19);
								}
							}_$temp = _node16;{
								var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "span", "sid": 13 };_node21.children = [];_node21.attrHash = 0;_$temp = _node21;{
									var _$parent24 = _$temp;_addText(item.guessing.benefit, _$parent24);
								}_$temp = _node21;{
									var _$parent25 = _$temp;var _node22 = _installText("ST", 3826742053);;
									_$parent25.children.push(_node22);
								}_chFunc(_node21);_$parent23.children.push(_node21);
							}_chFunc(_node16);_$parent18.children.push(_node16);
						}_chFunc(_node5);_$parent5.children.push(_node5);
					}_chFunc(_node2);_$parent2.children.push(_node2);
				}
			}
		}_chFunc(_node);return _node;
	}
});