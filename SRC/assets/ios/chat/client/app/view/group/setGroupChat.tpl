(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 1881808377;_node.attrs["w-class"] = "set-groupChat-wrap";_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 3;_node2.attrHash = 1866452137;_node2.attrs["w-class"] = "top-main-wrap";_node2.attrs["ev-next-click"] = "completeClick";_node2.attrs["ev-back-click"] = "back";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue += "创建群聊(";jvalue += it.inviteMembers.length;jvalue += "/500)";
						//jpair suf

						_node4["title"] = jvalue;
					}
					//jpair pre

					{
						var _jvalue = "";
						_jvalue += it.isSelect ? 'complete_blue.png' : 'complete_gray.png';_jvalue += "";
						//jpair suf

						_node4["nextImg"] = _jvalue;
					}
					_addJson(_node4, _$parent4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 3974108681;_node5.attrs["w-class"] = "group-info-wrap";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 4016308664;_node6.attrs["w-class"] = "group-avatar-wrap";_node6.attrs["on-tap"] = "selectImageClick";if (it.avatarHtml) {
					_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "widget", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrSize = 1;_node7.attrHash = 2364834022;_node7.attrs["w-tag"] = "pi-ui-html";_node7.tagName = _node7.attrs["w-tag"];_node7.attrs["style"] = "width:120px";_$temp = _node7;{
							var _$parent8 = _$temp;_addJson(it.avatarHtml, _$parent8);
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}
				} else {
					_$temp = _node6;{
						var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "img", "sid": 6 };_node8.children = [];_node8.childHash = 0;_node8.attrSize = 2;_node8.attrHash = 659915750;_node8.attrs["w-class"] = "group-camera";_node8.attrs["src"] = "../../res/images/group_camera.png";_$parent9.children.push(_node8);
					}
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_$temp = _node5;{
				var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.childHash = 2554036197;_node9.attrSize = 2;_node9.attrHash = 1105231951;_node9.attrs["w-class"] = "groupName";_node9.attrs["ev-input-change"] = "inputName";_$temp = _node9;{
					var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "chat-client-app-widget-input-input", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.childHash = 2626284850;_node10.attrHash = 0;_$temp = _node10;{
						var _$parent12 = _$temp;var _node11 = {}; //jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "群名";
							//jpair suf

							_node11["placeHolder"] = _jvalue2;
						}
						//jpair pre

						{
							var _jvalue3 = "";
							_jvalue3 = "width:500px;padding:20px 0;border-bottom:solid #318DE6 1px;";
							//jpair suf

							_node11["style"] = _jvalue3;
						}
						_addJson(_node11, _$parent12);
					}_$parent11.children.push(_node10);
				}_$parent10.children.push(_node9);
			}_chFunc(_node5);_$parent5.children.push(_node5);
		}_$temp = _node;{
			var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 2;_node12.attrHash = 1667031585;_node12.attrs["w-class"] = "a-part";_node12.attrs["ev-changeSelect"] = "changeSelect";{
				var _$i = 0;
				for (var _iterator = it1.friends, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
					var _ref;

					if (_isArray) {
						if (_i >= _iterator.length) break;
						_ref = _iterator[_i++];
					} else {
						_i = _iterator.next();
						if (_i.done) break;
						_ref = _i.value;
					}

					var item = _ref;
					var index = _$i++;_$temp = _node12;{
						var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 2;_node13.attrHash = 4158078093;_node13.attrs["ev-addMember"] = "addMember";_node13.attrs["style"] = "position:relative;";_$temp = _node13;{
							var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "chat-client-app-widget-selectUser-selectUser", "sid": 11 };_node14.hasChild = false;_node14.child = null;_node14.attrHash = 0;_$temp = _node14;{
								var _$parent16 = _$temp;var _node15 = {}; //jpair pre

								_node15["id"] = item;
								//jpair suf
								//jpair pre

								{
									var _jvalue4 = "";
									_jvalue4 = "user";
									//jpair suf

									_node15["chatType"] = _jvalue4;
								}
								_addJson(_node15, _$parent16);
							}_chFunc(_node14);_$parent15.children.push(_node14);
						}_chFunc(_node13);_$parent14.children.push(_node13);
					}
				}
			}_chFunc(_node12);_$parent13.children.push(_node12);
		}_chFunc(_node);return _node;
	}
});