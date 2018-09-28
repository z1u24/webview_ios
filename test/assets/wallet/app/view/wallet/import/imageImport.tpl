(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-view-wallet-components-tipsCard", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 988326378;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "使用原始照片和照片密码";
					//jpair suf

					_node3["title"] = jvalue;
				}
				//jpair pre

				{
					var _jvalue = "";
					_jvalue = "请使用创建账户时设置的照片和照片密码恢复账户。";
					//jpair suf

					_node3["content"] = _jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4064917415;_node4.attrs["w-class"] = "bottom-box";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 2;_node5.attrHash = 2862166069;_node5.attrs["w-class"] = "choose-image-container";_node5.attrs["on-tap"] = "selectImageClick";if (!it1.chooseImage) {
					_$temp = _node5;{
						var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.childHash = 1806375974;_node6.attrSize = 1;_node6.attrHash = 440925614;_node6.attrs["w-class"] = "choose-image-text";_$temp = _node6;{
							var _$parent7 = _$temp;var _node7 = _installText("+ 选择照片", 2646043561);;
							_$parent7.children.push(_node7);
						}_$parent6.children.push(_node6);
					}
				} else {
					_$temp = _node5;{
						var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "widget", "sid": 5 };_node8.hasChild = false;_node8.child = null;_node8.attrSize = 1;_node8.attrHash = 3581192569;_node8.attrs["w-tag"] = "pi-ui-html";_node8.tagName = _node8.attrs["w-tag"];_node8.attrs["w-class"] = "ui-html";_$temp = _node8;{
							var _$parent9 = _$temp;_addJson(it1.imageHtml, _$parent9);
						}_chFunc(_node8);_$parent8.children.push(_node8);
					}_$temp = _node5;{
						var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 993061509;_node9.attrs["w-class"] = "image-psw-container";_node9.attrs["on-tap"] = "imagePswClick";_$temp = _node9;{
							var _$parent11 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 7 };_node10.children = [];_node10.attrSize = 2;_node10.attrHash = 3770158290;_node10.attrs["w-class"] = "input-father";_node10.attrs["ev-input-change"] = "imagePswChange";_$temp = _node10;{
								var _$parent12 = _$temp;var _node11 = { "attrs": {}, "tagName": "app-components-input-suffixInput", "sid": 8 };_node11.hasChild = false;_node11.child = null;_node11.attrHash = 0;_$temp = _node11;{
									var _$parent13 = _$temp;var _node12 = {}; //jpair pre

									{
										var _jvalue2 = "";
										_jvalue2 = "password";
										//jpair suf

										_node12["itype"] = _jvalue2;
									}
									//jpair pre

									{
										var _jvalue3 = "";
										_jvalue3 = "输入照片密码";
										//jpair suf

										_node12["placeHolder"] = _jvalue3;
									}
									//jpair pre

									_node12["clearable"] = true;
									//jpair suf
									//jpair pre

									_node12["available"] = it1.imagePswAvailable;
									//jpair suf
									_addJson(_node12, _$parent13);
								}_chFunc(_node11);_$parent12.children.push(_node11);
							}_chFunc(_node10);_$parent11.children.push(_node10);
						}_chFunc(_node9);_$parent10.children.push(_node9);
					}
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.childHash = 1028141699;_node13.attrSize = 2;_node13.attrHash = 1573521945;_node13.attrs["ev-btn-tap"] = "nextClick";_node13.attrs["w-class"] = "btn";_$temp = _node13;{
					var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 10 };_node14.hasChild = false;_node14.child = null;_node14.childHash = 2822766093;_node14.attrHash = 0;_$temp = _node14;{
						var _$parent16 = _$temp;var _node15 = {}; //jpair pre

						{
							var _jvalue4 = "";
							_jvalue4 = "下一步";
							//jpair suf

							_node15["name"] = _jvalue4;
						}
						//jpair pre

						{
							var _jvalue5 = "";
							_jvalue5 = "big";
							//jpair suf

							_node15["types"] = _jvalue5;
						}
						//jpair pre

						{
							var _jvalue6 = "";
							_jvalue6 = "blue";
							//jpair suf

							_node15["color"] = _jvalue6;
						}
						_addJson(_node15, _$parent16);
					}_$parent15.children.push(_node14);
				}_$parent14.children.push(_node13);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});