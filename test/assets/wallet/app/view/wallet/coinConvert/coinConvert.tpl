(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 1401937976;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["ev-next-click"] = "goHistory";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it1.cfgData.topBarTitle;
				//jpair suf
				//jpair pre

				{
					var jvalue = "";
					jvalue = "../../res/image/detailBlueIcon.png";
					//jpair suf

					_node3["nextImg"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 487306359;_node4.attrs["w-class"] = "content";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 1349797565;_node5.attrs["w-class"] = "balance";_$temp = _node5;{
					var _$parent6 = _$temp;_addText(it1.cfgData.tips[0], _$parent6);
				}_$temp = _node5;{
					var _$parent7 = _$temp;var _node6 = _installText("&nbsp;", 1553561131);;
					_$parent7.children.push(_node6);
				}_$temp = _node5;{
					var _$parent8 = _$temp;_addText(it1.outBalance, _$parent8);
				}_$temp = _node5;{
					var _$parent9 = _$temp;var _node7 = _installText("&nbsp;", 1553561131);;
					_$parent9.children.push(_node7);
				}_$temp = _node5;{
					var _$parent10 = _$temp;_addText(it1.outCurrency, _$parent10);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent11 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 4 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2232562797;_node8.attrs["w-class"] = "coin";_$temp = _node8;{
					var _$parent12 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 5 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 1149598595;{
						var attrvalue = "";attrvalue += "../../../res/image/currency/";attrvalue += it1.outCurrency;attrvalue += ".png";_node9.attrs["src"] = attrvalue;
					}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["src"]));_node9.attrs["w-class"] = "coinImg";_chFunc(_node9);_$parent12.children.push(_node9);
				}_$temp = _node8;{
					var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "span", "sid": 6 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 2785077749;_node10.attrs["w-class"] = "coinName";_$temp = _node10;{
						var _$parent14 = _$temp;_addText(it1.outCurrency, _$parent14);
					}_chFunc(_node10);_$parent13.children.push(_node10);
				}_chFunc(_node8);_$parent11.children.push(_node8);
			}_$temp = _node4;{
				var _$parent15 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 7 };_node11.children = [];_node11.attrSize = 2;_node11.attrHash = 2447067020;_node11.attrs["w-class"] = "outInput";_node11.attrs["ev-input-change"] = "outAmountChange";_$temp = _node11;{
					var _$parent16 = _$temp;var _node12 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 8 };_node12.hasChild = false;_node12.child = null;_node12.attrHash = 0;_$temp = _node12;{
						var _$parent17 = _$temp;var _node13 = {}; //jpair pre

						_node13["placeHolder"] = it1.cfgData.inputPlace[0];
						//jpair suf
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "padding:20px;";
							//jpair suf

							_node13["style"] = _jvalue;
						}
						//jpair pre

						_node13["input"] = it1.outAmount;
						//jpair suf
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "number";
							//jpair suf

							_node13["itype"] = _jvalue2;
						}
						_addJson(_node13, _$parent17);
					}_chFunc(_node12);_$parent16.children.push(_node12);
				}_chFunc(_node11);_$parent15.children.push(_node11);
			}_$temp = _node4;{
				var _$parent18 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 9 };_node14.children = [];_node14.attrSize = 2;_node14.attrHash = 1373112016;_node14.attrs["w-class"] = "coin";_node14.attrs["on-tap"] = "inCurrencySelectClick";_$temp = _node14;{
					var _$parent19 = _$temp;var _node15 = { "attrs": {}, "tagName": "img", "sid": 10 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 1149598595;{
						var _attrvalue = "";_attrvalue += "../../../res/image/currency/";_attrvalue += it1.inCurrency;_attrvalue += ".png";_node15.attrs["src"] = _attrvalue;
					}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["src"]));_node15.attrs["w-class"] = "coinImg";_chFunc(_node15);_$parent19.children.push(_node15);
				}_$temp = _node14;{
					var _$parent20 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 11 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 2785077749;_node16.attrs["w-class"] = "coinName";_$temp = _node16;{
						var _$parent21 = _$temp;_addText(it1.inCurrency, _$parent21);
					}_chFunc(_node16);_$parent20.children.push(_node16);
				}_$temp = _node14;{
					var _$parent22 = _$temp;var _node17 = { "attrs": {}, "tagName": "img", "sid": 12 };_node17.children = [];_node17.childHash = 0;_node17.attrSize = 2;_node17.attrHash = 1878845784;_node17.attrs["src"] = "../../../res/image/right_arrow_blue.png";_node17.attrs["style"] = "width: 40px;height: 40px;";_$parent22.children.push(_node17);
				}_chFunc(_node14);_$parent18.children.push(_node14);
			}_$temp = _node4;{
				var _$parent23 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 13 };_node18.children = [];_node18.attrSize = 2;_node18.attrHash = 2084590256;_node18.attrs["w-class"] = "inInput";_node18.attrs["ev-input-change"] = "inAmountChange";_$temp = _node18;{
					var _$parent24 = _$temp;var _node19 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 14 };_node19.hasChild = false;_node19.child = null;_node19.attrHash = 0;_$temp = _node19;{
						var _$parent25 = _$temp;var _node20 = {}; //jpair pre

						_node20["placeHolder"] = it1.cfgData.inputPlace[1];
						//jpair suf
						//jpair pre

						{
							var _jvalue3 = "";
							_jvalue3 = "padding:20px;";
							//jpair suf

							_node20["style"] = _jvalue3;
						}
						//jpair pre

						_node20["input"] = it1.receiveAmount;
						//jpair suf
						//jpair pre

						{
							var _jvalue4 = "";
							_jvalue4 = "number";
							//jpair suf

							_node20["itype"] = _jvalue4;
						}
						_addJson(_node20, _$parent25);
					}_chFunc(_node19);_$parent24.children.push(_node19);
				}_chFunc(_node18);_$parent23.children.push(_node18);
			}_$temp = _node4;{
				var _$parent26 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 15 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 2680022635;_node21.attrs["w-class"] = "rate";_$temp = _node21;{
					var _$parent27 = _$temp;var _node22 = { "attrs": {}, "tagName": "span", "sid": 16 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 2609826224;_node22.attrs["style"] = "flex: 1 0 0;";_$temp = _node22;{
						var _$parent28 = _$temp;_addText(it1.cfgData.tips[1], _$parent28);
					}_$temp = _node22;{
						var _$parent29 = _$temp;var _node23 = _installText("&nbsp;", 1553561131);;
						_$parent29.children.push(_node23);
					}_$temp = _node22;{
						var _$parent30 = _$temp;var _node24 = { "attrs": {}, "tagName": "span", "sid": 17 };_node24.children = [];_node24.attrSize = 1;_node24.attrHash = 1113816595;_node24.attrs["style"] = "color: #F5A264;";_$temp = _node24;{
							var _$parent31 = _$temp;var _node25 = _installText("1&nbsp;", 4251789008);;
							_$parent31.children.push(_node25);
						}_$temp = _node24;{
							var _$parent32 = _$temp;_addText(it1.outCurrency, _$parent32);
						}_$temp = _node24;{
							var _$parent33 = _$temp;var _node26 = _installText("=", 1789488551);;
							_$parent33.children.push(_node26);
						}_$temp = _node24;{
							var _$parent34 = _$temp;_addText(it1.rate, _$parent34);
						}_$temp = _node24;{
							var _$parent35 = _$temp;var _node27 = _installText("&nbsp;", 1553561131);;
							_$parent35.children.push(_node27);
						}_$temp = _node24;{
							var _$parent36 = _$temp;_addText(it1.inCurrency, _$parent36);
						}_chFunc(_node24);_$parent30.children.push(_node24);
					}_chFunc(_node22);_$parent27.children.push(_node22);
				}_$temp = _node21;{
					var _$parent37 = _$temp;var _node28 = { "attrs": {}, "tagName": "img", "sid": 18 };_node28.children = [];_node28.childHash = 0;_node28.attrSize = 3;_node28.attrHash = 1625992164;_node28.attrs["src"] = "../../../res/image/41_blue.png";_node28.attrs["w-class"] = "messImg";_node28.attrs["on-tap"] = "rateDetail";_$parent37.children.push(_node28);
				}_chFunc(_node21);_$parent26.children.push(_node21);
			}_$temp = _node4;{
				var _$parent38 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 19 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 2609826224;_node29.attrs["style"] = "flex: 1 0 0;";_$temp = _node29;{
					var _$parent39 = _$temp;var _node30 = { "attrs": {}, "tagName": "div", "sid": 20 };_node30.children = [];_node30.attrSize = 1;_node30.attrHash = 334357955;_node30.attrs["w-class"] = "outMessage";_$temp = _node30;{
						var _$parent40 = _$temp;_addText(it1.cfgData.tips[2], _$parent40);
					}_$temp = _node30;{
						var _$parent41 = _$temp;var _node31 = { "attrs": {}, "tagName": "span", "sid": 21 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 3753103992;_node31.attrs["style"] = "color: #888888;";_$temp = _node31;{
							var _$parent42 = _$temp;var _node32 = _installText("(", 3447679526);;
							_$parent42.children.push(_node32);
						}_$temp = _node31;{
							var _$parent43 = _$temp;_addText(it1.outCurrency, _$parent43);
						}_$temp = _node31;{
							var _$parent44 = _$temp;var _node33 = _installText(")&nbsp;", 225771518);;
							_$parent44.children.push(_node33);
						}_$temp = _node31;{
							var _$parent45 = _$temp;_addText(it1.minimum, _$parent45);
						}_chFunc(_node31);_$parent41.children.push(_node31);
					}_chFunc(_node30);_$parent39.children.push(_node30);
				}_$temp = _node29;{
					var _$parent46 = _$temp;var _node34 = { "attrs": {}, "tagName": "div", "sid": 22 };_node34.children = [];_node34.attrSize = 1;_node34.attrHash = 1153482357;_node34.attrs["w-class"] = "inMessage";_$temp = _node34;{
						var _$parent47 = _$temp;_addText(it1.cfgData.tips[3], _$parent47);
					}_$temp = _node34;{
						var _$parent48 = _$temp;var _node35 = { "attrs": {}, "tagName": "span", "sid": 23 };_node35.children = [];_node35.attrSize = 1;_node35.attrHash = 3753103992;_node35.attrs["style"] = "color: #888888;";_$temp = _node35;{
							var _$parent49 = _$temp;var _node36 = _installText("(", 3447679526);;
							_$parent49.children.push(_node36);
						}_$temp = _node35;{
							var _$parent50 = _$temp;_addText(it1.outCurrency, _$parent50);
						}_$temp = _node35;{
							var _$parent51 = _$temp;var _node37 = _installText(")&nbsp;", 225771518);;
							_$parent51.children.push(_node37);
						}_$temp = _node35;{
							var _$parent52 = _$temp;_addText(it1.maxLimit, _$parent52);
						}_chFunc(_node35);_$parent48.children.push(_node35);
					}_chFunc(_node34);_$parent46.children.push(_node34);
				}_chFunc(_node29);_$parent38.children.push(_node29);
			}if (it1.outAmount >= it1.outBalance) {
				_$temp = _node4;{
					var _$parent53 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 24 };_node38.children = [];_node38.attrSize = 1;_node38.attrHash = 3466439543;_node38.attrs["style"] = "text-align: center;color: #F5A264;";_$temp = _node38;{
						var _$parent54 = _$temp;_addText(it1.cfgData.tips[4], _$parent54);
					}_chFunc(_node38);_$parent53.children.push(_node38);
				}
			}_$temp = _node4;{
				var _$parent55 = _$temp;var _node39 = { "attrs": {}, "tagName": "div", "sid": 25 };_node39.children = [];_node39.attrSize = 2;_node39.attrHash = 4170545165;_node39.attrs["w-class"] = "sureBtn";_node39.attrs["ev-btn-tap"] = "sureClick";_$temp = _node39;{
					var _$parent56 = _$temp;var _node40 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 26 };_node40.hasChild = false;_node40.child = null;_node40.attrHash = 0;_$temp = _node40;{
						var _$parent57 = _$temp;var _node41 = {}; //jpair pre

						_node41["name"] = it1.cfgData.btnName;
						//jpair suf
						//jpair pre

						{
							var _jvalue5 = "";
							_jvalue5 = "blue";
							//jpair suf

							_node41["color"] = _jvalue5;
						}
						_addJson(_node41, _$parent57);
					}_chFunc(_node40);_$parent56.children.push(_node40);
				}_chFunc(_node39);_$parent55.children.push(_node39);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});