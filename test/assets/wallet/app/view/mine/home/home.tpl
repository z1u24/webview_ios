(function (_cfg, it, it1) {
				var _$temp = void 0,
				    node = void 0;_$temp = node;{
								var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 1579271828;_node.attrs["class"] = "new-page";{
												var attrvalue = "";attrvalue += "mine ";attrvalue += it1.close ? 'mineHide' : '';attrvalue += "";_node.attrs["w-class"] = attrvalue;
								}_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["w-class"]));_$temp = _node;{
												var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 3605533161;{
																var _attrvalue = "";_attrvalue += "left ";_attrvalue += it1.close ? 'leftHide' : '';_attrvalue += "";_node2.attrs["w-class"] = _attrvalue;
												}_node2.attrHash = _hash.nextHash(_node2.attrHash, _calTextHash(_node2.attrs["w-class"]));_$temp = _node2;{
																var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 2188685783;_node3.attrs["w-class"] = "topBack";_$temp = _node3;{
																				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "img", "sid": 3 };_node4.children = [];_node4.attrSize = 3;_node4.attrHash = 789794913;{
																								var _attrvalue2 = "";_attrvalue2 += it1.avatar ? it1.avatar : '../../../res/image1/default_avatar.png';_attrvalue2 += "";_node4.attrs["src"] = _attrvalue2;
																				}_node4.attrHash = _hash.nextHash(_node4.attrHash, _calTextHash(_node4.attrs["src"]));_node4.attrs["w-class"] = "userHead";_node4.attrs["on-tap"] = "login";_chFunc(_node4);_$parent4.children.push(_node4);
																}_$temp = _node3;{
																				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 4 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 2;_node5.attrHash = 3480930167;_node5.attrs["src"] = "../../../res/image1/topbar_backimg.png";_node5.attrs["w-class"] = "backImg";_$parent5.children.push(_node5);
																}if (it1.hasWallet) {
																				_$temp = _node3;{
																								var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.childHash = 2447379741;_node6.attrSize = 1;_node6.attrHash = 3109599029;_node6.attrs["w-class"] = "addFriend";_$temp = _node6;{
																												var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 6 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 2;_node7.attrHash = 3314612640;_node7.attrs["src"] = "../../../res/image/01.png";_node7.attrs["w-class"] = "scanImg";_$parent7.children.push(_node7);
																								}_$temp = _node6;{
																												var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 7 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 3;_node8.attrHash = 188109943;_node8.attrs["src"] = "../../../res/image/19.png";_node8.attrs["w-class"] = "scanImg";_node8.attrs["on-tap"] = "showMyQrcode";_$parent8.children.push(_node8);
																								}_$parent6.children.push(_node6);
																				}_$temp = _node3;{
																								var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 8 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 4232090967;_node9.attrs["w-class"] = "userName";_$temp = _node9;{
																												var _$parent10 = _$temp;_addText(it1.userName, _$parent10);
																								}_chFunc(_node9);_$parent9.children.push(_node9);
																				}_$temp = _node3;{
																								var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 9 };_node10.children = [];_node10.attrSize = 2;_node10.attrHash = 3708489470;_node10.attrs["w-class"] = "address";_node10.attrs["on-tap"] = "copyAddr";_$temp = _node10;{
																												var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "span", "sid": 10 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 1633402939;_node11.attrs["w-class"] = "addrNum";_$temp = _node11;{
																																var _$parent13 = _$temp;_addText(it1.address, _$parent13);
																												}_chFunc(_node11);_$parent12.children.push(_node11);
																								}_$temp = _node10;{
																												var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 11 };_node12.children = [];_node12.childHash = 0;_node12.attrSize = 2;_node12.attrHash = 3714896391;_node12.attrs["src"] = "../../../res/image1/42.png";_node12.attrs["w-class"] = "copy";_$parent14.children.push(_node12);
																								}_chFunc(_node10);_$parent11.children.push(_node10);
																				}
																} else {
																				_$temp = _node3;{
																								var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 12 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 4232090967;_node13.attrs["w-class"] = "userName";_$temp = _node13;{
																												var _$parent16 = _$temp;_addText(it1.cfgData.defaultUserName, _$parent16);
																								}_chFunc(_node13);_$parent15.children.push(_node13);
																				}
																}_chFunc(_node3);_$parent3.children.push(_node3);
												}_$temp = _node2;{
																var _$parent17 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 13 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 1387585091;_node14.attrs["w-class"] = "leftContent";{
																				var _$i = 0;
																				for (var _iterator = it1.list, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
																								var _ref;

																								if (_isArray) {
																												if (_i >= _iterator.length) break;
																												_ref = _iterator[_i++];
																								} else {
																												_i = _iterator.next();
																												if (_i.done) break;
																												_ref = _i.value;
																								}

																								var val = _ref;
																								var ind = _$i++;_$temp = _node14;{
																												var _$parent18 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 14 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 3537545609;_node15.attrs["w-class"] = "item";{
																																var _attrvalue3 = "";_attrvalue3 += "itemClick(";_attrvalue3 += ind;_attrvalue3 += ")";_node15.attrs["on-tap"] = _attrvalue3;
																												}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["on-tap"]));_$temp = _node15;{
																																var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "img", "sid": 15 };_node16.children = [];_node16.attrSize = 2;_node16.attrHash = 1062230525;{
																																				var _attrvalue4 = "";_attrvalue4 = val.img;_node16.attrs["src"] = _attrvalue4;
																																}_node16.attrHash = _hash.nextHash(_node16.attrHash, _calTextHash(_node16.attrs["src"]));_node16.attrs["w-class"] = "itemImg";_chFunc(_node16);_$parent19.children.push(_node16);
																												}_$temp = _node15;{
																																var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "span", "sid": 16 };_node17.children = [];_node17.attrSize = 1;_node17.attrHash = 136397174;_node17.attrs["w-class"] = "itemName";_$temp = _node17;{
																																				var _$parent21 = _$temp;_addText(val.name, _$parent21);
																																}_chFunc(_node17);_$parent20.children.push(_node17);
																												}if (ind == 0 && !it1.hasBackupMnemonic && it1.hasWallet) {
																																_$temp = _node15;{
																																				var _$parent22 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 17 };_node18.children = [];_node18.attrSize = 2;_node18.attrHash = 2038303220;_node18.attrs["w-class"] = "backup";_node18.attrs["on-tap"] = "backUp";_$temp = _node18;{
																																								var _$parent23 = _$temp;_addText(it1.cfgData.backUp, _$parent23);
																																				}_chFunc(_node18);_$parent22.children.push(_node18);
																																}
																												}_chFunc(_node15);_$parent18.children.push(_node15);
																								}if (ind == 2) {
																												_$temp = _node14;{
																																var _$parent24 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 18 };_node19.children = [];_node19.childHash = 2946814719;_node19.attrSize = 1;_node19.attrHash = 374818280;_node19.attrs["w-class"] = "line";_$parent24.children.push(_node19);
																												}
																								}
																				}
																}_chFunc(_node14);_$parent17.children.push(_node14);
												}_chFunc(_node2);_$parent2.children.push(_node2);
								}_$temp = _node;{
												var _$parent25 = _$temp;var _node20 = { "attrs": {}, "tagName": "div", "sid": 19 };_node20.children = [];_node20.childHash = 2946814719;_node20.attrSize = 2;_node20.attrHash = 1646668145;_node20.attrs["w-class"] = "right";_node20.attrs["on-tap"] = "closePage";_$parent25.children.push(_node20);
								}_chFunc(_node);return _node;
				}
});