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
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 1086370194;_node4.attrs["w-class"] = "content";_node4.attrs["on-scroll"] = "";{
				var _$i = 0;
				for (var _iterator = it1.txsShow, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
					var ind = _$i++;_$temp = _node4;{
						var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 1045235690;_node5.attrs["w-class"] = "item";_$temp = _node5;{
							var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3819625266;_node6.attrs["w-class"] = "itemRow status";_$temp = _node6;{
								var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "span", "sid": 5 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 3886674151;{
									var attrvalue = "";attrvalue += item.status_class;attrvalue += "";_node7.attrs["w-class"] = attrvalue;
								}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["w-class"]));_node7.attrs["style"] = "flex: 1 0 0;";_$temp = _node7;{
									var _$parent8 = _$temp;_addText(item.status_show, _$parent8);
								}_chFunc(_node7);_$parent7.children.push(_node7);
							}_$temp = _node6;{
								var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 6 };_node8.children = [];_node8.attrHash = 0;_$temp = _node8;{
									var _$parent10 = _$temp;_addText(item.inputCurrency, _$parent10);
								}_$temp = _node8;{
									var _$parent11 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 7 };_node9.children = [];_node9.childHash = 0;_node9.attrSize = 2;_node9.attrHash = 3187615728;_node9.attrs["src"] = "../../../res/image/rightArrow.png";_node9.attrs["w-class"] = "arrow";_$parent11.children.push(_node9);
								}_$temp = _node8;{
									var _$parent12 = _$temp;_addText(item.outputCurrency, _$parent12);
								}_chFunc(_node8);_$parent9.children.push(_node8);
							}_chFunc(_node6);_$parent6.children.push(_node6);
						}_$temp = _node5;{
							var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 2016227843;_node10.attrs["w-class"] = "itemRow rate";_$temp = _node10;{
								var _$parent14 = _$temp;var _node11 = { "attrs": {}, "tagName": "span", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 2609826224;_node11.attrs["style"] = "flex: 1 0 0;";_$temp = _node11;{
									var _$parent15 = _$temp;_addText(it1.cfgData.tips[0], _$parent15);
								}_$temp = _node11;{
									var _$parent16 = _$temp;var _node12 = _installText("&nbsp;", 1553561131);;
									_$parent16.children.push(_node12);
								}_$temp = _node11;{
									var _$parent17 = _$temp;_addText(item.shiftRate, _$parent17);
								}_chFunc(_node11);_$parent14.children.push(_node11);
							}_$temp = _node10;{
								var _$parent18 = _$temp;var _node13 = { "attrs": {}, "tagName": "span", "sid": 10 };_node13.children = [];_node13.attrHash = 0;_$temp = _node13;{
									var _$parent19 = _$temp;_addText(item.timestamp_show, _$parent19);
								}_chFunc(_node13);_$parent18.children.push(_node13);
							}_chFunc(_node10);_$parent13.children.push(_node10);
						}_$temp = _node5;{
							var _$parent20 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 11 };_node14.children = [];_node14.childHash = 2946814719;_node14.attrSize = 1;_node14.attrHash = 3144420239;_node14.attrs["w-class"] = "dividLine";_$parent20.children.push(_node14);
						}_$temp = _node5;{
							var _$parent21 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 12 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 2715493020;_node15.attrs["w-class"] = "itemRow outmess";{
								var _attrvalue = "";_attrvalue += "inHashClick(e,";_attrvalue += ind;_attrvalue += ")";_node15.attrs["on-tap"] = _attrvalue;
							}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["on-tap"]));_$temp = _node15;{
								var _$parent22 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 13 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 3947990645;_node16.attrs["style"] = "color: #3790E6;flex: 1 0 0;";_$temp = _node16;{
									var _$parent23 = _$temp;_addText(item.inputTXID_show, _$parent23);
								}_chFunc(_node16);_$parent22.children.push(_node16);
							}_$temp = _node15;{
								var _$parent24 = _$temp;var _node17 = { "attrs": {}, "tagName": "span", "sid": 14 };_node17.children = [];_node17.attrHash = 0;_$temp = _node17;{
									var _$parent25 = _$temp;var _node18 = _installText("-", 1066372933);;
									_$parent25.children.push(_node18);
								}_$temp = _node17;{
									var _$parent26 = _$temp;_addText(item.inputAmount, _$parent26);
								}_chFunc(_node17);_$parent24.children.push(_node17);
							}_chFunc(_node15);_$parent21.children.push(_node15);
						}if (item.status === 'complete') {
							_$temp = _node5;{
								var _$parent27 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 15 };_node19.children = [];_node19.attrSize = 2;_node19.attrHash = 3900121577;_node19.attrs["w-class"] = "itemRow outmess";{
									var _attrvalue2 = "";_attrvalue2 += "outHashClick(e,";_attrvalue2 += ind;_attrvalue2 += ")";_node19.attrs["on-tap"] = _attrvalue2;
								}_node19.attrHash = _hash.nextHash(_node19.attrHash, _calTextHash(_node19.attrs["on-tap"]));_$temp = _node19;{
									var _$parent28 = _$temp;var _node20 = { "attrs": {}, "tagName": "span", "sid": 16 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 3947990645;_node20.attrs["style"] = "color: #3790E6;flex: 1 0 0;";_$temp = _node20;{
										var _$parent29 = _$temp;_addText(item.outputTXID_show, _$parent29);
									}_chFunc(_node20);_$parent28.children.push(_node20);
								}_$temp = _node19;{
									var _$parent30 = _$temp;var _node21 = { "attrs": {}, "tagName": "span", "sid": 17 };_node21.children = [];_node21.attrHash = 0;_$temp = _node21;{
										var _$parent31 = _$temp;var _node22 = _installText("+", 3807426999);;
										_$parent31.children.push(_node22);
									}_$temp = _node21;{
										var _$parent32 = _$temp;_addText(item.outputAmount, _$parent32);
									}_chFunc(_node21);_$parent30.children.push(_node21);
								}_chFunc(_node19);_$parent27.children.push(_node19);
							}
						}_chFunc(_node5);_$parent5.children.push(_node5);
					}
				}
			}if (it1.txsShow.length == 0) {
				_$temp = _node4;{
					var _$parent33 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 18 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 3809030542;_node23.attrs["w-class"] = "historyNone";_$temp = _node23;{
						var _$parent34 = _$temp;var _node24 = { "attrs": {}, "tagName": "img", "sid": 19 };_node24.children = [];_node24.childHash = 0;_node24.attrSize = 2;_node24.attrHash = 1623007564;_node24.attrs["src"] = "../../../res/image/dividend_history_none.png";_node24.attrs["style"] = "width: 200px;height: 200px;margin-bottom: 20px;";_$parent34.children.push(_node24);
					}_$temp = _node23;{
						var _$parent35 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 20 };_node25.children = [];_node25.attrHash = 0;_$temp = _node25;{
							var _$parent36 = _$temp;_addText(it1.cfgData.noneRecords, _$parent36);
						}_chFunc(_node25);_$parent35.children.push(_node25);
					}_chFunc(_node23);_$parent33.children.push(_node23);
				}
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});