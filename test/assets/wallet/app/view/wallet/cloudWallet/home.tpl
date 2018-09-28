(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3673846548;_node2.attrs["w-class"] = "top-head";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["title"] = it.currencyName;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "linear-gradient(to right,#38CFE7,#318DE6)";
						//jpair suf

						_node4["background"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 253915434;_node5.attrs["w-class"] = "head2";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 3203423573;_node6.attrs["w-class"] = "head2-left";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "span", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 1349797565;_node7.attrs["w-class"] = "balance";_$temp = _node7;{
							var _$parent8 = _$temp;_addText(it1.balance, _$parent8);
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}_$temp = _node6;{
						var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "span", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1532757002;_node8.attrs["w-class"] = "balance-value";_$temp = _node8;{
							var _$parent10 = _$temp;var _node9 = _installText("￥", 3615707983);;
							_$parent10.children.push(_node9);
						}_$temp = _node8;{
							var _$parent11 = _$temp;_addText(it1.balanceValue, _$parent11);
						}_chFunc(_node8);_$parent9.children.push(_node8);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.childHash = 73348983;_node10.attrSize = 1;_node10.attrHash = 3242123177;_node10.attrs["w-class"] = "head2-right";_$temp = _node10;{
						var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "span", "sid": 8 };_node11.children = [];_node11.childHash = 2382405953;_node11.attrSize = 2;_node11.attrHash = 1878417502;_node11.attrs["w-class"] = "btn";_node11.attrs["on-tap"] = "rechargeClick";_$temp = _node11;{
							var _$parent14 = _$temp;var _node12 = _installText("充值", 3768531277);;
							_$parent14.children.push(_node12);
						}_$parent13.children.push(_node11);
					}_$temp = _node10;{
						var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "span", "sid": 9 };_node13.children = [];_node13.childHash = 2443864228;_node13.attrSize = 2;_node13.attrHash = 2981695675;_node13.attrs["w-class"] = "btn btn-withdraw";_node13.attrs["on-tap"] = "withdrawClick";_$temp = _node13;{
							var _$parent16 = _$temp;var _node14 = _installText("提币", 3823202706);;
							_$parent16.children.push(_node14);
						}_$parent15.children.push(_node13);
					}_$parent12.children.push(_node10);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node2;{
				var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 10 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 4105260532;_node15.attrs["w-class"] = "nav-wrap";_$temp = _node15;{
					var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 11 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 1940417547;_node16.attrs["w-class"] = "nav";{
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
							var i = _$i++;var isActive = i === it1.activeNum;_$temp = _node16;{
								var _$parent19 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 12 };_node17.children = [];_node17.attrSize = 2;_node17.attrHash = 1235456931;{
									var attrvalue = "";attrvalue += "nav-item ";attrvalue += isActive ? 'is-active' : '';attrvalue += "";_node17.attrs["w-class"] = attrvalue;
								}_node17.attrHash = _hash.nextHash(_node17.attrHash, _calTextHash(_node17.attrs["w-class"]));{
									var _attrvalue = "";_attrvalue += "tabsChangeClick(e,";_attrvalue += i;_attrvalue += ")";_node17.attrs["on-tap"] = _attrvalue;
								}_node17.attrHash = _hash.nextHash(_node17.attrHash, _calTextHash(_node17.attrs["on-tap"]));_$temp = _node17;{
									var _$parent20 = _$temp;_addText(v.tab, _$parent20);
								}_chFunc(_node17);_$parent19.children.push(_node17);
							}
						}
					}_chFunc(_node16);_$parent18.children.push(_node16);
				}_chFunc(_node15);_$parent17.children.push(_node15);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 13 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 915048845;_node18.attrs["w-class"] = "show-container";_$temp = _node18;{
				var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 2438851802;_node19.attrs["w-class"] = "quotes";_$temp = _node19;{
					var _$parent23 = _$temp;var _node20 = _installText("行情&nbsp;￥", 1230121009);;
					_$parent23.children.push(_node20);
				}_$temp = _node19;{
					var _$parent24 = _$temp;_addText(it1.rate, _$parent24);
				}_$temp = _node19;{
					var _$parent25 = _$temp;var _node21 = _installText("/", 883865250);;
					_$parent25.children.push(_node21);
				}_$temp = _node19;{
					var _$parent26 = _$temp;_addText(it.currencyName, _$parent26);
				}_chFunc(_node19);_$parent22.children.push(_node19);
			}_$temp = _node18;{
				var _$parent27 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 15 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 2255571891;{
					var _attrvalue2 = "";_attrvalue2 += it1.gain > 0 ? 'up' : 'down';_attrvalue2 += "";_node22.attrs["w-class"] = _attrvalue2;
				}_node22.attrHash = _hash.nextHash(_node22.attrHash, _calTextHash(_node22.attrs["w-class"]));_$temp = _node22;{
					var _$parent28 = _$temp;var _node23 = _installText("今日&nbsp;", 203328007);;
					_$parent28.children.push(_node23);
				}_$temp = _node22;{
					var _$parent29 = _$temp;_addText(it1.gain > 0 ? '+' : '', _$parent29);
				}_$temp = _node22;{
					var _$parent30 = _$temp;_addText(it1.gain, _$parent30);
				}_$temp = _node22;{
					var _$parent31 = _$temp;var _node24 = _installText("%", 4257547020);;
					_$parent31.children.push(_node24);
				}_chFunc(_node22);_$parent27.children.push(_node22);
			}_chFunc(_node18);_$parent21.children.push(_node18);
		}_$temp = _node;{
			var _$parent32 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 16 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 4252679546;_node25.attrs["w-class"] = "body";{
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
					var _i3 = _$i2++;var _isActive = _i3 === it1.activeNum;_$temp = _node25;{
						var _$parent33 = _$temp;var _node26 = { "attrs": {}, "tagName": "widget", "sid": 17 };_node26.hasChild = false;_node26.child = null;_node26.attrSize = 1;_node26.attrHash = 543012080;{
							var _attrvalue3 = "";_attrvalue3 = _v.components;_node26.attrs["w-tag"] = _attrvalue3;
						}_node26.attrHash = _hash.nextHash(_node26.attrHash, _calTextHash(_node26.attrs["w-tag"]));_node26.tagName = _node26.attrs["w-tag"];{
							var _attrvalue4 = "";_attrvalue4 += "visibility: ";_attrvalue4 += _isActive ? 'visible' : 'hidden';_attrvalue4 += "; z-index:";_attrvalue4 += _isActive ? 0 : -1;_attrvalue4 += ";  width:100%;height: 100%;";_node26.attrs["style"] = _attrvalue4;
						}_node26.attrHash = _hash.nextHash(_node26.attrHash, _calTextHash(_node26.attrs["style"]));_$temp = _node26;{
							var _$parent34 = _$temp;var _node27 = {}; //jpair pre

							_node27["isActive"] = _isActive;
							//jpair suf
							//jpair pre

							_node27["currencyName"] = it.currencyName;
							//jpair suf
							_addJson(_node27, _$parent34);
						}_chFunc(_node26);_$parent33.children.push(_node26);
					}
				}
			}_chFunc(_node25);_$parent32.children.push(_node25);
		}_chFunc(_node);return _node;
	}
});