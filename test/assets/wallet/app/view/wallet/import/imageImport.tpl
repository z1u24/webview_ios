(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 138104688;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-view-wallet-components-tipsCard", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;_addJson(it1.cfgData.tipsCard, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 4064917415;_node3.attrs["w-class"] = "bottom-box";_$temp = _node3;{
				var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 2862166069;_node4.attrs["w-class"] = "choose-image-container";_node4.attrs["on-tap"] = "selectImageClick";if (!it1.chooseImage) {
					_$temp = _node4;{
						var _$parent6 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 440925614;_node5.attrs["w-class"] = "choose-image-text";_$temp = _node5;{
							var _$parent7 = _$temp;var _node6 = _installText("+", 3807426999);;
							_$parent7.children.push(_node6);
						}_$temp = _node5;{
							var _$parent8 = _$temp;_addText(it1.cfgData.selectPic, _$parent8);
						}_chFunc(_node5);_$parent6.children.push(_node5);
					}
				} else {
					_$temp = _node4;{
						var _$parent9 = _$temp;var _node7 = { "attrs": {}, "tagName": "widget", "sid": 5 };_node7.hasChild = false;_node7.child = null;_node7.attrSize = 1;_node7.attrHash = 3581192569;_node7.attrs["w-tag"] = "pi-ui-html";_node7.tagName = _node7.attrs["w-tag"];_node7.attrs["w-class"] = "ui-html";_$temp = _node7;{
							var _$parent10 = _$temp;_addJson(it1.imageHtml, _$parent10);
						}_chFunc(_node7);_$parent9.children.push(_node7);
					}_$temp = _node4;{
						var _$parent11 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 993061509;_node8.attrs["w-class"] = "image-psw-container";_node8.attrs["on-tap"] = "imagePswClick";_$temp = _node8;{
							var _$parent12 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 7 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 3770158290;_node9.attrs["w-class"] = "input-father";_node9.attrs["ev-input-change"] = "imagePswChange";_$temp = _node9;{
								var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "app-components-input-suffixInput", "sid": 8 };_node10.hasChild = false;_node10.child = null;_node10.attrHash = 0;_$temp = _node10;{
									var _$parent14 = _$temp;var _node11 = {}; //jpair pre

									{
										var jvalue = "";
										jvalue = "password";
										//jpair suf

										_node11["itype"] = jvalue;
									}
									//jpair pre

									_node11["placeHolder"] = it1.cfgData.inputPlace;
									//jpair suf
									//jpair pre

									_node11["clearable"] = true;
									//jpair suf
									//jpair pre

									_node11["available"] = it1.imagePswAvailable;
									//jpair suf
									_addJson(_node11, _$parent14);
								}_chFunc(_node10);_$parent13.children.push(_node10);
							}_chFunc(_node9);_$parent12.children.push(_node9);
						}_chFunc(_node8);_$parent11.children.push(_node8);
					}
				}_chFunc(_node4);_$parent5.children.push(_node4);
			}_$temp = _node3;{
				var _$parent15 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 2;_node12.attrHash = 1573521945;_node12.attrs["ev-btn-tap"] = "nextClick";_node12.attrs["w-class"] = "btn";_$temp = _node12;{
					var _$parent16 = _$temp;var _node13 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 10 };_node13.hasChild = false;_node13.child = null;_node13.attrHash = 0;_$temp = _node13;{
						var _$parent17 = _$temp;var _node14 = {}; //jpair pre

						_node14["name"] = it1.cfgData.btnName;
						//jpair suf
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "big";
							//jpair suf

							_node14["types"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "blue";
							//jpair suf

							_node14["color"] = _jvalue2;
						}
						_addJson(_node14, _$parent17);
					}_chFunc(_node13);_$parent16.children.push(_node13);
				}_chFunc(_node12);_$parent15.children.push(_node12);
			}_chFunc(_node3);_$parent4.children.push(_node3);
		}_chFunc(_node);return _node;
	}
});