(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 274209324;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-next-click"] = "chooseAddrClick";_$temp = _node;{
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
					//jpair pre

					{
						var _jvalue = "";
						_jvalue = "../../res/image/location.png";
						//jpair suf

						_node4["nextImg"] = _jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3605200885;_node5.attrs["w-class"] = "head";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 1742546961;{
						var attrvalue = "";attrvalue += "../../../res/image/currency/";attrvalue += it.currencyName;attrvalue += ".png";_node6.attrs["src"] = attrvalue;
					}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["src"]));_node6.attrs["w-class"] = "currency-icon";_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 3118159832;_node7.attrs["w-class"] = "asset-container";_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1349797565;_node8.attrs["w-class"] = "balance";_$temp = _node8;{
							var _$parent9 = _$temp;_addText(it1.balance, _$parent9);
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}_$temp = _node7;{
						var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 1532757002;_node9.attrs["w-class"] = "balance-value";_$temp = _node9;{
							var _$parent11 = _$temp;var _node10 = _installText("￥", 3615707983);;
							_$parent11.children.push(_node10);
						}_$temp = _node9;{
							var _$parent12 = _$temp;_addText(it1.balanceValue, _$parent12);
						}_chFunc(_node9);_$parent10.children.push(_node9);
					}_chFunc(_node7);_$parent7.children.push(_node7);
				}if (it1.canConvert) {
					_$temp = _node5;{
						var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.childHash = 3684359322;_node11.attrSize = 2;_node11.attrHash = 3356756753;_node11.attrs["w-class"] = "btn-exchange";_node11.attrs["on-tap"] = "convertCurrencyClick";_$temp = _node11;{
							var _$parent14 = _$temp;var _node12 = _installText("换币", 53188704);;
							_$parent14.children.push(_node12);
						}_$parent13.children.push(_node11);
					}
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node2;{
				var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.childHash = 2106637252;_node13.attrSize = 1;_node13.attrHash = 2324204331;_node13.attrs["w-class"] = "operating";_$temp = _node13;{
					var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.childHash = 1489586664;_node14.attrSize = 2;_node14.attrHash = 281941336;_node14.attrs["w-class"] = "operating-item";_node14.attrs["on-tap"] = "doTransferClick";_$temp = _node14;{
						var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "img", "sid": 11 };_node15.children = [];_node15.childHash = 0;_node15.attrSize = 2;_node15.attrHash = 3210676121;_node15.attrs["src"] = "../../../res/image/transfer.png";_node15.attrs["w-class"] = "icon";_$parent17.children.push(_node15);
					}_$temp = _node14;{
						var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 12 };_node16.children = [];_node16.childHash = 2445024412;_node16.attrHash = 0;_$temp = _node16;{
							var _$parent19 = _$temp;var _node17 = _installText("转账", 3857191924);;
							_$parent19.children.push(_node17);
						}_$parent18.children.push(_node16);
					}_$parent16.children.push(_node14);
				}_$temp = _node13;{
					var _$parent20 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 13 };_node18.children = [];_node18.childHash = 2946814719;_node18.attrSize = 1;_node18.attrHash = 374818280;_node18.attrs["w-class"] = "line";_$parent20.children.push(_node18);
				}_$temp = _node13;{
					var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.childHash = 152161327;_node19.attrSize = 2;_node19.attrHash = 567769592;_node19.attrs["w-class"] = "operating-item";_node19.attrs["on-tap"] = "doReceiptClick";_$temp = _node19;{
						var _$parent22 = _$temp;var _node20 = { "attrs": {}, "tagName": "img", "sid": 15 };_node20.children = [];_node20.childHash = 0;_node20.attrSize = 2;_node20.attrHash = 1309473459;_node20.attrs["src"] = "../../../res/image/19.png";_node20.attrs["w-class"] = "icon";_$parent22.children.push(_node20);
					}_$temp = _node19;{
						var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "span", "sid": 16 };_node21.children = [];_node21.childHash = 2680077777;_node21.attrHash = 0;_$temp = _node21;{
							var _$parent24 = _$temp;var _node22 = _installText("收款", 2187046069);;
							_$parent24.children.push(_node22);
						}_$parent23.children.push(_node21);
					}_$parent21.children.push(_node19);
				}_$parent15.children.push(_node13);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent25 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 17 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 915048845;_node23.attrs["w-class"] = "show-container";_$temp = _node23;{
				var _$parent26 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 18 };_node24.children = [];_node24.attrSize = 1;_node24.attrHash = 2438851802;_node24.attrs["w-class"] = "quotes";_$temp = _node24;{
					var _$parent27 = _$temp;var _node25 = _installText("行情&nbsp;￥", 1230121009);;
					_$parent27.children.push(_node25);
				}_$temp = _node24;{
					var _$parent28 = _$temp;_addText(it1.rate, _$parent28);
				}_$temp = _node24;{
					var _$parent29 = _$temp;var _node26 = _installText("/", 883865250);;
					_$parent29.children.push(_node26);
				}_$temp = _node24;{
					var _$parent30 = _$temp;_addText(it.currencyName, _$parent30);
				}_chFunc(_node24);_$parent26.children.push(_node24);
			}_$temp = _node23;{
				var _$parent31 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 19 };_node27.children = [];_node27.attrSize = 1;_node27.attrHash = 2255571891;{
					var _attrvalue = "";_attrvalue += it.gain > 0 ? 'up' : 'down';_attrvalue += "";_node27.attrs["w-class"] = _attrvalue;
				}_node27.attrHash = _hash.nextHash(_node27.attrHash, _calTextHash(_node27.attrs["w-class"]));_$temp = _node27;{
					var _$parent32 = _$temp;var _node28 = _installText("今日&nbsp;", 203328007);;
					_$parent32.children.push(_node28);
				}_$temp = _node27;{
					var _$parent33 = _$temp;_addText(it.gain > 0 ? '+' : '', _$parent33);
				}_$temp = _node27;{
					var _$parent34 = _$temp;_addText(it.gain, _$parent34);
				}_$temp = _node27;{
					var _$parent35 = _$temp;var _node29 = _installText("%", 4257547020);;
					_$parent35.children.push(_node29);
				}_chFunc(_node27);_$parent31.children.push(_node27);
			}_chFunc(_node23);_$parent25.children.push(_node23);
		}_$temp = _node;{
			var _$parent36 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 20 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 4252679546;_node30.attrs["w-class"] = "body";_$temp = _node30;{
				var _$parent37 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 21 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 1331109157;_node31.attrs["w-class"] = "tx-list-container";if (it1.txList.length === 0) {
					_$temp = _node31;{
						var _$parent38 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 22 };_node32.children = [];_node32.childHash = 2979314061;_node32.attrSize = 1;_node32.attrHash = 1587261762;_node32.attrs["w-class"] = "no-recode";_$temp = _node32;{
							var _$parent39 = _$temp;var _node33 = { "attrs": {}, "tagName": "img", "sid": 23 };_node33.children = [];_node33.childHash = 0;_node33.attrSize = 2;_node33.attrHash = 832237403;_node33.attrs["src"] = "../../../res/image/dividend_history_none.png";_node33.attrs["w-class"] = "no-recode-icon";_$parent39.children.push(_node33);
						}_$temp = _node32;{
							var _$parent40 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 24 };_node34.children = [];_node34.childHash = 2773354222;_node34.attrSize = 1;_node34.attrHash = 308010609;_node34.attrs["w-class"] = "no-recode-text";_$temp = _node34;{
								var _$parent41 = _$temp;var _node35 = _installText("还没有记录哦", 1946249748);;
								_$parent41.children.push(_node35);
							}_$parent40.children.push(_node34);
						}_$parent38.children.push(_node32);
					}
				}_$temp = _node31;{
					var _$parent42 = _$temp;var _node36 = { "attrs": {}, "tagName": "div", "sid": 25 };_node36.children = [];_node36.attrSize = 1;_node36.attrHash = 660002203;_node36.attrs["w-class"] = "tx-list";{
						var _$i = 0;
						for (var _iterator = it1.txList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
							var i = _$i++;_$temp = _node36;{
								var _$parent43 = _$temp;var _node37 = { "attrs": {}, "tagName": "div", "sid": 26 };_node37.children = [];_node37.attrSize = 1;_node37.attrHash = 1363181170;{
									var _attrvalue2 = "";_attrvalue2 += "txListItemClick(e,";_attrvalue2 += i;_attrvalue2 += ")";_node37.attrs["on-tap"] = _attrvalue2;
								}_node37.attrHash = _hash.nextHash(_node37.attrHash, _calTextHash(_node37.attrs["on-tap"]));_$temp = _node37;{
									var _$parent44 = _$temp;var _node38 = { "attrs": {}, "tagName": "app-components-fourParaImgItem-fourParaImgItem", "sid": 27 };_node38.hasChild = false;_node38.child = null;_node38.attrHash = 0;_$temp = _node38;{
										var _$parent45 = _$temp;var _node39 = {}; //jpair pre

										_node39["name"] = v.txTypeShow;
										//jpair suf
										//jpair pre

										_node39["data"] = v.pay;
										//jpair suf
										//jpair pre

										_node39["time"] = v.TimeShow;
										//jpair suf
										//jpair pre

										_node39["describe"] = v.statusShow;
										//jpair suf
										//jpair pre

										{
											var _jvalue2 = "";
											_jvalue2 += "../../res/image/";_jvalue2 += v.txType === 2 ? "receive_icon.png" : "transfer_icon.png";_jvalue2 += "";
											//jpair suf

											_node39["img"] = _jvalue2;
										}
										_addJson(_node39, _$parent45);
									}_chFunc(_node38);_$parent44.children.push(_node38);
								}_chFunc(_node37);_$parent43.children.push(_node37);
							}
						}
					}_chFunc(_node36);_$parent42.children.push(_node36);
				}_chFunc(_node31);_$parent37.children.push(_node31);
			}_chFunc(_node30);_$parent36.children.push(_node30);
		}_chFunc(_node);return _node;
	}
});