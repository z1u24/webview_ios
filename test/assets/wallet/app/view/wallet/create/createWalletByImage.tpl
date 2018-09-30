(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				_node3["title"] = it1.cfgData.topBarTitle;
				//jpair suf
				_addJson(_node3, _$parent3);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4252679546;_node4.attrs["w-class"] = "body";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "app-view-wallet-components-tipsCard", "sid": 3 };_node5.hasChild = false;_node5.child = null;_node5.attrHash = 0;_$temp = _node5;{
					var _$parent6 = _$temp;_addJson(it1.cfgData.tipsCard, _$parent6);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent7 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 4 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 4064917415;_node6.attrs["w-class"] = "bottom-box";_$temp = _node6;{
					var _$parent8 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 5 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 2862166069;_node7.attrs["w-class"] = "choose-image-container";_node7.attrs["on-tap"] = "selectImageClick";if (!it1.chooseImage) {
						_$temp = _node7;{
							var _$parent9 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 440925614;_node8.attrs["w-class"] = "choose-image-text";_$temp = _node8;{
								var _$parent10 = _$temp;var _node9 = _installText("+", 3807426999);;
								_$parent10.children.push(_node9);
							}_$temp = _node8;{
								var _$parent11 = _$temp;_addText(it1.cfgData.selectPic, _$parent11);
							}_chFunc(_node8);_$parent9.children.push(_node8);
						}
					} else {
						_$temp = _node7;{
							var _$parent12 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node10.hasChild = false;_node10.child = null;_node10.attrSize = 1;_node10.attrHash = 3581192569;_node10.attrs["w-tag"] = "pi-ui-html";_node10.tagName = _node10.attrs["w-tag"];_node10.attrs["w-class"] = "ui-html";_$temp = _node10;{
								var _$parent13 = _$temp;_addJson(it1.imageHtml, _$parent13);
							}_chFunc(_node10);_$parent12.children.push(_node10);
						}_$temp = _node7;{
							var _$parent14 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 8 };_node11.children = [];_node11.attrSize = 2;_node11.attrHash = 993061509;_node11.attrs["w-class"] = "image-psw-container";_node11.attrs["on-tap"] = "imagePswClick";_$temp = _node11;{
								var _$parent15 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 9 };_node12.children = [];_node12.attrSize = 2;_node12.attrHash = 3770158290;_node12.attrs["w-class"] = "input-father";_node12.attrs["ev-input-change"] = "imagePswChange";_$temp = _node12;{
									var _$parent16 = _$temp;var _node13 = { "attrs": {}, "tagName": "app-components-input-suffixInput", "sid": 10 };_node13.hasChild = false;_node13.child = null;_node13.attrHash = 0;_$temp = _node13;{
										var _$parent17 = _$temp;var _node14 = {}; //jpair pre

										{
											var jvalue = "";
											jvalue = "password";
											//jpair suf

											_node14["itype"] = jvalue;
										}
										//jpair pre

										_node14["placeHolder"] = it1.cfgData.inputPlace[0];
										//jpair suf
										//jpair pre

										_node14["clearable"] = true;
										//jpair suf
										//jpair pre

										_node14["available"] = it1.imagePswAvailable;
										//jpair suf
										_addJson(_node14, _$parent17);
									}_chFunc(_node13);_$parent16.children.push(_node13);
								}_chFunc(_node12);_$parent15.children.push(_node12);
							}_$temp = _node11;{
								var _$parent18 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 11 };_node15.children = [];_node15.attrSize = 2;_node15.attrHash = 1107892557;_node15.attrs["w-class"] = "input-father1";_node15.attrs["ev-input-change"] = "imagePswConfirmChange";_$temp = _node15;{
									var _$parent19 = _$temp;var _node16 = { "attrs": {}, "tagName": "app-components-input-suffixInput", "sid": 12 };_node16.hasChild = false;_node16.child = null;_node16.attrHash = 0;_$temp = _node16;{
										var _$parent20 = _$temp;var _node17 = {}; //jpair pre

										{
											var _jvalue = "";
											_jvalue = "password";
											//jpair suf

											_node17["itype"] = _jvalue;
										}
										//jpair pre

										_node17["placeHolder"] = it1.cfgData.inputPlace[1];
										//jpair suf
										//jpair pre

										_node17["clearable"] = true;
										//jpair suf
										//jpair pre

										_node17["available"] = it1.pswEqualed;
										//jpair suf
										_addJson(_node17, _$parent20);
									}_chFunc(_node16);_$parent19.children.push(_node16);
								}_chFunc(_node15);_$parent18.children.push(_node15);
							}_chFunc(_node11);_$parent14.children.push(_node11);
						}
					}_chFunc(_node7);_$parent8.children.push(_node7);
				}_$temp = _node6;{
					var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "div", "sid": 13 };_node18.children = [];_node18.attrSize = 2;_node18.attrHash = 1573521945;_node18.attrs["ev-btn-tap"] = "nextClick";_node18.attrs["w-class"] = "btn";_$temp = _node18;{
						var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 14 };_node19.hasChild = false;_node19.child = null;_node19.attrHash = 0;_$temp = _node19;{
							var _$parent23 = _$temp;var _node20 = {}; //jpair pre

							_node20["name"] = it1.cfgData.btnName;
							//jpair suf
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "big";
								//jpair suf

								_node20["types"] = _jvalue2;
							}
							//jpair pre

							{
								var _jvalue3 = "";
								_jvalue3 = "blue";
								//jpair suf

								_node20["color"] = _jvalue3;
							}
							_addJson(_node20, _$parent23);
						}_chFunc(_node19);_$parent22.children.push(_node19);
					}_chFunc(_node18);_$parent21.children.push(_node18);
				}_chFunc(_node6);_$parent7.children.push(_node6);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});