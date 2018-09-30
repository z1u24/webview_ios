(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 2139844790;_node.attrs["class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it1.cfgData.topBarTitle;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 487306359;_node4.attrs["w-class"] = "content";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 473178061;_node5.attrs["w-class"] = "inputItem";_node5.attrs["ev-input-change"] = "oldPswChange";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.attrHash = 0;_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = {}; //jpair pre

						_node7["placeHolder"] = it1.cfgData.itemTitle[0];
						//jpair suf
						//jpair pre

						{
							var jvalue = "";
							jvalue = "password";
							//jpair suf

							_node7["itype"] = jvalue;
						}
						//jpair pre

						_node7["clearable"] = true;
						//jpair suf
						//jpair pre

						_node7["autofocus"] = true;
						//jpair suf
						_addJson(_node7, _$parent7);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 2691877920;_node8.attrs["style"] = "margin: 0 10px;";_node8.attrs["ev-psw-change"] = "newPswChange";_$temp = _node8;{
					var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "app-components-password-password", "sid": 6 };_node9.hasChild = false;_node9.child = null;_node9.attrHash = 0;_$temp = _node9;{
						var _$parent10 = _$temp;var _node10 = {}; //jpair pre

						_node10["placeHolder"] = it1.cfgData.itemTitle[1];
						//jpair suf
						//jpair pre

						_node10["hideTips"] = true;
						//jpair suf
						_addJson(_node10, _$parent10);
					}_chFunc(_node9);_$parent9.children.push(_node9);
				}_chFunc(_node8);_$parent8.children.push(_node8);
			}_$temp = _node4;{
				var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 7 };_node11.children = [];_node11.attrSize = 2;_node11.attrHash = 2036299803;_node11.attrs["w-class"] = "inputItem";_node11.attrs["ev-input-change"] = "rePswChange";_$temp = _node11;{
					var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "app-components-input-suffixInput", "sid": 8 };_node12.hasChild = false;_node12.child = null;_node12.attrHash = 0;_$temp = _node12;{
						var _$parent13 = _$temp;var _node13 = {}; //jpair pre

						{
							var _jvalue = "";
							_jvalue = "password";
							//jpair suf

							_node13["itype"] = _jvalue;
						}
						//jpair pre

						_node13["placeHolder"] = it1.cfgData.itemTitle[2];
						//jpair suf
						//jpair pre

						_node13["clearable"] = true;
						//jpair suf
						//jpair pre

						_node13["available"] = it1.pswEqualed;
						//jpair suf
						_addJson(_node13, _$parent13);
					}_chFunc(_node12);_$parent12.children.push(_node12);
				}_chFunc(_node11);_$parent11.children.push(_node11);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_$temp = _node;{
			var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 9 };_node14.children = [];_node14.attrSize = 2;_node14.attrHash = 398681393;_node14.attrs["style"] = "width: 100%;position: absolute;bottom: 60px;";_node14.attrs["ev-btn-tap"] = "btnClicked";_$temp = _node14;{
				var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 10 };_node15.hasChild = false;_node15.child = null;_node15.attrHash = 0;_$temp = _node15;{
					var _$parent16 = _$temp;var _node16 = {}; //jpair pre

					_node16["name"] = it1.cfgData.btnName;
					//jpair suf
					//jpair pre

					{
						var _jvalue2 = "";
						_jvalue2 = "blue";
						//jpair suf

						_node16["color"] = _jvalue2;
					}
					//jpair pre

					{
						var _jvalue3 = "";
						_jvalue3 = "margin:0 60px;";
						//jpair suf

						_node16["style"] = _jvalue3;
					}
					_addJson(_node16, _$parent16);
				}_chFunc(_node15);_$parent15.children.push(_node15);
			}_chFunc(_node14);_$parent14.children.push(_node14);
		}_chFunc(_node);return _node;
	}
});