(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 3977707620;_node.attrs["style"] = "background: none;";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 1069733719;_node2.attrs["w-class"] = "pswInput";_node2.attrs["ev-input-change"] = "pswChange";_node2.attrs["ev-input-focus"] = "pswIconChange";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 3711312999;_node3.attrs["style"] = "flex: 1";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "chat-client-app-widget-input-input", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 0;_$temp = _node4;{
						var _$parent5 = _$temp;var _node5 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "password";
							//jpair suf

							_node5["itype"] = jvalue;
						}
						//jpair pre

						_node5["placeHolder"] = it.placeHolder ? it.placeHolder : "密码";
						//jpair suf
						//jpair pre

						_node5["input"] = it1.password;
						//jpair suf
						_addJson(_node5, _$parent5);
					}_chFunc(_node4);_$parent4.children.push(_node4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}if (it1.pswSuccess) {
				_$temp = _node2;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.childHash = 0;_node6.attrSize = 2;_node6.attrHash = 3459659632;_node6.attrs["src"] = "../../res/images/icon_right2.png";_node6.attrs["w-class"] = "successPic";_$parent6.children.push(_node6);
				}
			} else if (it1.showIconPsw) {
				_$temp = _node2;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 5 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 3;_node7.attrHash = 3435735963;_node7.attrs["src"] = "../../res/images/close_blue.png";_node7.attrs["w-class"] = "successPic";_node7.attrs["on-tap"] = "clearPsw";_$parent7.children.push(_node7);
				}
			}_$temp = _node2;{
				var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 6 };_node8.children = [];_node8.attrSize = 3;_node8.attrHash = 4003818084;{
					var attrvalue = "";attrvalue += "../../res/images/";attrvalue += it1.showPsw ? 'openEyes.png' : 'closeEyes.png';attrvalue += "";_node8.attrs["src"] = attrvalue;
				}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["src"]));_node8.attrs["w-class"] = "successPic";_node8.attrs["on-tap"] = "isShowPsw";_chFunc(_node8);_$parent8.children.push(_node8);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 1;_node9.attrHash = 1989288640;_node9.attrs["style"] = "display: flex;flex: 3;";_$temp = _node9;{
				var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 3556130807;{
					var _attrvalue = "";_attrvalue += "line line";_attrvalue += it1.secret > 0 ? it1.secret : '';_attrvalue += "";_node10.attrs["w-class"] = _attrvalue;
				}_node10.attrHash = _hash.nextHash(_node10.attrHash, _calTextHash(_node10.attrs["w-class"]));_chFunc(_node10);_$parent10.children.push(_node10);
			}_$temp = _node9;{
				var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3556130807;{
					var _attrvalue2 = "";_attrvalue2 += "line line";_attrvalue2 += it1.secret > 1 ? it1.secret : '';_attrvalue2 += "";_node11.attrs["w-class"] = _attrvalue2;
				}_node11.attrHash = _hash.nextHash(_node11.attrHash, _calTextHash(_node11.attrs["w-class"]));_chFunc(_node11);_$parent11.children.push(_node11);
			}_$temp = _node9;{
				var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 3556130807;{
					var _attrvalue3 = "";_attrvalue3 += "line line";_attrvalue3 += it1.secret > 2 ? it1.secret : '';_attrvalue3 += "";_node12.attrs["w-class"] = _attrvalue3;
				}_node12.attrHash = _hash.nextHash(_node12.attrHash, _calTextHash(_node12.attrs["w-class"]));_chFunc(_node12);_$parent12.children.push(_node12);
			}_chFunc(_node9);_$parent9.children.push(_node9);
		}if (it1.showTips) {
			_$temp = _node;{
				var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 11 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 819962544;_node13.attrs["w-class"] = "tips";_$temp = _node13;{
					var _$parent14 = _$temp;_addText(it.tips ? it.tips : "至少8位字符，可包含英文、数字、特殊字符！", _$parent14);
				}_chFunc(_node13);_$parent13.children.push(_node13);
			}
		}_$temp = _node;{
			var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 12 };_node14.children = [];_node14.attrSize = 3;_node14.attrHash = 1916498017;_node14.attrs["w-class"] = "pswInput";_node14.attrs["ev-input-change"] = "repChange";_node14.attrs["ev-input-focus"] = "repIconChange";_$temp = _node14;{
				var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 13 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 3711312999;_node15.attrs["style"] = "flex: 1";_$temp = _node15;{
					var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "chat-client-app-widget-input-input", "sid": 14 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 0;_$temp = _node16;{
						var _$parent18 = _$temp;var _node17 = {}; //jpair pre

						{
							var _jvalue = "";
							_jvalue = "password";
							//jpair suf

							_node17["itype"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "重复密码";
							//jpair suf

							_node17["placeHolder"] = _jvalue2;
						}
						//jpair pre

						_node17["input"] = it1.rePassword;
						//jpair suf
						_addJson(_node17, _$parent18);
					}_chFunc(_node16);_$parent17.children.push(_node16);
				}_chFunc(_node15);_$parent16.children.push(_node15);
			}if (it1.repSuccess) {
				_$temp = _node14;{
					var _$parent19 = _$temp;var _node18 = { "attrs": {}, "tagName": "img", "sid": 15 };_node18.children = [];_node18.childHash = 0;_node18.attrSize = 2;_node18.attrHash = 3459659632;_node18.attrs["src"] = "../../res/images/icon_right2.png";_node18.attrs["w-class"] = "successPic";_$parent19.children.push(_node18);
				}
			} else if (it1.showIconRep) {
				_$temp = _node14;{
					var _$parent20 = _$temp;var _node19 = { "attrs": {}, "tagName": "img", "sid": 16 };_node19.children = [];_node19.childHash = 0;_node19.attrSize = 3;_node19.attrHash = 1073299692;_node19.attrs["src"] = "../../res/images/close_blue.png";_node19.attrs["w-class"] = "successPic";_node19.attrs["on-tap"] = "clearRep";_$parent20.children.push(_node19);
				}
			}_$temp = _node14;{
				var _$parent21 = _$temp;var _node20 = { "attrs": {}, "tagName": "img", "sid": 17 };_node20.children = [];_node20.attrSize = 3;_node20.attrHash = 1377691494;{
					var _attrvalue4 = "";_attrvalue4 += "../../res/images/";_attrvalue4 += it1.showRep ? 'openEyes.png' : 'closeEyes.png';_attrvalue4 += "";_node20.attrs["src"] = _attrvalue4;
				}_node20.attrHash = _hash.nextHash(_node20.attrHash, _calTextHash(_node20.attrs["src"]));_node20.attrs["w-class"] = "successPic";_node20.attrs["on-tap"] = "isShowRep";_chFunc(_node20);_$parent21.children.push(_node20);
			}_chFunc(_node14);_$parent15.children.push(_node14);
		}_chFunc(_node);return _node;
	}
});