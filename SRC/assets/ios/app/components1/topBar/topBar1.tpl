(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;var opca = it.scrollHeight / 200 || 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 3134731916;{
			var attrvalue = "";attrvalue += opca > 0 ? 'background:rgba(255, 255, 255, ' + opca + ');border-bottom: 1px solid #cccccc;' : '';attrvalue += "";_node.attrs["style"] = attrvalue;
		}_node.attrHash = _hash.nextHash(_node.attrHash, _calTextHash(_node.attrs["style"]));_node.attrs["w-class"] = "topBar";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-blankDiv-topDiv", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 2946814719;_node2.attrHash = 0;_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 3382164029;_node3.attrs["w-class"] = "topBar-content";_$temp = _node3;{
				var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 847616685;_node4.attrs["style"] = " display: flex;align-items: center;";_$temp = _node4;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 2786872106;_node5.attrs["on-tap"] = "showMine";_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "widget", "sid": 5 };_node6.hasChild = false;_node6.child = null;_node6.attrSize = 1;_node6.attrHash = 505042009;_node6.attrs["w-tag"] = "app-components1-img-img";_node6.tagName = _node6.attrs["w-tag"];_node6.attrs["w-class"] = "userHead";_$temp = _node6;{
							var _$parent7 = _$temp;var _node7 = {}; //jpair pre

							_node7["imgURL"] = it.avatar ? it.avatar : 'app/res/image1/default_avatar.png';
							//jpair suf
							//jpair pre

							{
								var jvalue = "";
								jvalue = "48px;";
								//jpair suf

								_node7["width"] = jvalue;
							}
							_addJson(_node7, _$parent7);
						}_chFunc(_node6);_$parent6.children.push(_node6);
					}_chFunc(_node5);_$parent5.children.push(_node5);
				}if (it.text) {
					_$temp = _node4;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2866552653;_node8.attrs["w-class"] = "total-asset";_$temp = _node8;{
							var _$parent9 = _$temp;_addText(it.text, _$parent9);
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}
				}if (it1) {
					_$temp = _node4;{
						var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node9.hasChild = false;_node9.child = null;_node9.childHash = 907704923;_node9.attrSize = 1;_node9.attrHash = 1927727582;_node9.attrs["w-tag"] = "pi-ui-lang";_node9.tagName = _node9.attrs["w-tag"];_node9.attrs["w-class"] = "offline";_$temp = _node9;{
							var _$parent11 = _$temp;var _node10 = {}; //jpair pre

							{
								var _jvalue = "";
								_jvalue = "离线";
								//jpair suf

								_node10["zh_Hans"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "離線";
								//jpair suf

								_node10["zh_Hant"] = _jvalue2;
							}
							//jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "Offline";
								//jpair suf

								_node10["en"] = _jvalue3;
							}
							_addJson(_node10, _$parent11);
						}_$parent10.children.push(_node9);
					}
				}_chFunc(_node4);_$parent4.children.push(_node4);
			}_$temp = _node3;{
				var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "img", "sid": 8 };_node11.children = [];_node11.attrSize = 4;_node11.attrHash = 1974344371;{
					var _attrvalue = "";_attrvalue += "../../res/image1/";_attrvalue += opca > 0 ? 'refresh_blue.png' : 'refresh_white.png';_attrvalue += "";_node11.attrs["src"] = _attrvalue;
				}_node11.attrHash = _hash.nextHash(_node11.attrHash, _calTextHash(_node11.attrs["src"]));_node11.attrs["w-class"] = "refreshBtn";_node11.attrs["on-tap"] = "refreshPage";{
					var _attrvalue2 = "";_attrvalue2 += it.refresh ? 'refreshing' : '';_attrvalue2 += "";_node11.attrs["class"] = _attrvalue2;
				}_node11.attrHash = _hash.nextHash(_node11.attrHash, _calTextHash(_node11.attrs["class"]));_chFunc(_node11);_$parent12.children.push(_node11);
			}_chFunc(_node3);_$parent3.children.push(_node3);
		}_chFunc(_node);return _node;
	}
});