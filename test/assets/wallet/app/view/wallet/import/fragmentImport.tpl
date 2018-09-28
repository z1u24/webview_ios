(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-view-wallet-components-tipsCard", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 1458714207;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "输入好友保管的片段";
					//jpair suf

					_node3["title"] = jvalue;
				}
				//jpair pre

				{
					var _jvalue = "";
					_jvalue = "请输入两个您分享给好友的助记词片段，导入后建议销毁本地记录，以免被盗取。";
					//jpair suf

					_node3["content"] = _jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4064917415;_node4.attrs["w-class"] = "bottom-box";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrHash = 0;_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 2;_node6.attrHash = 456403266;_node6.attrs["w-class"] = "input-father";_node6.attrs["ev-input-change"] = "fragment1Change";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrHash = 0;_$temp = _node7;{
							var _$parent8 = _$temp;var _node8 = {}; //jpair pre

							_node8["input"] = it1.fragment1;
							//jpair suf
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "输入片段一";
								//jpair suf

								_node8["placeHolder"] = _jvalue2;
							}
							//jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "padding-right:76px;";
								//jpair suf

								_node8["style"] = _jvalue3;
							}
							_addJson(_node8, _$parent8);
						}_chFunc(_node7);_$parent7.children.push(_node7);
					}_$temp = _node6;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 6 };_node9.children = [];_node9.attrSize = 3;_node9.attrHash = 1922872880;_node9.attrs["src"] = "../../../res/image/scan.png";_node9.attrs["w-class"] = "scan";{
							var attrvalue = "";attrvalue += "doScanQRCode(e,";attrvalue += 1;attrvalue += ")";_node9.attrs["on-tap"] = attrvalue;
						}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["on-tap"]));_chFunc(_node9);_$parent9.children.push(_node9);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 2;_node10.attrHash = 1221404001;_node10.attrs["w-class"] = "input-father";_node10.attrs["ev-input-change"] = "fragment2Change";_$temp = _node10;{
						var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "app-components-input-input", "sid": 8 };_node11.hasChild = false;_node11.child = null;_node11.attrHash = 0;_$temp = _node11;{
							var _$parent12 = _$temp;var _node12 = {}; //jpair pre

							_node12["input"] = it1.fragment2;
							//jpair suf
							//jpair pre

							{
								var _jvalue4 = "";
								_jvalue4 = "输入片段二";
								//jpair suf

								_node12["placeHolder"] = _jvalue4;
							}
							//jpair pre

							{
								var _jvalue5 = "";
								_jvalue5 = "padding-right:76px;";
								//jpair suf

								_node12["style"] = _jvalue5;
							}
							_addJson(_node12, _$parent12);
						}_chFunc(_node11);_$parent11.children.push(_node11);
					}_$temp = _node10;{
						var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "img", "sid": 9 };_node13.children = [];_node13.attrSize = 3;_node13.attrHash = 1922872880;_node13.attrs["src"] = "../../../res/image/scan.png";_node13.attrs["w-class"] = "scan";{
							var _attrvalue = "";_attrvalue += "doScanQRCode(e,";_attrvalue += 2;_attrvalue += ")";_node13.attrs["on-tap"] = _attrvalue;
						}_node13.attrHash = _hash.nextHash(_node13.attrHash, _calTextHash(_node13.attrs["on-tap"]));_chFunc(_node13);_$parent13.children.push(_node13);
					}_chFunc(_node10);_$parent10.children.push(_node10);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent14 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 10 };_node14.children = [];_node14.childHash = 1028141699;_node14.attrSize = 2;_node14.attrHash = 1573521945;_node14.attrs["ev-btn-tap"] = "nextClick";_node14.attrs["w-class"] = "btn";_$temp = _node14;{
					var _$parent15 = _$temp;var _node15 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 11 };_node15.hasChild = false;_node15.child = null;_node15.childHash = 2822766093;_node15.attrHash = 0;_$temp = _node15;{
						var _$parent16 = _$temp;var _node16 = {}; //jpair pre

						{
							var _jvalue6 = "";
							_jvalue6 = "下一步";
							//jpair suf

							_node16["name"] = _jvalue6;
						}
						//jpair pre

						{
							var _jvalue7 = "";
							_jvalue7 = "big";
							//jpair suf

							_node16["types"] = _jvalue7;
						}
						//jpair pre

						{
							var _jvalue8 = "";
							_jvalue8 = "blue";
							//jpair suf

							_node16["color"] = _jvalue8;
						}
						_addJson(_node16, _$parent16);
					}_$parent15.children.push(_node15);
				}_$parent14.children.push(_node14);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});