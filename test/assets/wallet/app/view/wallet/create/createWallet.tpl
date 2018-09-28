(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 1465611370;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "创建账户";
					//jpair suf

					_node3["title"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4252679546;_node4.attrs["w-class"] = "body";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "app-view-wallet-components-tipsCard", "sid": 3 };_node5.hasChild = false;_node5.child = null;_node5.childHash = 65741633;_node5.attrHash = 0;_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = {}; //jpair pre

					{
						var _jvalue = "";
						_jvalue = "设置账户密码";
						//jpair suf

						_node6["title"] = _jvalue;
					}
					//jpair pre

					{
						var _jvalue2 = "";
						_jvalue2 = "系统已为您创建好账户，请设置账户密码。";
						//jpair suf

						_node6["content"] = _jvalue2;
					}
					_addJson(_node6, _$parent6);
				}_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 4 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 4064917415;_node7.attrs["w-class"] = "bottom-box";_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 2242460041;_node8.attrs["w-class"] = "avatar-container";_node8.attrs["on-tap"] = "selectImageClick";if (!it1.chooseImage) {
						_$temp = _node8;{
							var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.childHash = 2946814719;_node9.attrSize = 2;_node9.attrHash = 1434357408;_node9.attrs["style"] = "background-image: url(../../../res/image/default_avater_big.png);";_node9.attrs["w-class"] = "avatar";_$parent9.children.push(_node9);
						}
					} else {
						_$temp = _node8;{
							var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node10.hasChild = false;_node10.child = null;_node10.attrSize = 1;_node10.attrHash = 3581192569;_node10.attrs["w-tag"] = "pi-ui-html";_node10.tagName = _node10.attrs["w-tag"];_node10.attrs["w-class"] = "ui-html";_$temp = _node10;{
								var _$parent11 = _$temp;_addJson(it1.avatarHtml, _$parent11);
							}_chFunc(_node10);_$parent10.children.push(_node10);
						}
					}if (!it1.chooseImage) {
						_$temp = _node8;{
							var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.childHash = 2494917381;_node11.attrSize = 1;_node11.attrHash = 2018028060;_node11.attrs["w-class"] = "choose-img-mask";_$temp = _node11;{
								var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 9 };_node12.children = [];_node12.childHash = 0;_node12.attrSize = 2;_node12.attrHash = 1046207112;_node12.attrs["src"] = "../../../res/image/choose_img.png";_node12.attrs["w-class"] = "choose-img";_$parent13.children.push(_node12);
							}_$parent12.children.push(_node11);
						}
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}_$temp = _node7;{
					var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 2;_node13.attrHash = 1151561434;_node13.attrs["w-class"] = "name-box";_node13.attrs["ev-input-change"] = "walletNameChange";_$temp = _node13;{
						var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 11 };_node14.hasChild = false;_node14.child = null;_node14.attrHash = 0;_$temp = _node14;{
							var _$parent16 = _$temp;var _node15 = {}; //jpair pre

							_node15["input"] = it1.walletName;
							//jpair suf
							_addJson(_node15, _$parent16);
						}_chFunc(_node14);_$parent15.children.push(_node14);
					}_$temp = _node13;{
						var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "img", "sid": 12 };_node16.children = [];_node16.childHash = 0;_node16.attrSize = 3;_node16.attrHash = 3189835190;_node16.attrs["w-class"] = "random";_node16.attrs["src"] = "../../../res/image/dice.png";_node16.attrs["on-tap"] = "randomPlayName";_$parent17.children.push(_node16);
					}_chFunc(_node13);_$parent14.children.push(_node13);
				}_$temp = _node7;{
					var _$parent18 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 13 };_node17.children = [];_node17.childHash = 1315115397;_node17.attrSize = 1;_node17.attrHash = 1423178489;_node17.attrs["ev-psw-change"] = "pswChange";_$temp = _node17;{
						var _$parent19 = _$temp;var _node18 = { "attrs": {}, "tagName": "app-components-password-password", "sid": 14 };_node18.hasChild = false;_node18.child = null;_node18.childHash = 3962405210;_node18.attrHash = 0;_$temp = _node18;{
							var _$parent20 = _$temp;var _node19 = {}; //jpair pre

							_node19["hideTips"] = true;
							//jpair suf
							_addJson(_node19, _$parent20);
						}_$parent19.children.push(_node18);
					}_$parent18.children.push(_node17);
				}_$temp = _node7;{
					var _$parent21 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 15 };_node20.children = [];_node20.attrSize = 2;_node20.attrHash = 4226660121;_node20.attrs["w-class"] = "input-father";_node20.attrs["ev-input-change"] = "pswConfirmChange";_$temp = _node20;{
						var _$parent22 = _$temp;var _node21 = { "attrs": {}, "tagName": "app-components-input-suffixInput", "sid": 16 };_node21.hasChild = false;_node21.child = null;_node21.attrHash = 0;_$temp = _node21;{
							var _$parent23 = _$temp;var _node22 = {}; //jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "password";
								//jpair suf

								_node22["itype"] = _jvalue3;
							}
							//jpair pre

							{
								var _jvalue4 = "";
								_jvalue4 = "重复密码";
								//jpair suf

								_node22["placeHolder"] = _jvalue4;
							}
							//jpair pre

							_node22["clearable"] = true;
							//jpair suf
							//jpair pre

							_node22["available"] = it1.pswEqualed;
							//jpair suf
							_addJson(_node22, _$parent23);
						}_chFunc(_node21);_$parent22.children.push(_node21);
					}_chFunc(_node20);_$parent21.children.push(_node20);
				}_$temp = _node7;{
					var _$parent24 = _$temp;var _node23 = { "attrs": {}, "tagName": "div", "sid": 17 };_node23.children = [];_node23.childHash = 4075739400;_node23.attrSize = 2;_node23.attrHash = 1335275082;_node23.attrs["w-class"] = "registered-protocol";_node23.attrs["ev-checkbox-click"] = "checkBoxClick";_$temp = _node23;{
						var _$parent25 = _$temp;var _node24 = { "attrs": {}, "tagName": "app-components1-checkbox-checkbox", "sid": 18 };_node24.hasChild = false;_node24.child = null;_node24.childHash = 2901728037;_node24.attrHash = 0;_$temp = _node24;{
							var _$parent26 = _$temp;var _node25 = {}; //jpair pre

							{
								var _jvalue5 = "";
								_jvalue5 = "false";
								//jpair suf

								_node25["itype"] = _jvalue5;
							}
							//jpair pre

							{
								var _jvalue6 = "";
								_jvalue6 = "我已经认证阅读并同意";
								//jpair suf

								_node25["text"] = _jvalue6;
							}
							_addJson(_node25, _$parent26);
						}_$parent25.children.push(_node24);
					}_$temp = _node23;{
						var _$parent27 = _$temp;var _node26 = { "attrs": {}, "tagName": "span", "sid": 19 };_node26.children = [];_node26.childHash = 2049235899;_node26.attrSize = 2;_node26.attrHash = 1160372705;_node26.attrs["w-class"] = "user-protocol";_node26.attrs["on-tap"] = "agreementClick";_$temp = _node26;{
							var _$parent28 = _$temp;var _node27 = _installText("隐私条约", 3041249419);;
							_$parent28.children.push(_node27);
						}_$parent27.children.push(_node26);
					}_$parent24.children.push(_node23);
				}_$temp = _node7;{
					var _$parent29 = _$temp;var _node28 = { "attrs": {}, "tagName": "div", "sid": 20 };_node28.children = [];_node28.childHash = 3222726375;_node28.attrSize = 2;_node28.attrHash = 841812617;_node28.attrs["ev-btn-tap"] = "createClick";_node28.attrs["w-class"] = "btn";_$temp = _node28;{
						var _$parent30 = _$temp;var _node29 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 21 };_node29.hasChild = false;_node29.child = null;_node29.childHash = 1145593105;_node29.attrHash = 0;_$temp = _node29;{
							var _$parent31 = _$temp;var _node30 = {}; //jpair pre

							{
								var _jvalue7 = "";
								_jvalue7 = "完成";
								//jpair suf

								_node30["name"] = _jvalue7;
							}
							//jpair pre

							{
								var _jvalue8 = "";
								_jvalue8 = "big";
								//jpair suf

								_node30["types"] = _jvalue8;
							}
							//jpair pre

							{
								var _jvalue9 = "";
								_jvalue9 = "white";
								//jpair suf

								_node30["color"] = _jvalue9;
							}
							_addJson(_node30, _$parent31);
						}_$parent30.children.push(_node29);
					}_$parent29.children.push(_node28);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});