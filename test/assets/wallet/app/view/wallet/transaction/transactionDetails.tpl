(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3673846548;_node2.attrs["w-class"] = "top-head";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					_node4["title"] = it1.tx.txType === 1 ? '转账' : '收款';
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
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 4252679546;_node5.attrs["w-class"] = "body";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 4140979430;_node6.attrs["w-class"] = "status-container";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 5 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 4279687797;{
						var attrvalue = "";attrvalue += "../../../res/image/";attrvalue += it1.statusIcon;attrvalue += "";_node7.attrs["src"] = attrvalue;
					}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["src"]));_node7.attrs["w-class"] = "status-icon";_chFunc(_node7);_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 1323770159;_node8.attrs["w-class"] = "status";_$temp = _node8;{
						var _$parent9 = _$temp;_addText(it1.statusShow, _$parent9);
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}if (it1.canResend) {
					_$temp = _node6;{
						var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.childHash = 1616091048;_node9.attrSize = 2;_node9.attrHash = 2274187005;_node9.attrs["w-class"] = "resend-btn";_node9.attrs["on-tap"] = "resendClick";_$temp = _node9;{
							var _$parent11 = _$temp;var _node10 = _installText("重新发送", 398435189);;
							_$parent11.children.push(_node10);
						}_$parent10.children.push(_node9);
					}
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3411736184;_node11.attrs["w-class"] = "detail-top";_$temp = _node11;{
					var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 1141695757;_node12.attrs["w-class"] = "amount";_$temp = _node12;{
						var _$parent14 = _$temp;_addText(it1.tx.txType === 1 ? '-' : '+', _$parent14);
					}_$temp = _node12;{
						var _$parent15 = _$temp;_addText(it1.tx.pay, _$parent15);
					}_$temp = _node12;{
						var _$parent16 = _$temp;var _node13 = _installText("&nbsp;", 1553561131);;
						_$parent16.children.push(_node13);
					}_$temp = _node12;{
						var _$parent17 = _$temp;_addText(it1.tx.currencyName, _$parent17);
					}_chFunc(_node12);_$parent13.children.push(_node12);
				}_$temp = _node11;{
					var _$parent18 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 1045235690;_node14.attrs["w-class"] = "item";_$temp = _node14;{
						var _$parent19 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 11 };_node15.children = [];_node15.childHash = 3732898004;_node15.attrSize = 1;_node15.attrHash = 854203028;_node15.attrs["w-class"] = "tag";_$temp = _node15;{
							var _$parent20 = _$temp;var _node16 = _installText("收币地址", 417229775);;
							_$parent20.children.push(_node16);
						}_$parent19.children.push(_node15);
					}_$temp = _node14;{
						var _$parent21 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 12 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 487306359;_node17.attrs["w-class"] = "content";_$temp = _node17;{
							var _$parent22 = _$temp;var _node18 = { "attrs": {}, "tagName": "span", "sid": 13 };_node18.children = [];_node18.attrHash = 0;_$temp = _node18;{
								var _$parent23 = _$temp;_addText(it1.tx.toAddr, _$parent23);
							}_chFunc(_node18);_$parent22.children.push(_node18);
						}_$temp = _node17;{
							var _$parent24 = _$temp;var _node19 = { "attrs": {}, "tagName": "img", "sid": 14 };_node19.children = [];_node19.childHash = 0;_node19.attrSize = 3;_node19.attrHash = 3899950980;_node19.attrs["src"] = "../../../res/image/copy.png";_node19.attrs["w-class"] = "copy";_node19.attrs["on-tap"] = "copyToAddr";_$parent24.children.push(_node19);
						}_chFunc(_node17);_$parent21.children.push(_node17);
					}_chFunc(_node14);_$parent18.children.push(_node14);
				}_$temp = _node11;{
					var _$parent25 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 15 };_node20.children = [];_node20.attrSize = 1;_node20.attrHash = 1045235690;_node20.attrs["w-class"] = "item";_$temp = _node20;{
						var _$parent26 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 16 };_node21.children = [];_node21.childHash = 3880216523;_node21.attrSize = 1;_node21.attrHash = 854203028;_node21.attrs["w-class"] = "tag";_$temp = _node21;{
							var _$parent27 = _$temp;var _node22 = _installText("矿工费", 2445841764);;
							_$parent27.children.push(_node22);
						}_$parent26.children.push(_node21);
					}_$temp = _node20;{
						var _$parent28 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 17 };_node23.children = [];_node23.attrSize = 1;_node23.attrHash = 487306359;_node23.attrs["w-class"] = "content";_$temp = _node23;{
							var _$parent29 = _$temp;var _node24 = { "attrs": {}, "tagName": "span", "sid": 18 };_node24.children = [];_node24.attrHash = 0;_$temp = _node24;{
								var _$parent30 = _$temp;_addText(it1.tx.fee, _$parent30);
							}_$temp = _node24;{
								var _$parent31 = _$temp;var _node25 = _installText("&nbsp;", 1553561131);;
								_$parent31.children.push(_node25);
							}_$temp = _node24;{
								var _$parent32 = _$temp;_addText(it1.minerFeeUnit, _$parent32);
							}_chFunc(_node24);_$parent29.children.push(_node24);
						}_chFunc(_node23);_$parent28.children.push(_node23);
					}_chFunc(_node20);_$parent25.children.push(_node20);
				}_$temp = _node11;{
					var _$parent33 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 19 };_node26.children = [];_node26.attrSize = 1;_node26.attrHash = 1045235690;_node26.attrs["w-class"] = "item";_$temp = _node26;{
						var _$parent34 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 20 };_node27.children = [];_node27.childHash = 410023545;_node27.attrSize = 1;_node27.attrHash = 854203028;_node27.attrs["w-class"] = "tag";_$temp = _node27;{
							var _$parent35 = _$temp;var _node28 = _installText("备注", 626395445);;
							_$parent35.children.push(_node28);
						}_$parent34.children.push(_node27);
					}_$temp = _node26;{
						var _$parent36 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 21 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 487306359;_node29.attrs["w-class"] = "content";_$temp = _node29;{
							var _$parent37 = _$temp;var _node30 = { "attrs": {}, "tagName": "span", "sid": 22 };_node30.children = [];_node30.attrHash = 0;_$temp = _node30;{
								var _$parent38 = _$temp;_addText(it1.tx.info ? it1.tx.info : "无", _$parent38);
							}_chFunc(_node30);_$parent37.children.push(_node30);
						}_chFunc(_node29);_$parent36.children.push(_node29);
					}_chFunc(_node26);_$parent33.children.push(_node26);
				}_chFunc(_node11);_$parent12.children.push(_node11);
			}_$temp = _node5;{
				var _$parent39 = _$temp;var _node31 = { "attrs": {}, "tagName": "div", "sid": 23 };_node31.children = [];_node31.attrSize = 1;_node31.attrHash = 1494653708;_node31.attrs["w-class"] = "detail-bottom";_$temp = _node31;{
					var _$parent40 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 24 };_node32.children = [];_node32.attrSize = 2;_node32.attrHash = 3524279711;_node32.attrs["w-class"] = "item";_node32.attrs["style"] = "margin:0;";_$temp = _node32;{
						var _$parent41 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 25 };_node33.children = [];_node33.childHash = 3538340904;_node33.attrSize = 1;_node33.attrHash = 854203028;_node33.attrs["w-class"] = "tag";_$temp = _node33;{
							var _$parent42 = _$temp;var _node34 = _installText("交易时间", 3040961231);;
							_$parent42.children.push(_node34);
						}_$parent41.children.push(_node33);
					}_$temp = _node32;{
						var _$parent43 = _$temp;var _node35 = { "attrs": {}, "tagName": "div", "sid": 26 };_node35.children = [];_node35.attrSize = 1;_node35.attrHash = 487306359;_node35.attrs["w-class"] = "content";_$temp = _node35;{
							var _$parent44 = _$temp;var _node36 = { "attrs": {}, "tagName": "span", "sid": 27 };_node36.children = [];_node36.attrHash = 0;_$temp = _node36;{
								var _$parent45 = _$temp;_addText(it1.timeShow, _$parent45);
							}_chFunc(_node36);_$parent44.children.push(_node36);
						}_chFunc(_node35);_$parent43.children.push(_node35);
					}_chFunc(_node32);_$parent40.children.push(_node32);
				}_$temp = _node31;{
					var _$parent46 = _$temp;var _node37 = { "attrs": {}, "tagName": "div", "sid": 28 };_node37.children = [];_node37.attrSize = 1;_node37.attrHash = 1045235690;_node37.attrs["w-class"] = "item";_$temp = _node37;{
						var _$parent47 = _$temp;var _node38 = { "attrs": {}, "tagName": "div", "sid": 29 };_node38.children = [];_node38.childHash = 1422108169;_node38.attrSize = 1;_node38.attrHash = 854203028;_node38.attrs["w-class"] = "tag";_$temp = _node38;{
							var _$parent48 = _$temp;var _node39 = _installText("交易号", 2568396572);;
							_$parent48.children.push(_node39);
						}_$parent47.children.push(_node38);
					}_$temp = _node37;{
						var _$parent49 = _$temp;var _node40 = { "attrs": {}, "tagName": "div", "sid": 30 };_node40.children = [];_node40.attrSize = 1;_node40.attrHash = 487306359;_node40.attrs["w-class"] = "content";_$temp = _node40;{
							var _$parent50 = _$temp;var _node41 = { "attrs": {}, "tagName": "span", "sid": 31 };_node41.children = [];_node41.attrHash = 0;_$temp = _node41;{
								var _$parent51 = _$temp;_addText(it1.hashShow, _$parent51);
							}_chFunc(_node41);_$parent50.children.push(_node41);
						}_$temp = _node40;{
							var _$parent52 = _$temp;var _node42 = { "attrs": {}, "tagName": "img", "sid": 32 };_node42.children = [];_node42.childHash = 0;_node42.attrSize = 3;_node42.attrHash = 4076613164;_node42.attrs["src"] = "../../../res/image/copy.png";_node42.attrs["w-class"] = "copy";_node42.attrs["on-tap"] = "copyHash";_$parent52.children.push(_node42);
						}_chFunc(_node40);_$parent49.children.push(_node40);
					}_chFunc(_node37);_$parent46.children.push(_node37);
				}_$temp = _node31;{
					var _$parent53 = _$temp;var _node43 = { "attrs": {}, "tagName": "div", "sid": 33 };_node43.children = [];_node43.attrSize = 1;_node43.attrHash = 1045235690;_node43.attrs["w-class"] = "item";_$temp = _node43;{
						var _$parent54 = _$temp;var _node44 = { "attrs": {}, "tagName": "div", "sid": 34 };_node44.children = [];_node44.childHash = 3760095760;_node44.attrSize = 1;_node44.attrHash = 854203028;_node44.attrs["w-class"] = "tag";_$temp = _node44;{
							var _$parent55 = _$temp;var _node45 = _installText("发币地址", 486656894);;
							_$parent55.children.push(_node45);
						}_$parent54.children.push(_node44);
					}_$temp = _node43;{
						var _$parent56 = _$temp;var _node46 = { "attrs": {}, "tagName": "div", "sid": 35 };_node46.children = [];_node46.attrSize = 1;_node46.attrHash = 487306359;_node46.attrs["w-class"] = "content";_$temp = _node46;{
							var _$parent57 = _$temp;var _node47 = { "attrs": {}, "tagName": "span", "sid": 36 };_node47.children = [];_node47.attrHash = 0;_$temp = _node47;{
								var _$parent58 = _$temp;_addText(it1.tx.fromAddr, _$parent58);
							}_chFunc(_node47);_$parent57.children.push(_node47);
						}_$temp = _node46;{
							var _$parent59 = _$temp;var _node48 = { "attrs": {}, "tagName": "img", "sid": 37 };_node48.children = [];_node48.childHash = 0;_node48.attrSize = 3;_node48.attrHash = 3196638119;_node48.attrs["src"] = "../../../res/image/copy.png";_node48.attrs["w-class"] = "copy";_node48.attrs["on-tap"] = "copyFromAddr";_$parent59.children.push(_node48);
						}_chFunc(_node46);_$parent56.children.push(_node46);
					}_chFunc(_node43);_$parent53.children.push(_node43);
				}_$temp = _node31;{
					var _$parent60 = _$temp;var _node49 = { "attrs": {}, "tagName": "div", "sid": 38 };_node49.children = [];_node49.attrSize = 1;_node49.attrHash = 1801736937;_node49.attrs["w-class"] = "qrcode-container";_$temp = _node49;{
						var _$parent61 = _$temp;var _node50 = { "attrs": {}, "tagName": "app-components-qrcode-qrcode", "sid": 39 };_node50.hasChild = false;_node50.child = null;_node50.attrHash = 0;_$temp = _node50;{
							var _$parent62 = _$temp;var _node51 = {}; //jpair pre

							_node51["value"] = it1.qrcode;
							//jpair suf
							//jpair pre

							_node51["size"] = 200;
							//jpair suf
							_addJson(_node51, _$parent62);
						}_chFunc(_node50);_$parent61.children.push(_node50);
					}_$temp = _node49;{
						var _$parent63 = _$temp;var _node52 = { "attrs": {}, "tagName": "div", "sid": 40 };_node52.children = [];_node52.attrSize = 2;_node52.attrHash = 4172132444;_node52.attrs["w-class"] = "copy-ethersacn";_node52.attrs["on-tap"] = "openNewWeb";_$temp = _node52;{
							var _$parent64 = _$temp;_addText(it1.webText, _$parent64);
						}_chFunc(_node52);_$parent63.children.push(_node52);
					}_chFunc(_node49);_$parent60.children.push(_node49);
				}_chFunc(_node31);_$parent39.children.push(_node31);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_chFunc(_node);return _node;
	}
});