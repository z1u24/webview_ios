(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2139844790;_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";topBarTitle = { "zh_Hans": "账户", "zh_Hant": "賬戶", "en": "" };_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = topBarTitle;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4252679546;_node4.attrs["w-class"] = "body";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 2921542448;_node5.attrs["w-class"] = "head-container";_node5.attrs["class"] = "pi-input";if (!it1.chooseImage) {
					_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "widget", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.attrSize = 1;_node6.attrHash = 2040333420;_node6.attrs["w-tag"] = "app-components1-img-img";_node6.tagName = _node6.attrs["w-tag"];_node6.attrs["on-tap"] = "uploadAvatar";_$temp = _node6;{
							var _$parent7 = _$temp;var _node7 = {}; //jpair pre

							_node7["imgURL"] = it1.avatar;
							//jpair suf
							//jpair pre

							{
								var jvalue = "";
								jvalue = "120px;";
								//jpair suf

								_node7["width"] = jvalue;
							}
							_addJson(_node7, _$parent7);
						}_chFunc(_node6);_$parent6.children.push(_node6);
					}
				} else {
					_$temp = _node5;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "widget", "sid": 5 };_node8.hasChild = false;_node8.child = null;_node8.attrSize = 2;_node8.attrHash = 2677830137;_node8.attrs["w-tag"] = "pi-ui-html";_node8.tagName = _node8.attrs["w-tag"];_node8.attrs["on-tap"] = "uploadAvatar";_node8.attrs["w-class"] = "ui-html";_$temp = _node8;{
							var _$parent9 = _$temp;_addJson(it1.avatarHtml, _$parent9);
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}
				}_$temp = _node5;{
					var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 3;_node9.attrHash = 4035764181;_node9.attrs["style"] = "flex: 1 0 0;";_node9.attrs["ev-input-blur"] = "walletNameInputBlur";_node9.attrs["ev-input-change"] = "walletNameInputChange";defaultName = { "zh_Hans": "昵称未设置", "zh_Hant": "暱稱未設置", "en": "" };_$temp = _node9;{
						var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 7 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 0;_$temp = _node10;{
							var _$parent12 = _$temp;var _node11 = {}; //jpair pre

							_node11["input"] = it1.nickName;
							//jpair suf
							//jpair pre

							_node11["maxLength"] = 10;
							//jpair suf
							//jpair pre

							_node11["autofocus"] = true;
							//jpair suf
							//jpair pre

							_node11["placeHolder"] = defaultName;
							//jpair suf
							//jpair pre

							_node11["disabled"] = !it1.userInput;
							//jpair suf
							//jpair pre

							_node11["notUnderLine"] = true;
							//jpair suf
							_addJson(_node11, _$parent12);
						}_chFunc(_node10);_$parent11.children.push(_node10);
					}_chFunc(_node9);_$parent10.children.push(_node9);
				}_$temp = _node5;{
					var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 8 };_node12.children = [];_node12.childHash = 0;_node12.attrSize = 3;_node12.attrHash = 538725330;_node12.attrs["src"] = "app/res/image/edit_blue.png";_node12.attrs["w-class"] = "edit";_node12.attrs["on-tap"] = "changeInput";_$parent13.children.push(_node12);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 2405874756;_node13.attrs["w-class"] = "other";_$temp = _node13;{
					var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 4121046989;_node14.attrs["on-tap"] = "changePhone";itemTitle = [{ "zh_Hans": "手机号", "zh_Hant": "手機號", "en": "" }, { "zh_Hans": "修改密码", "zh_Hant": "修改密碼", "en": "" }, { "zh_Hans": "备份助记词", "zh_Hant": "備份助記詞", "en": "" }, { "zh_Hans": "未备份", "zh_Hant": "未備份", "en": "" }, { "zh_Hans": "导出私钥", "zh_Hant": "導出私鑰", "en": "" }];phone = { "zh_Hans": it1.phone, "zh_Hant": it1.phone, "en": "" };bindPhone = { "zh_Hans": "未设置", "zh_Hant": "未設置", "en": "" };if (it1.phone.indexOf('*') > 0) {
						_$temp = _node14;{
							var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 11 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 2273338806;_node15.attrs["w-class"] = "other-item";_node15.attrs["ev-switch-click"] = "onSwitchChange";_$temp = _node15;{
								var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 12 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 2409504440;_node16.attrs["w-class"] = "item-title";_$temp = _node16;{
									var _$parent18 = _$temp;var _node17 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 13 };_node17.hasChild = false;_node17.child = null;_node17.attrHash = 0;_$temp = _node17;{
										var _$parent19 = _$temp;_addJson(itemTitle[0], _$parent19);
									}_chFunc(_node17);_$parent18.children.push(_node17);
								}_chFunc(_node16);_$parent17.children.push(_node16);
							}_$temp = _node15;{
								var _$parent20 = _$temp;var _node18 = { "attrs": {}, "tagName": "span", "sid": 14 };_node18.children = [];_node18.attrSize = 1;_node18.attrHash = 854203028;_node18.attrs["w-class"] = "tag";_$temp = _node18;{
									var _$parent21 = _$temp;var _node19 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 15 };_node19.hasChild = false;_node19.child = null;_node19.attrHash = 0;_$temp = _node19;{
										var _$parent22 = _$temp;_addJson(phone, _$parent22);
									}_chFunc(_node19);_$parent21.children.push(_node19);
								}_chFunc(_node18);_$parent20.children.push(_node18);
							}_chFunc(_node15);_$parent16.children.push(_node15);
						}
					} else {
						_$temp = _node14;{
							var _$parent23 = _$temp;var _node20 = { "attrs": {}, "tagName": "app-components-basicItem-basicItem", "sid": 16 };_node20.hasChild = false;_node20.child = null;_node20.attrHash = 0;_$temp = _node20;{
								var _$parent24 = _$temp;var _node21 = {}; //jpair pre

								_node21["name"] = itemTitle[0];
								//jpair suf
								//jpair pre

								_node21["describe"] = bindPhone;
								//jpair suf
								_addJson(_node21, _$parent24);
							}_chFunc(_node20);_$parent23.children.push(_node20);
						}
					}_chFunc(_node14);_$parent15.children.push(_node14);
				}_$temp = _node13;{
					var _$parent25 = _$temp;var _node22 = { "attrs": {}, "tagName": "div", "sid": 17 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 2364954210;_node22.attrs["on-tap"] = "changePsw";_$temp = _node22;{
						var _$parent26 = _$temp;var _node23 = { "attrs": {}, "tagName": "app-components-basicItem-basicItem", "sid": 18 };_node23.hasChild = false;_node23.child = null;_node23.attrHash = 0;_$temp = _node23;{
							var _$parent27 = _$temp;var _node24 = {}; //jpair pre

							_node24["name"] = itemTitle[1];
							//jpair suf
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "margin:0;border:none;";
								//jpair suf

								_node24["style"] = _jvalue;
							}
							_addJson(_node24, _$parent27);
						}_chFunc(_node23);_$parent26.children.push(_node23);
					}_chFunc(_node22);_$parent25.children.push(_node22);
				}_chFunc(_node13);_$parent14.children.push(_node13);
			}_$temp = _node4;{
				var _$parent28 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 19 };_node25.children = [];_node25.attrSize = 1;_node25.attrHash = 2405874756;_node25.attrs["w-class"] = "other";_$temp = _node25;{
					var _$parent29 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 20 };_node26.children = [];_node26.attrSize = 2;_node26.attrHash = 1176180247;_node26.attrs["w-class"] = "other-item";_node26.attrs["on-tap"] = "backupWalletClick";_$temp = _node26;{
						var _$parent30 = _$temp;var _node27 = { "attrs": {}, "tagName": "div", "sid": 21 };_node27.children = [];_node27.attrSize = 1;_node27.attrHash = 2409504440;_node27.attrs["w-class"] = "item-title";_$temp = _node27;{
							var _$parent31 = _$temp;var _node28 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 22 };_node28.hasChild = false;_node28.child = null;_node28.attrHash = 0;_$temp = _node28;{
								var _$parent32 = _$temp;_addJson(itemTitle[2], _$parent32);
							}_chFunc(_node28);_$parent31.children.push(_node28);
						}_chFunc(_node27);_$parent30.children.push(_node27);
					}if (!it1.backup) {
						_$temp = _node26;{
							var _$parent33 = _$temp;var _node29 = { "attrs": {}, "tagName": "div", "sid": 23 };_node29.children = [];_node29.attrSize = 1;_node29.attrHash = 854203028;_node29.attrs["w-class"] = "tag";_$temp = _node29;{
								var _$parent34 = _$temp;var _node30 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 24 };_node30.hasChild = false;_node30.child = null;_node30.attrHash = 0;_$temp = _node30;{
									var _$parent35 = _$temp;_addJson(itemTitle[3], _$parent35);
								}_chFunc(_node30);_$parent34.children.push(_node30);
							}_chFunc(_node29);_$parent33.children.push(_node29);
						}
					}_$temp = _node26;{
						var _$parent36 = _$temp;var _node31 = { "attrs": {}, "tagName": "img", "sid": 25 };_node31.children = [];_node31.childHash = 0;_node31.attrSize = 2;_node31.attrHash = 384056489;_node31.attrs["src"] = "app/res/image/right_arrow2_gray.png";_node31.attrs["w-class"] = "rightArrow";_$parent36.children.push(_node31);
					}_chFunc(_node26);_$parent29.children.push(_node26);
				}_$temp = _node25;{
					var _$parent37 = _$temp;var _node32 = { "attrs": {}, "tagName": "div", "sid": 26 };_node32.children = [];_node32.attrSize = 3;_node32.attrHash = 3880860044;_node32.attrs["w-class"] = "other-item";_node32.attrs["on-tap"] = "exportPrivateKeyClick";_node32.attrs["style"] = "border-bottom: none;";_$temp = _node32;{
						var _$parent38 = _$temp;var _node33 = { "attrs": {}, "tagName": "div", "sid": 27 };_node33.children = [];_node33.attrSize = 1;_node33.attrHash = 2409504440;_node33.attrs["w-class"] = "item-title";_$temp = _node33;{
							var _$parent39 = _$temp;var _node34 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 28 };_node34.hasChild = false;_node34.child = null;_node34.attrHash = 0;_$temp = _node34;{
								var _$parent40 = _$temp;_addJson(itemTitle[4], _$parent40);
							}_chFunc(_node34);_$parent39.children.push(_node34);
						}_chFunc(_node33);_$parent38.children.push(_node33);
					}_$temp = _node32;{
						var _$parent41 = _$temp;var _node35 = { "attrs": {}, "tagName": "img", "sid": 29 };_node35.children = [];_node35.childHash = 0;_node35.attrSize = 2;_node35.attrHash = 384056489;_node35.attrs["src"] = "app/res/image/right_arrow2_gray.png";_node35.attrs["w-class"] = "rightArrow";_$parent41.children.push(_node35);
					}_chFunc(_node32);_$parent37.children.push(_node32);
				}_chFunc(_node25);_$parent28.children.push(_node25);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});