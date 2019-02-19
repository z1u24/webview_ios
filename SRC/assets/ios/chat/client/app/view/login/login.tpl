(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1542886283;_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "img", "sid": 1 };_node2.children = [];_node2.childHash = 0;_node2.attrSize = 2;_node2.attrHash = 2911548991;_node2.attrs["src"] = "../../res/images/home_bg.png";_node2.attrs["w-class"] = "home_bg";_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 3101906035;_node3.attrSize = 1;_node3.attrHash = 1019047777;_node3.attrs["w-class"] = "title";_$temp = _node3;{
				var _$parent4 = _$temp;var _node4 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "登录聊天";
					//jpair suf

					_node4["title"] = jvalue;
				}
				//jpair pre

				{
					var _jvalue = "";
					_jvalue = "none";
					//jpair suf

					_node4["background"] = _jvalue;
				}
				_addJson(_node4, _$parent4);
			}_$parent3.children.push(_node3);
		}_$temp = _node;{
			var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.childHash = 1166907492;_node5.attrSize = 1;_node5.attrHash = 3864756171;_node5.attrs["w-class"] = "logo-wrap";_$temp = _node5;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "img", "sid": 4 };_node6.children = [];_node6.childHash = 0;_node6.attrSize = 2;_node6.attrHash = 4149803126;_node6.attrs["w-class"] = "logo";_node6.attrs["src"] = "../../res/images/logo.png";_$parent6.children.push(_node6);
			}_$parent5.children.push(_node5);
		}_$temp = _node;{
			var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 458742139;_node7.attrs["w-class"] = "input-wrap";_$temp = _node7;{
				var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.childHash = 2355314277;_node8.attrSize = 1;_node8.attrHash = 2796611034;_node8.attrs["ev-input-change"] = "inputName";_$temp = _node8;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "chat-client-app-widget-input-input", "sid": 7 };_node9.hasChild = false;_node9.child = null;_node9.childHash = 2958648820;_node9.attrSize = 1;_node9.attrHash = 209597528;_node9.attrs["w-class"] = "pi-input idInput";_$temp = _node9;{
						var _$parent10 = _$temp;var _node10 = {}; //jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "ID";
							//jpair suf

							_node10["placeHolder"] = _jvalue2;
						}
						//jpair pre

						{
							var _jvalue3 = "";
							_jvalue3 = "font-size:32px;color:#318DE6";
							//jpair suf

							_node10["style"] = _jvalue3;
						}
						_addJson(_node10, _$parent10);
					}_$parent9.children.push(_node9);
				}_$parent8.children.push(_node8);
			}_$temp = _node7;{
				var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 1852583682;_node11.attrs["ev-input-change"] = "inputPasswd";_$temp = _node11;{
					var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "chat-client-app-widget-input-input", "sid": 9 };_node12.hasChild = false;_node12.child = null;_node12.attrSize = 1;_node12.attrHash = 245590129;_node12.attrs["w-class"] = "pi-input";_$temp = _node12;{
						var _$parent13 = _$temp;var _node13 = {}; //jpair pre

						_node13["input"] = it.passwd;
						//jpair suf
						//jpair pre

						{
							var _jvalue4 = "";
							_jvalue4 = "密码";
							//jpair suf

							_node13["placeHolder"] = _jvalue4;
						}
						//jpair pre

						_node13["itype"] = it.visible ? "text" : "password";
						//jpair suf
						//jpair pre

						_node13["clearable"] = true;
						//jpair suf
						//jpair pre

						{
							var _jvalue5 = "";
							_jvalue5 = "font-size:32px;color:#318DE6";
							//jpair suf

							_node13["style"] = _jvalue5;
						}
						_addJson(_node13, _$parent13);
					}_chFunc(_node12);_$parent12.children.push(_node12);
				}_chFunc(_node11);_$parent11.children.push(_node11);
			}_chFunc(_node7);_$parent7.children.push(_node7);
		}_$temp = _node;{
			var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.attrSize = 2;_node14.attrHash = 664851675;_node14.attrs["w-class"] = "eye";_node14.attrs["on-tap"] = "changeEye";_$temp = _node14;{
				var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "img", "sid": 11 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 3721906039;{
					var attrvalue = "";attrvalue += "../../res/images/";attrvalue += it.visible ? 'open' : 'close';attrvalue += "Eyes.png";_node15.attrs["src"] = attrvalue;
				}_node15.attrHash = _hash.nextHash(_node15.attrHash, _calTextHash(_node15.attrs["src"]));_chFunc(_node15);_$parent15.children.push(_node15);
			}_chFunc(_node14);_$parent14.children.push(_node14);
		}_$temp = _node;{
			var _$parent16 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 12 };_node16.children = [];_node16.childHash = 1893353915;_node16.attrSize = 2;_node16.attrHash = 3014274320;_node16.attrs["w-class"] = "login-btn";_node16.attrs["on-tap"] = "login";_$temp = _node16;{
				var _$parent17 = _$temp;var _node17 = _installText("登录", 2013656110);;
				_$parent17.children.push(_node17);
			}_$parent16.children.push(_node16);
		}_$temp = _node;{
			var _$parent18 = _$temp;var _node18 = { "attrs": {}, "tagName": "span", "sid": 13 };_node18.children = [];_node18.childHash = 365205437;_node18.attrSize = 2;_node18.attrHash = 54887819;_node18.attrs["w-class"] = "bottom-tip";_node18.attrs["on-tap"] = "openRegister";_$temp = _node18;{
				var _$parent19 = _$temp;var _node19 = _installText("没有账号？注册", 183457296);;
				_$parent19.children.push(_node19);
			}_$parent18.children.push(_node18);
		}_chFunc(_node);return _node;
	}
});