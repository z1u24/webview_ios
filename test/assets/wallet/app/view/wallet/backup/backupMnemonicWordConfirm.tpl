(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it1.cfgData.topBarTitle;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4252679546;_node4.attrs["w-class"] = "body";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 1981747992;_node5.attrs["w-class"] = "bodyTitle";_$temp = _node5;{
					var _$parent6 = _$temp;_addText(it1.cfgData.bodyTitle, _$parent6);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3807270382;_node6.attrs["w-class"] = "screen";{
					var _$i = 0;
					for (var _iterator = it1.nullMnemonic, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
						var index = _$i++;_$temp = _node6;{
							var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "span", "sid": 5 };_node7.children = [];_node7.attrSize = 3;_node7.attrHash = 712996199;_node7.attrs["w-class"] = "screenItem";{
								var attrvalue = "";attrvalue += "confirmedMnemonicItemClick(e,";attrvalue += index;attrvalue += ")";_node7.attrs["on-tap"] = attrvalue;
							}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["on-tap"]));{
								var _attrvalue = "";_attrvalue += index === 1 || index === 4 || index === 7 || index === 10 ? 'margin:10px 10px 0;' : 'margin:10px 0 0;';_attrvalue += it1.confirmedMnemonic[index] ? 'opacity: 1;' : 'opacity: 0;';_attrvalue += "";_node7.attrs["style"] = _attrvalue;
							}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["style"]));_$temp = _node7;{
								var _$parent9 = _$temp;_addText(it1.confirmedMnemonic[index] && it1.confirmedMnemonic[index].word, _$parent9);
							}_chFunc(_node7);_$parent8.children.push(_node7);
						}
					}
				}_chFunc(_node6);_$parent7.children.push(_node6);
			}_$temp = _node4;{
				var _$parent10 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 4064917415;_node8.attrs["w-class"] = "bottom-box";_$temp = _node8;{
					var _$parent11 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 1253124464;_node9.attrs["w-class"] = "itemsBox";{
						var _$i2 = 0;
						for (var _iterator2 = it1.shuffledMnemonic, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
							var _ref2;

							if (_isArray2) {
								if (_i2 >= _iterator2.length) break;
								_ref2 = _iterator2[_i2++];
							} else {
								_i2 = _iterator2.next();
								if (_i2.done) break;
								_ref2 = _i2.value;
							}

							var _item = _ref2;
							var _index = _$i2++;_$temp = _node9;{
								var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 3;_node10.attrHash = 612500247;{
									var _attrvalue2 = "";_attrvalue2 += "item ";_attrvalue2 += _item.isActive ? 'checked' : '';_attrvalue2 += "";_node10.attrs["w-class"] = _attrvalue2;
								}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["w-class"]));{
									var _attrvalue3 = "";_attrvalue3 += "shuffledMnemonicItemClick(e,";_attrvalue3 += _index;_attrvalue3 += ")";_node10.attrs["on-tap"] = _attrvalue3;
								}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["on-tap"]));{
									var _attrvalue4 = "";_attrvalue4 += _index === 1 || _index === 4 || _index === 7 || _index === 10 ? 'margin:10px 10px 0;' : 'margin:10px 0 0;';_attrvalue4 += "";_node10.attrs["style"] = _attrvalue4;
								}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["style"]));_$temp = _node10;{
									var _$parent13 = _$temp;_addText(_item.word, _$parent13);
								}_chFunc(_node10);_$parent12.children.push(_node10);
							}
						}
					}_chFunc(_node9);_$parent11.children.push(_node9);
				}_$temp = _node8;{
					var _$parent14 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 2461161729;_node11.attrs["w-class"] = "btnBox";_$temp = _node11;{
						var _$parent15 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 2;_node12.attrHash = 2450620553;_node12.attrs["ev-btn-tap"] = "nextStepClick";_node12.attrs["w-class"] = "btn";_$temp = _node12;{
							var _$parent16 = _$temp;var _node13 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 11 };_node13.hasChild = false;_node13.child = null;_node13.attrHash = 0;_$temp = _node13;{
								var _$parent17 = _$temp;var _node14 = {}; //jpair pre

								_node14["name"] = it1.cfgData.sure;
								//jpair suf
								//jpair pre

								{
									var jvalue = "";
									jvalue = "big";
									//jpair suf

									_node14["types"] = jvalue;
								}
								//jpair pre

								{
									var _jvalue = "";
									_jvalue = "blue";
									//jpair suf

									_node14["color"] = _jvalue;
								}
								_addJson(_node14, _$parent17);
							}_chFunc(_node13);_$parent16.children.push(_node13);
						}_chFunc(_node12);_$parent15.children.push(_node12);
					}_chFunc(_node11);_$parent14.children.push(_node11);
				}_chFunc(_node8);_$parent10.children.push(_node8);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});