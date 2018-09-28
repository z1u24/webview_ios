(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["title"] = it.product.productName;
					//jpair suf
					//jpair pre

					{
						var jvalue = "";
						jvalue = "#fff";
						//jpair suf

						_node4["background"] = jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3673846548;_node5.attrs["w-class"] = "top-head";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 932482759;_node6.attrs["w-class"] = "row1";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 3828752007;_node7.attrs["w-class"] = "col1";_$temp = _node7;{
							var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.childHash = 2433872631;_node8.attrSize = 1;_node8.attrHash = 3568076218;_node8.attrs["w-class"] = "desc";_$temp = _node8;{
								var _$parent9 = _$temp;var _node9 = _installText("预期年化收益", 2496982372);;
								_$parent9.children.push(_node9);
							}_$parent8.children.push(_node8);
						}_$temp = _node7;{
							var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 487306359;_node10.attrs["w-class"] = "content";_$temp = _node10;{
								var _$parent11 = _$temp;_addText(it.product.profit, _$parent11);
							}_$temp = _node10;{
								var _$parent12 = _$temp;var _node11 = _installText("%", 4257547020);;
								_$parent12.children.push(_node11);
							}_chFunc(_node10);_$parent10.children.push(_node10);
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}_$temp = _node6;{
						var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 833589976;_node12.attrs["w-class"] = "col2";_$temp = _node12;{
							var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.childHash = 788979477;_node13.attrSize = 1;_node13.attrHash = 3568076218;_node13.attrs["w-class"] = "desc";_$temp = _node13;{
								var _$parent15 = _$temp;var _node14 = _installText("持续天数", 346471287);;
								_$parent15.children.push(_node14);
							}_$parent14.children.push(_node13);
						}_$temp = _node12;{
							var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 10 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 487306359;_node15.attrs["w-class"] = "content";_$temp = _node15;{
								var _$parent17 = _$temp;_addText(it.product.days, _$parent17);
							}_chFunc(_node15);_$parent16.children.push(_node15);
						}_chFunc(_node12);_$parent13.children.push(_node12);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 11 };_node16.children = [];_node16.childHash = 1288515788;_node16.attrSize = 1;_node16.attrHash = 2843472030;_node16.attrs["w-class"] = "row2";_$temp = _node16;{
						var _$parent19 = _$temp;var _node17 = _installText("以上利率均为预期年化结算利率，以实际回报为准", 1508789325);;
						_$parent19.children.push(_node17);
					}_$parent18.children.push(_node16);
				}_$temp = _node5;{
					var _$parent20 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 12 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 612004189;_node18.attrs["w-class"] = "row3";_$temp = _node18;{
						var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 13 };_node19.children = [];_node19.attrSize = 2;_node19.attrHash = 1402530185;_node19.attrs["w-class"] = "progress";{
							var attrvalue = "";attrvalue += "width:";attrvalue += it1.usePercent;attrvalue += "%;";_node19.attrs["style"] = attrvalue;
						}_node19.attrHash = _hash.nextHash(_node19.attrHash, _calTextHash(_node19.attrs["style"]));_chFunc(_node19);_$parent21.children.push(_node19);
					}_chFunc(_node18);_$parent20.children.push(_node18);
				}_$temp = _node5;{
					var _$parent22 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 14 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 2247073244;_node20.attrs["w-class"] = "row4";_$temp = _node20;{
						var _$parent23 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 15 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 3809734504;{
							var _attrvalue = "";_attrvalue += "width:";_attrvalue += it1.usePercent;_attrvalue += "%;";_node21.attrs["style"] = _attrvalue;
						}_node21.attrHash = _hash.nextHash(_node21.attrHash, _calTextHash(_node21.attrs["style"]));_chFunc(_node21);_$parent23.children.push(_node21);
					}_$temp = _node20;{
						var _$parent24 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 16 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 2477493752;_node22.attrs["w-class"] = "sold";_$temp = _node22;{
							var _$parent25 = _$temp;var _node23 = _installText("已售&nbsp;", 45516644);;
							_$parent25.children.push(_node23);
						}_$temp = _node22;{
							var _$parent26 = _$temp;_addText(it1.usePercent, _$parent26);
						}_$temp = _node22;{
							var _$parent27 = _$temp;var _node24 = _installText("%", 4257547020);;
							_$parent27.children.push(_node24);
						}_chFunc(_node22);_$parent24.children.push(_node22);
					}_chFunc(_node20);_$parent22.children.push(_node20);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node2;{
				var _$parent28 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 17 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 4064917415;_node25.attrs["w-class"] = "bottom-box";_$temp = _node25;{
					var _$parent29 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 18 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 2907488342;_node26.attrs["w-class"] = "row5";_$temp = _node26;{
						var _$parent30 = _$temp;_addText(it.product.productIntroduction, _$parent30);
					}_chFunc(_node26);_$parent29.children.push(_node26);
				}_$temp = _node25;{
					var _$parent31 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 19 };_node27.children = [];_node27.childHash = 2153169236;_node27.attrSize = 1;_node27.attrHash = 1019047777;_node27.attrs["w-class"] = "title";_$temp = _node27;{
						var _$parent32 = _$temp;var _node28 = _installText("详细信息", 3821894249);;
						_$parent32.children.push(_node28);
					}_$parent31.children.push(_node27);
				}_$temp = _node25;{
					var _$parent33 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 20 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 1210607516;_node29.attrs["w-class"] = "detail-box";_$temp = _node29;{
						var _$parent34 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 21 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 3820340678;_node30.attrs["w-class"] = "detail";_$temp = _node30;{
							var _$parent35 = _$temp;var _node31 = _installText("价格：", 999077175);;
							_$parent35.children.push(_node31);
						}_$temp = _node30;{
							var _$parent36 = _$temp;_addText(it.product.unitPrice, _$parent36);
						}_$temp = _node30;{
							var _$parent37 = _$temp;var _node32 = _installText("&nbsp;", 1553561131);;
							_$parent37.children.push(_node32);
						}_$temp = _node30;{
							var _$parent38 = _$temp;_addText(it.product.coinType, _$parent38);
						}_$temp = _node30;{
							var _$parent39 = _$temp;var _node33 = _installText("/份", 2478944486);;
							_$parent39.children.push(_node33);
						}_chFunc(_node30);_$parent34.children.push(_node30);
					}_$temp = _node29;{
						var _$parent40 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 22 };_node34.children = [];_node34.attrSize = 1;_node34.attrHash = 3820340678;_node34.attrs["w-class"] = "detail";_$temp = _node34;{
							var _$parent41 = _$temp;var _node35 = _installText("剩余：", 2676395501);;
							_$parent41.children.push(_node35);
						}_$temp = _node34;{
							var _$parent42 = _$temp;_addText(it1.leftPercent, _$parent42);
						}_$temp = _node34;{
							var _$parent43 = _$temp;var _node36 = _installText("%", 4257547020);;
							_$parent43.children.push(_node36);
						}_chFunc(_node34);_$parent40.children.push(_node34);
					}_$temp = _node29;{
						var _$parent44 = _$temp;var _node37 = { "attrs": {}, "tagName": "div", "sid": 23 };_node37.children = [];_node37.childHash = 1407544004;_node37.attrSize = 1;_node37.attrHash = 3820340678;_node37.attrs["w-class"] = "detail";_$temp = _node37;{
							var _$parent45 = _$temp;var _node38 = _installText("锁定期：无", 2280311565);;
							_$parent45.children.push(_node38);
						}_$parent44.children.push(_node37);
					}_chFunc(_node29);_$parent33.children.push(_node29);
				}_$temp = _node25;{
					var _$parent46 = _$temp;var _node39 = { "attrs": {}, "tagName": "div", "sid": 24 };_node39.children = [];_node39.attrSize = 1;_node39.attrHash = 1356112804;_node39.attrs["w-class"] = "unit";_$temp = _node39;{
						var _$parent47 = _$temp;var _node40 = { "attrs": {}, "tagName": "span", "sid": 25 };_node40.children = [];_node40.childHash = 1132158999;_node40.attrHash = 0;_$temp = _node40;{
							var _$parent48 = _$temp;var _node41 = _installText("单价/份", 967837643);;
							_$parent48.children.push(_node41);
						}_$parent47.children.push(_node40);
					}_$temp = _node39;{
						var _$parent49 = _$temp;var _node42 = { "attrs": {}, "tagName": "div", "sid": 26 };_node42.children = [];_node42.attrSize = 1;_node42.attrHash = 3048837289;_node42.attrs["w-class"] = "limit";_$temp = _node42;{
							var _$parent50 = _$temp;var _node43 = { "attrs": {}, "tagName": "span", "sid": 27 };_node43.children = [];_node43.childHash = 4136512840;_node43.attrHash = 0;_$temp = _node43;{
								var _$parent51 = _$temp;var _node44 = _installText("（", 4200184926);;
								_$parent51.children.push(_node44);
							}_$parent50.children.push(_node43);
						}_$temp = _node42;{
							var _$parent52 = _$temp;var _node45 = { "attrs": {}, "tagName": "span", "sid": 28 };_node45.children = [];_node45.attrSize = 1;_node45.attrHash = 3739245539;_node45.attrs["w-class"] = "limit-number";_$temp = _node45;{
								var _$parent53 = _$temp;var _node46 = _installText("限购", 3244807591);;
								_$parent53.children.push(_node46);
							}_$temp = _node45;{
								var _$parent54 = _$temp;_addText(it.product.limit, _$parent54);
							}_$temp = _node45;{
								var _$parent55 = _$temp;var _node47 = _installText("份", 4105707745);;
								_$parent55.children.push(_node47);
							}_chFunc(_node45);_$parent52.children.push(_node45);
						}_$temp = _node42;{
							var _$parent56 = _$temp;var _node48 = { "attrs": {}, "tagName": "span", "sid": 29 };_node48.children = [];_node48.childHash = 1076027114;_node48.attrHash = 0;_$temp = _node48;{
								var _$parent57 = _$temp;var _node49 = _installText("）", 2556900253);;
								_$parent57.children.push(_node49);
							}_$parent56.children.push(_node48);
						}_chFunc(_node42);_$parent49.children.push(_node42);
					}_chFunc(_node39);_$parent46.children.push(_node39);
				}_$temp = _node25;{
					var _$parent58 = _$temp;var _node50 = { "attrs": {}, "tagName": "div", "sid": 30 };_node50.children = [];_node50.attrSize = 1;_node50.attrHash = 275840537;_node50.attrs["w-class"] = "select-num";_$temp = _node50;{
						var _$parent59 = _$temp;var _node51 = { "attrs": {}, "tagName": "span", "sid": 31 };_node51.children = [];_node51.attrSize = 1;_node51.attrHash = 1839776401;_node51.attrs["w-class"] = "unit-price";_$temp = _node51;{
							var _$parent60 = _$temp;_addText(it.product.unitPrice, _$parent60);
						}_$temp = _node51;{
							var _$parent61 = _$temp;var _node52 = _installText("&nbsp;", 1553561131);;
							_$parent61.children.push(_node52);
						}_$temp = _node51;{
							var _$parent62 = _$temp;_addText(it.product.coinType, _$parent62);
						}_chFunc(_node51);_$parent59.children.push(_node51);
					}_$temp = _node50;{
						var _$parent63 = _$temp;var _node53 = { "attrs": {}, "tagName": "div", "sid": 32 };_node53.children = [];_node53.attrSize = 1;_node53.attrHash = 4157145219;_node53.attrs["w-class"] = "right-box";_$temp = _node53;{
							var _$parent64 = _$temp;var _node54 = { "attrs": {}, "tagName": "img", "sid": 33 };_node54.children = [];_node54.childHash = 0;_node54.attrSize = 3;_node54.attrHash = 1142344205;_node54.attrs["w-class"] = "sub";_node54.attrs["on-tap"] = "minus";_node54.attrs["src"] = "../../../res/image/less.png";_$parent64.children.push(_node54);
						}_$temp = _node53;{
							var _$parent65 = _$temp;var _node55 = { "attrs": {}, "tagName": "span", "sid": 34 };_node55.children = [];_node55.attrHash = 0;_$temp = _node55;{
								var _$parent66 = _$temp;_addText(it1.amount, _$parent66);
							}_chFunc(_node55);_$parent65.children.push(_node55);
						}_$temp = _node53;{
							var _$parent67 = _$temp;var _node56 = { "attrs": {}, "tagName": "img", "sid": 35 };_node56.children = [];_node56.childHash = 0;_node56.attrSize = 3;_node56.attrHash = 1375565364;_node56.attrs["w-class"] = "plus";_node56.attrs["on-tap"] = "add";_node56.attrs["src"] = "../../../res/image/add_gray.png";_$parent67.children.push(_node56);
						}_chFunc(_node53);_$parent63.children.push(_node53);
					}_chFunc(_node50);_$parent58.children.push(_node50);
				}_$temp = _node25;{
					var _$parent68 = _$temp;var _node57 = { "attrs": {}, "tagName": "div", "sid": 36 };_node57.children = [];_node57.childHash = 3813368794;_node57.attrSize = 1;_node57.attrHash = 3991732755;_node57.attrs["w-class"] = "read";_$temp = _node57;{
						var _$parent69 = _$temp;var _node58 = _installText("阅读声明", 2283389227);;
						_$parent69.children.push(_node58);
					}_$parent68.children.push(_node57);
				}_$temp = _node25;{
					var _$parent70 = _$temp;var _node59 = { "attrs": {}, "tagName": "div", "sid": 37 };_node59.children = [];_node59.childHash = 278994569;_node59.attrSize = 2;_node59.attrHash = 2509012085;_node59.attrs["ev-btn-tap"] = "purchaseClicked";_node59.attrs["w-class"] = "btn";_$temp = _node59;{
						var _$parent71 = _$temp;var _node60 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 38 };_node60.hasChild = false;_node60.child = null;_node60.childHash = 4040379709;_node60.attrHash = 0;_$temp = _node60;{
							var _$parent72 = _$temp;var _node61 = {}; //jpair pre

							{
								var _jvalue = "";
								_jvalue = "购买";
								//jpair suf

								_node61["name"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "big";
								//jpair suf

								_node61["types"] = _jvalue2;
							}
							//jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "blue";
								//jpair suf

								_node61["color"] = _jvalue3;
							}
							_addJson(_node61, _$parent72);
						}_$parent71.children.push(_node60);
					}_$parent70.children.push(_node59);
				}_chFunc(_node25);_$parent28.children.push(_node25);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});