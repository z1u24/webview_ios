(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 2510174038;_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_node.attrs["on-tap"] = "pageClick";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it1.cfgData.topBarTitle;
				//jpair suf
				//jpair pre

				{
					var jvalue = "";
					jvalue = "#fff";
					//jpair suf

					_node3["background"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4252679546;_node4.attrs["w-class"] = "body";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3022114809;_node5.attrs["w-class"] = "head-container";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.attrSize = 3;_node6.attrHash = 3936298416;_node6.attrs["w-class"] = "avatar";{
						var attrvalue = "";attrvalue += it1.avatar ? it1.avatar : '../../../res/image1/default_avatar.png';attrvalue += "";_node6.attrs["src"] = attrvalue;
					}_node6.attrHash = _hash.nextHash(_node6.attrHash, _calTextHash(_node6.attrs["src"]));_node6.attrs["on-tap"] = "uploadAvatar";_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "input", "sid": 5 };_node7.children = [];_node7.attrSize = 5;_node7.attrHash = 3424275630;_node7.attrs["id"] = "walletNameInput";_node7.attrs["w-class"] = "edit-input";{
						var _attrvalue = "";_attrvalue += it1.nickName;_attrvalue += "";_node7.attrs["value"] = _attrvalue;
					}_node7.attrHash = _hash.nextHash(_node7.attrHash, _calTextHash(_node7.attrs["value"]));_node7.attrs["on-blur"] = "walletNameInputBlur";_node7.attrs["on-focus"] = "walletNameInputFocus";_chFunc(_node7);_$parent7.children.push(_node7);
				}_$temp = _node5;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 6 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 2;_node8.attrHash = 3013318854;_node8.attrs["src"] = "../../../res/image/edit.png";_node8.attrs["w-class"] = "edit";_$parent8.children.push(_node8);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 2405874756;_node9.attrs["w-class"] = "other";_$temp = _node9;{
					var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 2;_node10.attrHash = 1176180247;_node10.attrs["w-class"] = "other-item";_node10.attrs["on-tap"] = "backupWalletClick";_$temp = _node10;{
						var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 2409504440;_node11.attrs["w-class"] = "item-title";_$temp = _node11;{
							var _$parent12 = _$temp;_addText(it1.cfgData.itemTitle[0], _$parent12);
						}_chFunc(_node11);_$parent11.children.push(_node11);
					}if (!it1.backup) {
						_$temp = _node10;{
							var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 854203028;_node12.attrs["w-class"] = "tag";_$temp = _node12;{
								var _$parent14 = _$temp;_addText(it1.cfgData.itemTitle[1], _$parent14);
							}_chFunc(_node12);_$parent13.children.push(_node12);
						}
					}_$temp = _node10;{
						var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "img", "sid": 11 };_node13.children = [];_node13.childHash = 0;_node13.attrSize = 1;_node13.attrHash = 1927703417;_node13.attrs["src"] = "../../../res/image/right_arrow2_gray.png";_$parent15.children.push(_node13);
					}_chFunc(_node10);_$parent10.children.push(_node10);
				}_$temp = _node9;{
					var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 12 };_node14.children = [];_node14.attrSize = 2;_node14.attrHash = 3822028347;_node14.attrs["w-class"] = "other-item";_node14.attrs["on-tap"] = "exportPrivateKeyClick";_$temp = _node14;{
						var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 13 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 2409504440;_node15.attrs["w-class"] = "item-title";_$temp = _node15;{
							var _$parent18 = _$temp;_addText(it1.cfgData.itemTitle[2], _$parent18);
						}_chFunc(_node15);_$parent17.children.push(_node15);
					}_$temp = _node14;{
						var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "img", "sid": 14 };_node16.children = [];_node16.childHash = 0;_node16.attrSize = 1;_node16.attrHash = 1927703417;_node16.attrs["src"] = "../../../res/image/right_arrow2_gray.png";_$parent19.children.push(_node16);
					}_chFunc(_node14);_$parent16.children.push(_node14);
				}_chFunc(_node9);_$parent9.children.push(_node9);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});