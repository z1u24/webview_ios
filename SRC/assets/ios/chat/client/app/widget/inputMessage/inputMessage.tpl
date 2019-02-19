(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 3578074486;_node.attrs["w-class"] = "outer";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 1479885300;_node2.attrs["w-class"] = "input-message-wrap";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-input-textarea", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrSize = 1;_node3.attrHash = 1695331518;_node3.attrs["w-class"] = "inputMessage";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "输入消息";
						//jpair suf

						_node4["placeHolder"] = jvalue;
					}
					//jpair pre

					_node4["input"] = it.message;
					//jpair suf
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "img", "sid": 3 };_node5.children = [];_node5.childHash = 0;_node5.attrSize = 3;_node5.attrHash = 2451850734;_node5.attrs["w-class"] = "emoji";_node5.attrs["on-tap"] = "playEmoji";_node5.attrs["src"] = "../../res/images/emoji.png";_$parent5.children.push(_node5);
			}if (it.message) {
				_$temp = _node2;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.childHash = 0;_node6.attrSize = 3;_node6.attrHash = 2241627758;_node6.attrs["w-class"] = "unfold";_node6.attrs["on-tap"] = "send";_node6.attrs["src"] = "../../res/images/send.png";_$parent6.children.push(_node6);
				}
			} else {
				_$temp = _node2;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 5 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 3;_node7.attrHash = 988116729;_node7.attrs["w-class"] = "unfold";_node7.attrs["on-tap"] = "openTool";_node7.attrs["src"] = "../../res/images/unfold.png";_$parent7.children.push(_node7);
				}
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "widget", "sid": 6 };_node8.hasChild = false;_node8.child = null;_node8.attrSize = 3;_node8.attrHash = 2138470782;_node8.attrs["w-tag"] = "chat-client-app-widget-emoji-emoji";_node8.tagName = _node8.attrs["w-tag"];_node8.attrs["w-class"] = "emojiMap";_node8.attrs["id"] = "emojiMap";{
				var attrvalue = "";attrvalue += "display:";attrvalue += it.isOnEmoji ? 'block' : 'none';attrvalue += "";_node8.attrs["style"] = attrvalue;
			}_node8.attrHash = _hash.nextHash(_node8.attrHash, _calTextHash(_node8.attrs["style"]));_chFunc(_node8);_$parent8.children.push(_node8);
		}_$temp = _node;{
			var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 3;_node9.attrHash = 1038680879;_node9.attrs["w-class"] = "toolsMap";_node9.attrs["id"] = "toolsMap";{
				var _attrvalue = "";_attrvalue += "display:";_attrvalue += it.isOnTools ? 'block' : 'none';_attrvalue += "";_node9.attrs["style"] = _attrvalue;
			}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["style"]));_$temp = _node9;{
				var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 747533179;_node10.attrs["style"] = "display:flex;flex-wrap: wrap;";{
					var _$i = 0;
					for (var _iterator = it.toolList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
						var _ref;

						if (_isArray) {
							if (_i >= _iterator.length) break;
							_ref = _iterator[_i++];
						} else {
							_i = _iterator.next();
							if (_i.done) break;
							_ref = _i.value;
						}

						var v = _ref;
						var i = _$i++;_$temp = _node10;{
							var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 2;_node11.attrHash = 942793267;_node11.attrs["w-class"] = "toolItem";{
								var _attrvalue2 = "";_attrvalue2 += "pickTool(e,";_attrvalue2 += i;_attrvalue2 += ")";_node11.attrs["on-tap"] = _attrvalue2;
							}_node11.attrHash = _hash.nextHash(_node11.attrHash, _calTextHash(_node11.attrs["on-tap"]));_$temp = _node11;{
								var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 573742888;_node12.attrs["w-class"] = "toolImg";_$temp = _node12;{
									var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "img", "sid": 11 };_node13.children = [];_node13.attrSize = 2;_node13.attrHash = 1224464696;{
										var _attrvalue3 = "";_attrvalue3 += "../../res/images/";_attrvalue3 += v.img;_attrvalue3 += "";_node13.attrs["src"] = _attrvalue3;
									}_node13.attrHash = _hash.nextHash(_node13.attrHash, _calTextHash(_node13.attrs["src"]));_node13.attrs["style"] = "width:100px;margin: 10px;";_chFunc(_node13);_$parent13.children.push(_node13);
								}_chFunc(_node12);_$parent12.children.push(_node12);
							}_$temp = _node11;{
								var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "span", "sid": 12 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 199581027;_node14.attrs["style"] = "margin:5px;";_$temp = _node14;{
									var _$parent15 = _$temp;_addText(v.name, _$parent15);
								}_chFunc(_node14);_$parent14.children.push(_node14);
							}_chFunc(_node11);_$parent11.children.push(_node11);
						}
					}
				}_chFunc(_node10);_$parent10.children.push(_node10);
			}_chFunc(_node9);_$parent9.children.push(_node9);
		}_$temp = _node;{
			var _$parent16 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 13 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 1811066936;_node15.attrs["w-class"] = "radioWrap";{
				var _attrvalue4 = "";_attrvalue4 += "display:";_attrvalue4 += it.isOnRadio ? 'block' : 'none';_attrvalue4 += "";_node15.attrs["style"] = _attrvalue4;
			}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["style"]));_$temp = _node15;{
				var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 14 };_node16.children = [];_node16.childHash = 2946814719;_node16.attrSize = 2;_node16.attrHash = 3186173998;_node16.attrs["w-class"] = "radioWrite";_node16.attrs["style"] = "animation: radio1 1s infinite;";_$parent17.children.push(_node16);
			}_$temp = _node15;{
				var _$parent18 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 15 };_node17.children = [];_node17.childHash = 2946814719;_node17.attrSize = 2;_node17.attrHash = 2457914037;_node17.attrs["w-class"] = "radioWrite";_node17.attrs["style"] = "animation: radio2 1s infinite;";_$parent18.children.push(_node17);
			}_$temp = _node15;{
				var _$parent19 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 16 };_node18.children = [];_node18.childHash = 2946814719;_node18.attrSize = 1;_node18.attrHash = 4024341401;_node18.attrs["w-class"] = "radioWrite";_$parent19.children.push(_node18);
			}_chFunc(_node15);_$parent16.children.push(_node15);
		}_chFunc(_node);return _node;
	}
});