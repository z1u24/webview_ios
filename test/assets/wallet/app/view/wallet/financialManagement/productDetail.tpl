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
							var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 3568076218;_node8.attrs["w-class"] = "desc";_$temp = _node8;{
								var _$parent9 = _$temp;_addText(it1.cfgData.profit, _$parent9);
							}_chFunc(_node8);_$parent8.children.push(_node8);
						}_$temp = _node7;{
							var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 487306359;_node9.attrs["w-class"] = "content";_$temp = _node9;{
								var _$parent11 = _$temp;_addText(it.product.profit, _$parent11);
							}_$temp = _node9;{
								var _$parent12 = _$temp;var _node10 = _installText("%", 4257547020);;
								_$parent12.children.push(_node10);
							}_chFunc(_node9);_$parent10.children.push(_node9);
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}_$temp = _node6;{
						var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 833589976;_node11.attrs["w-class"] = "col2";_$temp = _node11;{
							var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 3568076218;_node12.attrs["w-class"] = "desc";_$temp = _node12;{
								var _$parent15 = _$temp;_addText(it1.cfgData.days, _$parent15);
							}_chFunc(_node12);_$parent14.children.push(_node12);
						}_$temp = _node11;{
							var _$parent16 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 487306359;_node13.attrs["w-class"] = "content";_$temp = _node13;{
								var _$parent17 = _$temp;_addText(it.product.days, _$parent17);
							}_chFunc(_node13);_$parent16.children.push(_node13);
						}_chFunc(_node11);_$parent13.children.push(_node11);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent18 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 11 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 2843472030;_node14.attrs["w-class"] = "row2";_$temp = _node14;{
						var _$parent19 = _$temp;_addText(it1.cfgData.mess, _$parent19);
					}_chFunc(_node14);_$parent18.children.push(_node14);
				}_$temp = _node5;{
					var _$parent20 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 12 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 612004189;_node15.attrs["w-class"] = "row3";_$temp = _node15;{
						var _$parent21 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 13 };_node16.children = [];_node16.attrSize = 2;_node16.attrHash = 1402530185;_node16.attrs["w-class"] = "progress";{
							var attrvalue = "";attrvalue += "width:";attrvalue += it1.usePercent;attrvalue += "%;";_node16.attrs["style"] = attrvalue;
						}_node16.attrHash = _hash.nextHash(_node16.attrHash, _calTextHash(_node16.attrs["style"]));_chFunc(_node16);_$parent21.children.push(_node16);
					}_chFunc(_node15);_$parent20.children.push(_node15);
				}_$temp = _node5;{
					var _$parent22 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 14 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 2247073244;_node17.attrs["w-class"] = "row4";_$temp = _node17;{
						var _$parent23 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 15 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 3809734504;{
							var _attrvalue = "";_attrvalue += "width:";_attrvalue += it1.usePercent;_attrvalue += "%;";_node18.attrs["style"] = _attrvalue;
						}_node18.attrHash = _hash.nextHash(_node18.attrHash, _calTextHash(_node18.attrs["style"]));_chFunc(_node18);_$parent23.children.push(_node18);
					}_$temp = _node17;{
						var _$parent24 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 16 };_node19.children = [];_node19.attrSize = 1;_node19.attrHash = 2477493752;_node19.attrs["w-class"] = "sold";_$temp = _node19;{
							var _$parent25 = _$temp;_addText(it1.cfgData.tips[0], _$parent25);
						}_$temp = _node19;{
							var _$parent26 = _$temp;var _node20 = _installText("&nbsp;", 1553561131);;
							_$parent26.children.push(_node20);
						}_$temp = _node19;{
							var _$parent27 = _$temp;_addText(it1.usePercent, _$parent27);
						}_$temp = _node19;{
							var _$parent28 = _$temp;var _node21 = _installText("%", 4257547020);;
							_$parent28.children.push(_node21);
						}_chFunc(_node19);_$parent24.children.push(_node19);
					}_chFunc(_node17);_$parent22.children.push(_node17);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node2;{
				var _$parent29 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 17 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 4064917415;_node22.attrs["w-class"] = "bottom-box";_$temp = _node22;{
					var _$parent30 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 18 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 2907488342;_node23.attrs["w-class"] = "row5";_$temp = _node23;{
						var _$parent31 = _$temp;_addText(it.product.productIntroduction, _$parent31);
					}_chFunc(_node23);_$parent30.children.push(_node23);
				}_$temp = _node22;{
					var _$parent32 = _$temp;var _node24 = { "attrs": {}, "tagName": "div", "sid": 19 };_node24.children = [];_node24.attrSize = 1;_node24.attrHash = 1019047777;_node24.attrs["w-class"] = "title";_$temp = _node24;{
						var _$parent33 = _$temp;_addText(it1.cfgData.tips[1], _$parent33);
					}_chFunc(_node24);_$parent32.children.push(_node24);
				}_$temp = _node22;{
					var _$parent34 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 20 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 1210607516;_node25.attrs["w-class"] = "detail-box";_$temp = _node25;{
						var _$parent35 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 21 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 3820340678;_node26.attrs["w-class"] = "detail";_$temp = _node26;{
							var _$parent36 = _$temp;_addText(it1.cfgData.detail[0] + it.product.unitPrice, _$parent36);
						}_$temp = _node26;{
							var _$parent37 = _$temp;var _node27 = _installText("&nbsp;", 1553561131);;
							_$parent37.children.push(_node27);
						}_$temp = _node26;{
							var _$parent38 = _$temp;_addText(it.product.coinType + "/" + it1.cfgData.tips[4], _$parent38);
						}_chFunc(_node26);_$parent35.children.push(_node26);
					}_$temp = _node25;{
						var _$parent39 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 22 };_node28.children = [];_node28.attrSize = 1;_node28.attrHash = 3820340678;_node28.attrs["w-class"] = "detail";_$temp = _node28;{
							var _$parent40 = _$temp;_addText(it1.cfgData.detail[1] + it1.leftPercent, _$parent40);
						}_$temp = _node28;{
							var _$parent41 = _$temp;var _node29 = _installText("%", 4257547020);;
							_$parent41.children.push(_node29);
						}_chFunc(_node28);_$parent39.children.push(_node28);
					}_$temp = _node25;{
						var _$parent42 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 23 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 3820340678;_node30.attrs["w-class"] = "detail";_$temp = _node30;{
							var _$parent43 = _$temp;_addText(it1.cfgData.detail[2], _$parent43);
						}_chFunc(_node30);_$parent42.children.push(_node30);
					}_chFunc(_node25);_$parent34.children.push(_node25);
				}_$temp = _node22;{
					var _$parent44 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 24 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 1356112804;_node31.attrs["w-class"] = "unit";_$temp = _node31;{
						var _$parent45 = _$temp;var _node32 = { "attrs": {}, "tagName": "span", "sid": 25 };_node32.children = [];_node32.attrHash = 0;_$temp = _node32;{
							var _$parent46 = _$temp;_addText(it1.cfgData.tips[2], _$parent46);
						}_chFunc(_node32);_$parent45.children.push(_node32);
					}_$temp = _node31;{
						var _$parent47 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 26 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 3048837289;_node33.attrs["w-class"] = "limit";_$temp = _node33;{
							var _$parent48 = _$temp;var _node34 = { "attrs": {}, "tagName": "span", "sid": 27 };_node34.children = [];_node34.childHash = 4136512840;_node34.attrHash = 0;_$temp = _node34;{
								var _$parent49 = _$temp;var _node35 = _installText("（", 4200184926);;
								_$parent49.children.push(_node35);
							}_$parent48.children.push(_node34);
						}_$temp = _node33;{
							var _$parent50 = _$temp;var _node36 = { "attrs": {}, "tagName": "span", "sid": 28 };_node36.children = [];_node36.attrSize = 1;_node36.attrHash = 3739245539;_node36.attrs["w-class"] = "limit-number";_$temp = _node36;{
								var _$parent51 = _$temp;_addText(it1.cfgData.tips[3] + it.product.limit + it1.cfgData.tips[4], _$parent51);
							}_chFunc(_node36);_$parent50.children.push(_node36);
						}_$temp = _node33;{
							var _$parent52 = _$temp;var _node37 = { "attrs": {}, "tagName": "span", "sid": 29 };_node37.children = [];_node37.childHash = 1076027114;_node37.attrHash = 0;_$temp = _node37;{
								var _$parent53 = _$temp;var _node38 = _installText("）", 2556900253);;
								_$parent53.children.push(_node38);
							}_$parent52.children.push(_node37);
						}_chFunc(_node33);_$parent47.children.push(_node33);
					}_chFunc(_node31);_$parent44.children.push(_node31);
				}_$temp = _node22;{
					var _$parent54 = _$temp;var _node39 = { "attrs": {}, "tagName": "div", "sid": 30 };_node39.children = [];_node39.attrSize = 1;_node39.attrHash = 275840537;_node39.attrs["w-class"] = "select-num";_$temp = _node39;{
						var _$parent55 = _$temp;var _node40 = { "attrs": {}, "tagName": "span", "sid": 31 };_node40.children = [];_node40.attrSize = 1;_node40.attrHash = 1839776401;_node40.attrs["w-class"] = "unit-price";_$temp = _node40;{
							var _$parent56 = _$temp;_addText(it.product.unitPrice, _$parent56);
						}_$temp = _node40;{
							var _$parent57 = _$temp;var _node41 = _installText("&nbsp;", 1553561131);;
							_$parent57.children.push(_node41);
						}_$temp = _node40;{
							var _$parent58 = _$temp;_addText(it.product.coinType, _$parent58);
						}_chFunc(_node40);_$parent55.children.push(_node40);
					}_$temp = _node39;{
						var _$parent59 = _$temp;var _node42 = { "attrs": {}, "tagName": "div", "sid": 32 };_node42.children = [];_node42.attrSize = 1;_node42.attrHash = 4157145219;_node42.attrs["w-class"] = "right-box";_$temp = _node42;{
							var _$parent60 = _$temp;var _node43 = { "attrs": {}, "tagName": "img", "sid": 33 };_node43.children = [];_node43.childHash = 0;_node43.attrSize = 3;_node43.attrHash = 1142344205;_node43.attrs["w-class"] = "sub";_node43.attrs["on-tap"] = "minus";_node43.attrs["src"] = "../../../res/image/less.png";_$parent60.children.push(_node43);
						}_$temp = _node42;{
							var _$parent61 = _$temp;var _node44 = { "attrs": {}, "tagName": "span", "sid": 34 };_node44.children = [];_node44.attrHash = 0;_$temp = _node44;{
								var _$parent62 = _$temp;_addText(it1.amount, _$parent62);
							}_chFunc(_node44);_$parent61.children.push(_node44);
						}_$temp = _node42;{
							var _$parent63 = _$temp;var _node45 = { "attrs": {}, "tagName": "img", "sid": 35 };_node45.children = [];_node45.childHash = 0;_node45.attrSize = 3;_node45.attrHash = 1375565364;_node45.attrs["w-class"] = "plus";_node45.attrs["on-tap"] = "add";_node45.attrs["src"] = "../../../res/image/add_gray.png";_$parent63.children.push(_node45);
						}_chFunc(_node42);_$parent59.children.push(_node42);
					}_chFunc(_node39);_$parent54.children.push(_node39);
				}_$temp = _node22;{
					var _$parent64 = _$temp;var _node46 = { "attrs": {}, "tagName": "div", "sid": 36 };_node46.children = [];_node46.attrSize = 1;_node46.attrHash = 3991732755;_node46.attrs["w-class"] = "read";_$temp = _node46;{
						var _$parent65 = _$temp;_addText(it1.cfgData.readAgree, _$parent65);
					}_chFunc(_node46);_$parent64.children.push(_node46);
				}_$temp = _node22;{
					var _$parent66 = _$temp;var _node47 = { "attrs": {}, "tagName": "div", "sid": 37 };_node47.children = [];_node47.attrSize = 2;_node47.attrHash = 2509012085;_node47.attrs["ev-btn-tap"] = "purchaseClicked";_node47.attrs["w-class"] = "btn";_$temp = _node47;{
						var _$parent67 = _$temp;var _node48 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 38 };_node48.hasChild = false;_node48.child = null;_node48.attrHash = 0;_$temp = _node48;{
							var _$parent68 = _$temp;var _node49 = {}; //jpair pre

							_node49["name"] = it1.cfgData.btnName;
							//jpair suf
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "big";
								//jpair suf

								_node49["types"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "blue";
								//jpair suf

								_node49["color"] = _jvalue2;
							}
							_addJson(_node49, _$parent68);
						}_chFunc(_node48);_$parent67.children.push(_node48);
					}_chFunc(_node47);_$parent66.children.push(_node47);
				}_chFunc(_node22);_$parent29.children.push(_node22);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});