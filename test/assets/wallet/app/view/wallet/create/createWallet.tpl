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
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "app-view-wallet-components-tipsCard", "sid": 3 };_node5.hasChild = false;_node5.child = null;_node5.attrHash = 0;_$temp = _node5;{
					var _$parent6 = _$temp;_addJson(it1.cfgData.tipsCard, _$parent6);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 4064917415;_node6.attrs["w-class"] = "bottom-box";_$temp = _node6;{
					var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 2242460041;_node7.attrs["w-class"] = "avatar-container";_node7.attrs["on-tap"] = "selectImageClick";if (!it1.chooseImage) {
						_$temp = _node7;{
							var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.childHash = 2946814719;_node8.attrSize = 2;_node8.attrHash = 1434357408;_node8.attrs["style"] = "background-image: url(../../../res/image/default_avater_big.png);";_node8.attrs["w-class"] = "avatar";_$parent9.children.push(_node8);
						}
					} else {
						_$temp = _node7;{
							var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node9.hasChild = false;_node9.child = null;_node9.attrSize = 1;_node9.attrHash = 3581192569;_node9.attrs["w-tag"] = "pi-ui-html";_node9.tagName = _node9.attrs["w-tag"];_node9.attrs["w-class"] = "ui-html";_$temp = _node9;{
								var _$parent11 = _$temp;_addJson(it1.avatarHtml, _$parent11);
							}_chFunc(_node9);_$parent10.children.push(_node9);
						}
					}if (!it1.chooseImage) {
						_$temp = _node7;{
							var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.childHash = 2494917381;_node10.attrSize = 1;_node10.attrHash = 2018028060;_node10.attrs["w-class"] = "choose-img-mask";_$temp = _node10;{
								var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "img", "sid": 9 };_node11.children = [];_node11.childHash = 0;_node11.attrSize = 2;_node11.attrHash = 1046207112;_node11.attrs["src"] = "../../../res/image/choose_img.png";_node11.attrs["w-class"] = "choose-img";_$parent13.children.push(_node11);
							}_$parent12.children.push(_node10);
						}
					}_chFunc(_node7);_$parent8.children.push(_node7);
				}_$temp = _node6;{
					var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 2;_node12.attrHash = 1151561434;_node12.attrs["w-class"] = "name-box";_node12.attrs["ev-input-change"] = "walletNameChange";_$temp = _node12;{
						var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 11 };_node13.hasChild = false;_node13.child = null;_node13.attrHash = 0;_$temp = _node13;{
							var _$parent16 = _$temp;var _node14 = {}; //jpair pre

							_node14["input"] = it1.walletName;
							//jpair suf
							//jpair pre

							_node14["maxLength"] = 10;
							//jpair suf
							_addJson(_node14, _$parent16);
						}_chFunc(_node13);_$parent15.children.push(_node13);
					}_$temp = _node12;{
						var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "img", "sid": 12 };_node15.children = [];_node15.childHash = 0;_node15.attrSize = 3;_node15.attrHash = 3189835190;_node15.attrs["w-class"] = "random";_node15.attrs["src"] = "../../../res/image/dice.png";_node15.attrs["on-tap"] = "randomPlayName";_$parent17.children.push(_node15);
					}_chFunc(_node12);_$parent14.children.push(_node12);
				}_$temp = _node6;{
					var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 13 };_node16.children = [];_node16.childHash = 1315115397;_node16.attrSize = 1;_node16.attrHash = 1423178489;_node16.attrs["ev-psw-change"] = "pswChange";_$temp = _node16;{
						var _$parent19 = _$temp;var _node17 = { "attrs": {}, "tagName": "app-components-password-password", "sid": 14 };_node17.hasChild = false;_node17.child = null;_node17.childHash = 3962405210;_node17.attrHash = 0;_$temp = _node17;{
							var _$parent20 = _$temp;var _node18 = {}; //jpair pre

							_node18["hideTips"] = true;
							//jpair suf
							_addJson(_node18, _$parent20);
						}_$parent19.children.push(_node17);
					}_$parent18.children.push(_node16);
				}_$temp = _node6;{
					var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 15 };_node19.children = [];_node19.attrSize = 2;_node19.attrHash = 4226660121;_node19.attrs["w-class"] = "input-father";_node19.attrs["ev-input-change"] = "pswConfirmChange";_$temp = _node19;{
						var _$parent22 = _$temp;var _node20 = { "attrs": {}, "tagName": "app-components-input-suffixInput", "sid": 16 };_node20.hasChild = false;_node20.child = null;_node20.attrHash = 0;_$temp = _node20;{
							var _$parent23 = _$temp;var _node21 = {}; //jpair pre

							{
								var jvalue = "";
								jvalue = "password";
								//jpair suf

								_node21["itype"] = jvalue;
							}
							//jpair pre

							_node21["placeHolder"] = it1.cfgData.inputPlace;
							//jpair suf
							//jpair pre

							_node21["clearable"] = true;
							//jpair suf
							//jpair pre

							_node21["available"] = it1.pswEqualed;
							//jpair suf
							_addJson(_node21, _$parent23);
						}_chFunc(_node20);_$parent22.children.push(_node20);
					}_chFunc(_node19);_$parent21.children.push(_node19);
				}_$temp = _node6;{
					var _$parent24 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 17 };_node22.children = [];_node22.attrSize = 2;_node22.attrHash = 1335275082;_node22.attrs["w-class"] = "registered-protocol";_node22.attrs["ev-checkbox-click"] = "checkBoxClick";_$temp = _node22;{
						var _$parent25 = _$temp;var _node23 = { "attrs": {}, "tagName": "app-components1-checkbox-checkbox", "sid": 18 };_node23.hasChild = false;_node23.child = null;_node23.attrHash = 0;_$temp = _node23;{
							var _$parent26 = _$temp;var _node24 = {}; //jpair pre

							{
								var _jvalue = "";
								_jvalue = "false";
								//jpair suf

								_node24["itype"] = _jvalue;
							}
							//jpair pre

							_node24["text"] = it1.cfgData.readAgree;
							//jpair suf
							_addJson(_node24, _$parent26);
						}_chFunc(_node23);_$parent25.children.push(_node23);
					}_$temp = _node22;{
						var _$parent27 = _$temp;var _node25 = { "attrs": {}, "tagName": "span", "sid": 19 };_node25.children = [];_node25.attrSize = 2;_node25.attrHash = 1160372705;_node25.attrs["w-class"] = "user-protocol";_node25.attrs["on-tap"] = "agreementClick";_$temp = _node25;{
							var _$parent28 = _$temp;_addText(it1.cfgData.agreement, _$parent28);
						}_chFunc(_node25);_$parent27.children.push(_node25);
					}_chFunc(_node22);_$parent24.children.push(_node22);
				}_$temp = _node6;{
					var _$parent29 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 20 };_node26.children = [];_node26.attrSize = 2;_node26.attrHash = 841812617;_node26.attrs["ev-btn-tap"] = "createClick";_node26.attrs["w-class"] = "btn";_$temp = _node26;{
						var _$parent30 = _$temp;var _node27 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 21 };_node27.hasChild = false;_node27.child = null;_node27.attrHash = 0;_$temp = _node27;{
							var _$parent31 = _$temp;var _node28 = {}; //jpair pre

							_node28["name"] = it1.cfgData.btnName;
							//jpair suf
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "big";
								//jpair suf

								_node28["types"] = _jvalue2;
							}
							//jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "white";
								//jpair suf

								_node28["color"] = _jvalue3;
							}
							_addJson(_node28, _$parent31);
						}_chFunc(_node27);_$parent30.children.push(_node27);
					}_chFunc(_node26);_$parent29.children.push(_node26);
				}_chFunc(_node6);_$parent7.children.push(_node6);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});