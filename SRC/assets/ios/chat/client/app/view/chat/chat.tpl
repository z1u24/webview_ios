(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 5;_node.attrHash = 1651556666;_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "goBack";_node.attrs["w-class"] = "new-page";_node.attrs["ev-send"] = "send";_node.attrs["ev-next-click"] = "groupDetail";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it.name;
				//jpair suf
				//jpair pre

				_node3["nextImg"] = it.chatType == "group" ? "more-dot-blue.png" : "";
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}if (it.lastAnnounce) {
			_$temp = _node;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 2608787885;_node4.attrs["style"] = "height:128px;";_node4.attrs["ev-close-announce"] = "closeAnnounce";_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "chat-client-app-view-group-latestAnnItem", "sid": 3 };_node5.hasChild = false;_node5.child = null;_node5.attrHash = 0;_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = {}; //jpair pre

						_node6["aIncId"] = it.lastAnnounce;
						//jpair suf
						//jpair pre

						_node6["gid"] = it.id;
						//jpair suf
						_addJson(_node6, _$parent6);
					}_chFunc(_node5);_$parent5.children.push(_node5);
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}
		}_$temp = _node;{
			var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 4 };_node7.children = [];_node7.attrSize = 4;_node7.attrHash = 3696471574;_node7.attrs["w-class"] = "messageBox";_node7.attrs["on-tap"] = "pageClick";_node7.attrs["ev-messItem-radio"] = "stopRadio";_node7.attrs["id"] = "chatMessageBox";{
				var _$i = 0;
				for (var _iterator = it.hidIncArray, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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
					var i = _$i++;_$temp = _node7;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "chat-client-app-widget-messageItem-messageItem", "sid": 5 };_node8.hasChild = false;_node8.child = null;_node8.attrHash = 0;_$temp = _node8;{
							var _$parent9 = _$temp;var _node9 = {}; //jpair pre

							_node9["hIncId"] = v;
							//jpair suf
							//jpair pre

							_node9["name"] = it.name;
							//jpair suf
							//jpair pre

							_node9["chatType"] = it.chatType;
							//jpair suf
							//jpair pre

							_node9["playRadio"] = it.onRadio && v == it.onRadio.hIncId ? it.onRadio.playRadio : false;
							//jpair suf
							_addJson(_node9, _$parent9);
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}
				}
			}if (it.newMsg) {
				_$temp = _node7;{
					var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 6 };_node10.children = [];_node10.attrHash = 0;_$temp = _node10;{
						var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node11.hasChild = false;_node11.child = null;_node11.attrSize = 1;_node11.attrHash = 1662958535;_node11.attrs["w-tag"] = "chat-client-app-widget-messageItem-messageItem";_node11.tagName = _node11.attrs["w-tag"];_node11.attrs["style"] = "float:right;";_$temp = _node11;{
							var _$parent12 = _$temp;_addJson(it.newMsg, _$parent12);
						}_chFunc(_node11);_$parent11.children.push(_node11);
					}_$temp = _node10;{
						var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "img", "sid": 8 };_node12.children = [];_node12.childHash = 0;_node12.attrSize = 2;_node12.attrHash = 720694045;_node12.attrs["src"] = "../../res/images/loading.gif";_node12.attrs["w-class"] = "loading";_$parent13.children.push(_node12);
					}_chFunc(_node10);_$parent10.children.push(_node10);
				}
			}_chFunc(_node7);_$parent7.children.push(_node7);
		}_$temp = _node;{
			var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.attrSize = 6;_node13.attrHash = 1554070769;_node13.attrs["ev-open-Emoji"] = "openEmoji";_node13.attrs["ev-input-focus"] = "inputFocus";_node13.attrs["ev-input-change"] = "msgChange";_node13.attrs["ev-emoji-click"] = "pickEmoji";_node13.attrs["ev-open-Tools"] = "openTools";_node13.attrs["ev-send-before"] = "sendImgBefore";_$temp = _node13;{
				var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "widget", "sid": 10 };_node14.hasChild = false;_node14.child = null;_node14.attrHash = 2290993080;_node14.attrs["w-tag"] = "chat-client-app-widget-inputMessage-inputMessage";_node14.tagName = _node14.attrs["w-tag"];_$temp = _node14;{
					var _$parent16 = _$temp;var _node15 = {}; //jpair pre

					_node15["isOnEmoji"] = it.isOnEmoji;
					//jpair suf
					//jpair pre

					_node15["message"] = it.inputMessage;
					//jpair suf
					//jpair pre

					_node15["isOnTools"] = it.isOnTools;
					//jpair suf
					_addJson(_node15, _$parent16);
				}_chFunc(_node14);_$parent15.children.push(_node14);
			}_chFunc(_node13);_$parent14.children.push(_node13);
		}_chFunc(_node);return _node;
	}
});