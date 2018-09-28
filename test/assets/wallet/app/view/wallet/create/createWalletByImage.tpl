(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 3;_node.attrHash = 3437572703;_node.attrs["class"] = "new-page";_node.attrs["w-class"] = "new-page";_node.attrs["ev-back-click"] = "backPrePage";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "app-components1-topBar-topBar", "sid": 1 };_node2.hasChild = false;_node2.child = null;_node2.childHash = 1465611370;_node2.attrHash = 0;_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = {}; //jpair pre

				{
					var jvalue = "";
					jvalue = "创建账户";
					//jpair suf

					_node3["title"] = jvalue;
				}
				_addJson(_node3, _$parent3);
			}_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 2 };_node4.children = [];_node4.attrSize = 1;_node4.attrHash = 4252679546;_node4.attrs["w-class"] = "body";_$temp = _node4;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "app-view-wallet-components-tipsCard", "sid": 3 };_node5.hasChild = false;_node5.child = null;_node5.childHash = 4133177094;_node5.attrHash = 0;_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = {}; //jpair pre

					{
						var _jvalue = "";
						_jvalue = "选择颜色丰富的照片";
						//jpair suf

						_node6["title"] = _jvalue;
					}
					//jpair pre

					{
						var _jvalue2 = "";
						_jvalue2 = "照片和照片密码是您找回账号的唯一凭证，一旦丢失，KuPay将无法恢复您的账号和资产。照片和照片密码无法修改，请务必牢记并妥善保管。";
						//jpair suf

						_node6["content"] = _jvalue2;
					}
					//jpair pre

					{
						var _jvalue3 = "";
						_jvalue3 = "color:#ef3838";
						//jpair suf

						_node6["contentStyle"] = _jvalue3;
					}
					_addJson(_node6, _$parent6);
				}_$parent5.children.push(_node5);
			}_$temp = _node4;{
				var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 4 };_node7.children = [];_node7.attrSize = 1;_node7.attrHash = 4064917415;_node7.attrs["w-class"] = "bottom-box";_$temp = _node7;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 2;_node8.attrHash = 2862166069;_node8.attrs["w-class"] = "choose-image-container";_node8.attrs["on-tap"] = "selectImageClick";if (!it1.chooseImage) {
						_$temp = _node8;{
							var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.childHash = 1806375974;_node9.attrSize = 1;_node9.attrHash = 440925614;_node9.attrs["w-class"] = "choose-image-text";_$temp = _node9;{
								var _$parent10 = _$temp;var _node10 = _installText("+ 选择照片", 2646043561);;
								_$parent10.children.push(_node10);
							}_$parent9.children.push(_node9);
						}
					} else {
						_$temp = _node8;{
							var _$parent11 = _$temp;var _node11 = { "attrs": {}, "tagName": "widget", "sid": 7 };_node11.hasChild = false;_node11.child = null;_node11.attrSize = 1;_node11.attrHash = 3581192569;_node11.attrs["w-tag"] = "pi-ui-html";_node11.tagName = _node11.attrs["w-tag"];_node11.attrs["w-class"] = "ui-html";_$temp = _node11;{
								var _$parent12 = _$temp;_addJson(it1.imageHtml, _$parent12);
							}_chFunc(_node11);_$parent11.children.push(_node11);
						}_$temp = _node8;{
							var _$parent13 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrSize = 2;_node12.attrHash = 993061509;_node12.attrs["w-class"] = "image-psw-container";_node12.attrs["on-tap"] = "imagePswClick";_$temp = _node12;{
								var _$parent14 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.attrSize = 2;_node13.attrHash = 3770158290;_node13.attrs["w-class"] = "input-father";_node13.attrs["ev-input-change"] = "imagePswChange";_$temp = _node13;{
									var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "app-components-input-suffixInput", "sid": 10 };_node14.hasChild = false;_node14.child = null;_node14.attrHash = 0;_$temp = _node14;{
										var _$parent16 = _$temp;var _node15 = {}; //jpair pre

										{
											var _jvalue4 = "";
											_jvalue4 = "password";
											//jpair suf

											_node15["itype"] = _jvalue4;
										}
										//jpair pre

										{
											var _jvalue5 = "";
											_jvalue5 = "为照片设置密码";
											//jpair suf

											_node15["placeHolder"] = _jvalue5;
										}
										//jpair pre

										_node15["clearable"] = true;
										//jpair suf
										//jpair pre

										_node15["available"] = it1.imagePswAvailable;
										//jpair suf
										_addJson(_node15, _$parent16);
									}_chFunc(_node14);_$parent15.children.push(_node14);
								}_chFunc(_node13);_$parent14.children.push(_node13);
							}_$temp = _node12;{
								var _$parent17 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 11 };_node16.children = [];_node16.attrSize = 2;_node16.attrHash = 1107892557;_node16.attrs["w-class"] = "input-father1";_node16.attrs["ev-input-change"] = "imagePswConfirmChange";_$temp = _node16;{
									var _$parent18 = _$temp;var _node17 = { "attrs": {}, "tagName": "app-components-input-suffixInput", "sid": 12 };_node17.hasChild = false;_node17.child = null;_node17.attrHash = 0;_$temp = _node17;{
										var _$parent19 = _$temp;var _node18 = {}; //jpair pre

										{
											var _jvalue6 = "";
											_jvalue6 = "password";
											//jpair suf

											_node18["itype"] = _jvalue6;
										}
										//jpair pre

										{
											var _jvalue7 = "";
											_jvalue7 = "重复照片密码";
											//jpair suf

											_node18["placeHolder"] = _jvalue7;
										}
										//jpair pre

										_node18["clearable"] = true;
										//jpair suf
										//jpair pre

										_node18["available"] = it1.pswEqualed;
										//jpair suf
										_addJson(_node18, _$parent19);
									}_chFunc(_node17);_$parent18.children.push(_node17);
								}_chFunc(_node16);_$parent17.children.push(_node16);
							}_chFunc(_node12);_$parent13.children.push(_node12);
						}
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}_$temp = _node7;{
					var _$parent20 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 13 };_node19.children = [];_node19.childHash = 1028141699;_node19.attrSize = 2;_node19.attrHash = 1573521945;_node19.attrs["ev-btn-tap"] = "nextClick";_node19.attrs["w-class"] = "btn";_$temp = _node19;{
						var _$parent21 = _$temp;var _node20 = { "attrs": {}, "tagName": "app-components1-btn-btn", "sid": 14 };_node20.hasChild = false;_node20.child = null;_node20.childHash = 2822766093;_node20.attrHash = 0;_$temp = _node20;{
							var _$parent22 = _$temp;var _node21 = {}; //jpair pre

							{
								var _jvalue8 = "";
								_jvalue8 = "下一步";
								//jpair suf

								_node21["name"] = _jvalue8;
							}
							//jpair pre

							{
								var _jvalue9 = "";
								_jvalue9 = "big";
								//jpair suf

								_node21["types"] = _jvalue9;
							}
							//jpair pre

							{
								var _jvalue10 = "";
								_jvalue10 = "blue";
								//jpair suf

								_node21["color"] = _jvalue10;
							}
							_addJson(_node21, _$parent22);
						}_$parent21.children.push(_node20);
					}_$parent20.children.push(_node19);
				}_chFunc(_node7);_$parent7.children.push(_node7);
			}_chFunc(_node4);_$parent4.children.push(_node4);
		}_chFunc(_node);return _node;
	}
});