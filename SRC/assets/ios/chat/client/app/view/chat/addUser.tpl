(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 1415668976;_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "back";_node.attrs["style"] = "overflow-x:hidden;overflow-y:auto;";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 595615821;_node2.attrSize = 1;_node2.attrHash = 1019047777;_node2.attrs["w-class"] = "title";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "添加好友";
					//jpair suf

					_node3["title"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 2123073030;_node4.attrs["w-class"] = "search-input";_node4.attrs["ev-input-change"] = "inputUid";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "chat-client-app-widget-input-input", "sid": 3 };_node5.hasChild = false;_node5.child = null;_node5.attrSize = 1;_node5.attrHash = 209597528;_node5.attrs["w-class"] = "pi-input idInput";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = {}; //jpair pre

					{
						var _jvalue = "";
						_jvalue = "搜索用户ID";
						//jpair suf

						_node6["placeHolder"] = _jvalue;
					}
					//jpair pre

					{
						var _jvalue2 = "";
						_jvalue2 = "font-size:32px;padding-left:82px;border-radius: 12px;";
						//jpair suf

						_node6["style"] = _jvalue2;
					}
					//jpair pre

					_node6["input"] = it.rid;
					//jpair suf
					_addJson(_node6, _$parent6);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 4 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 2;_node7.attrHash = 2939545999;_node7.attrs["w-class"] = "searchIcon";_node7.attrs["src"] = "../../res/images/search-gray.png";_$parent7.children.push(_node7);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_$temp = _node;{
			var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.childHash = 4178308687;_node8.attrSize = 2;_node8.attrHash = 819121296;_node8.attrs["w-class"] = "applyBtn";_node8.attrs["on-tap"] = "goNext(e,2)";_$temp = _node8;{
				var _$parent9 = _$temp;var _node9 = _installText("添加好友", 2046438516);;
				_$parent9.children.push(_node9);
			}_$parent8.children.push(_node8);
		}_$temp = _node;{
			var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 6 };_node10.children = [];_node10.childHash = 3159910238;_node10.attrSize = 2;_node10.attrHash = 3373351143;_node10.attrs["w-class"] = "featureBar-scan-wrap";_node10.attrs["on-tap"] = "goNext(e,0)";_$temp = _node10;{
				var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "chat-client-app-widget-featureBar-featureBar", "sid": 7 };_node11.hasChild = false;_node11.child = null;_node11.childHash = 3534853503;_node11.attrHash = 0;_$temp = _node11;{
					var _$parent12 = _$temp;var _node12 = {}; //jpair pre

					{
						var _jvalue3 = "";
						_jvalue3 = "scan-circle.png";
						//jpair suf

						_node12["iconPath"] = _jvalue3;
					}
					//jpair pre

					{
						var _jvalue4 = "";
						_jvalue4 = "扫一扫";
						//jpair suf

						_node12["text"] = _jvalue4;
					}
					_addJson(_node12, _$parent12);
				}_$parent11.children.push(_node11);
			}_$parent10.children.push(_node10);
		}_$temp = _node;{
			var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 8 };_node13.children = [];_node13.childHash = 595949605;_node13.attrSize = 2;_node13.attrHash = 2501695604;_node13.attrs["w-class"] = "featureBar-code-wrap";_node13.attrs["on-tap"] = "goNext(e,1)";_$temp = _node13;{
				var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "chat-client-app-widget-featureBar-featureBar", "sid": 9 };_node14.hasChild = false;_node14.child = null;_node14.childHash = 2499910228;_node14.attrHash = 0;_$temp = _node14;{
					var _$parent15 = _$temp;var _node15 = {}; //jpair pre

					{
						var _jvalue5 = "";
						_jvalue5 = "two-code.png";
						//jpair suf

						_node15["iconPath"] = _jvalue5;
					}
					//jpair pre

					{
						var _jvalue6 = "";
						_jvalue6 = "我的二维码";
						//jpair suf

						_node15["text"] = _jvalue6;
					}
					_addJson(_node15, _$parent15);
				}_$parent14.children.push(_node14);
			}_$parent13.children.push(_node13);
		}_chFunc(_node);return _node;
	}
});