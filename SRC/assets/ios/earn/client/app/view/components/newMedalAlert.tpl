(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 2749889518;_node2.attrs["w-class"] = "content flex-col";_node2.attrs["class"] = "fadein";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "img", "sid": 2 };_node3.children = [];_node3.childHash = 0;_node3.attrSize = 4;_node3.attrHash = 362075452;_node3.attrs["w-class"] = "closeImg";_node3.attrs["on-tap"] = "backPrePage";_node3.attrs["src"] = "../../res/image1/close-white.png";_node3.attrs["alt"] = "";_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 132240172;_node4.attrs["w-class"] = "medal";_node4.attrs["id"] = "medalShow";_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 4;_node5.attrHash = 61700112;_node5.attrs["class"] = "sunShine";_node5.attrs["src"] = "../../res/image/medalShow_bg.png";_node5.attrs["width"] = "480px";_node5.attrs["height"] = "480px";_$parent5.children.push(_node5);
				}_$temp = _node4;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 5 };_node6.children = [];_node6.attrSize = 3;_node6.attrHash = 3830307928;_node6.attrs["w-class"] = "medal-img";{
						var attrvalue = "";attrvalue += "../../res/image/medals/";attrvalue += it.medalImg;attrvalue += ".png";_node6.attrs["src"] = attrvalue;
					}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["src"]));_node6.attrs["width"] = "480px";_chFunc(_node6);_$parent6.children.push(_node6);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}_$temp = _node2;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 42359464;_node7.attrs["w-class"] = "flex-col";_node7.attrs["style"] = "margin-top: -100px;";_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node8.hasChild = false;_node8.child = null;_node8.attrSize = 1;_node8.attrHash = 642504149;_node8.attrs["w-class"] = "medal-title";_node8.attrs["w-tag"] = "pi-ui-lang";_node8.tagName = _node8.attrs["w-tag"];_$temp = _node8;{
						var _$parent9 = _$temp;_addJson(it.medalTitle, _$parent9);
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}if (it.medalType === 0) {
					_$temp = _node7;{
						var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "widget", "sid": 8 };_node9.hasChild = false;_node9.child = null;_node9.attrSize = 1;_node9.attrHash = 873744636;_node9.attrs["w-class"] = "medal-desc";_node9.attrs["w-tag"] = "pi-ui-lang";_node9.tagName = _node9.attrs["w-tag"];_$temp = _node9;{
							var _$parent11 = _$temp;var _node10 = {}; //jpair pre

							{
								var jvalue = "";
								jvalue += "挖矿达到";jvalue += it.condition;jvalue += "KT";
								//jpair suf

								_node10["zh_Hans"] = jvalue;
							}
							//jpair pre

							{
								var _jvalue = "";
								_jvalue += "挖礦達到";_jvalue += it.condition;_jvalue += "KT";
								//jpair suf

								_node10["zh_Hant"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "";
								//jpair suf

								_node10["en"] = _jvalue2;
							}
							_addJson(_node10, _$parent11);
						}_chFunc(_node9);_$parent10.children.push(_node9);
					}
				} else {
					_$temp = _node7;{
						var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "p", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 2813371484;_node11.attrs["w-class"] = "medal-desc";_$temp = _node11;{
							var _$parent13 = _$temp;_addText(it.condition, _$parent13);
						}_chFunc(_node11);_$parent12.children.push(_node11);
					}
				}_$temp = _node7;{
					var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 2405874756;_node12.attrs["w-class"] = "other";_$temp = _node12;{
						var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 11 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 2266088471;_node13.attrs["w-class"] = "other-say";_$temp = _node13;{
							var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "widget", "sid": 12 };_node14.hasChild = false;_node14.child = null;_node14.childHash = 1323078054;_node14.attrSize = 1;_node14.attrHash = 2788653451;_node14.attrs["style"] = "font-size: 32px;";_node14.attrs["w-tag"] = "pi-ui-lang";_node14.tagName = _node14.attrs["w-tag"];_$temp = _node14;{
								var _$parent17 = _$temp;var _node15 = {}; //jpair pre

								{
									var _jvalue3 = "";
									_jvalue3 = "成功就是比别人优秀一点点";
									//jpair suf

									_node15["zh_Hans"] = _jvalue3;
								}
								//jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 = "成功就是比別人優秀一點點";
									//jpair suf

									_node15["zh_Hant"] = _jvalue4;
								}
								//jpair pre

								{
									var _jvalue5 = "";
									_jvalue5 = "Success is a little better than others.";
									//jpair suf

									_node15["en"] = _jvalue5;
								}
								_addJson(_node15, _$parent17);
							}_$parent16.children.push(_node14);
						}_$temp = _node13;{
							var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 13 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 1432510312;_node16.attrs["style"] = "font-size: 26px;text-align: right;";_$temp = _node16;{
								var _$parent19 = _$temp;var _node17 = _installText("by", 2554833524);;
								_$parent19.children.push(_node17);
							}_$temp = _node16;{
								var _$parent20 = _$temp;_addText(it.userInfo.name, _$parent20);
							}_chFunc(_node16);_$parent18.children.push(_node16);
						}_chFunc(_node13);_$parent15.children.push(_node13);
					}_$temp = _node12;{
						var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "img", "sid": 14 };_node18.children = [];_node18.attrSize = 4;_node18.attrHash = 4163241476;{
							var _attrvalue = "";_attrvalue += it.userInfo.avatar ? it.userInfo.avatar : '../../res/image1/default_head.png';_attrvalue += "";_node18.attrs["src"] = _attrvalue;
						}_node18.attrHash = _hash.nextHash(_node18.attrHash, _calTextHash(_node18.attrs["src"]));_node18.attrs["height"] = "100px";_node18.attrs["width"] = "100px";_node18.attrs["alt"] = "";_chFunc(_node18);_$parent21.children.push(_node18);
					}_chFunc(_node12);_$parent14.children.push(_node12);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_$temp = _node2;{
				var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 15 };_node19.children = [];_node19.childHash = 2342456344;_node19.attrSize = 2;_node19.attrHash = 1042563400;_node19.attrs["w-class"] = "content-bottom";_node19.attrs["on-tap"] = "shareWX";_$temp = _node19;{
					var _$parent23 = _$temp;var _node20 = { "attrs": {}, "tagName": "img", "sid": 16 };_node20.children = [];_node20.childHash = 0;_node20.attrSize = 4;_node20.attrHash = 2828437691;_node20.attrs["src"] = "../../res/image1/img_share_wechat.png";_node20.attrs["alt"] = "";_node20.attrs["width"] = "45px";_node20.attrs["height"] = "45px";_$parent23.children.push(_node20);
				}_$temp = _node19;{
					var _$parent24 = _$temp;var _node21 = { "attrs": {}, "tagName": "widget", "sid": 17 };_node21.hasChild = false;_node21.child = null;_node21.childHash = 758998373;_node21.attrSize = 1;_node21.attrHash = 3228966597;_node21.attrs["w-class"] = "medal-btn";_node21.attrs["w-tag"] = "pi-ui-lang";_node21.tagName = _node21.attrs["w-tag"];_$temp = _node21;{
						var _$parent25 = _$temp;var _node22 = {}; //jpair pre

						{
							var _jvalue6 = "";
							_jvalue6 = "秀一下";
							//jpair suf

							_node22["zh_Hans"] = _jvalue6;
						}
						//jpair pre

						{
							var _jvalue7 = "";
							_jvalue7 = "秀一下";
							//jpair suf

							_node22["zh_Hant"] = _jvalue7;
						}
						//jpair pre

						{
							var _jvalue8 = "";
							_jvalue8 = "";
							//jpair suf

							_node22["en"] = _jvalue8;
						}
						_addJson(_node22, _$parent25);
					}_$parent24.children.push(_node21);
				}_$parent22.children.push(_node19);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});