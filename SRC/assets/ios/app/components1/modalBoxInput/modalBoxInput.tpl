(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 3097205650;_node.attrs["w-class"] = "modal-mask";_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 4252679546;_node2.attrs["w-class"] = "body";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1019047777;_node3.attrs["w-class"] = "title";if (typeof it.title === 'string') {
					_$temp = _node3;{
						var _$parent4 = _$temp;_addText(it.title, _$parent4);
					}
				} else {
					_$temp = _node3;{
						var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 3 };_node4.hasChild = false;_node4.child = null;_node4.attrHash = 0;_$temp = _node4;{
							var _$parent6 = _$temp;_addJson(it.title, _$parent6);
						}_chFunc(_node4);_$parent5.children.push(_node4);
					}
				}_$temp = _node3;{
					var _$parent7 = _$temp;var _node5 = { "attrs": {}, "tagName": "span", "sid": 4 };_node5.children = [];_node5.childHash = 291293482;_node5.attrSize = 2;_node5.attrHash = 3480141923;_node5.attrs["w-class"] = "forgetPsw";_node5.attrs["on-tap"] = "foegetPsw";_$temp = _node5;{
						var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 5 };_node6.hasChild = false;_node6.child = null;_node6.childHash = 1018039745;_node6.attrHash = 0;_$temp = _node6;{
							var _$parent9 = _$temp;var _node7 = {}; //jpair pre

							{
								var jvalue = "";
								jvalue = "忘记密码？";
								//jpair suf

								_node7["zh_Hans"] = jvalue;
							}
							//jpair pre

							{
								var _jvalue = "";
								_jvalue = "忘記密碼？";
								//jpair suf

								_node7["zh_Hant"] = _jvalue;
							}
							//jpair pre

							{
								var _jvalue2 = "";
								_jvalue2 = "";
								//jpair suf

								_node7["en"] = _jvalue2;
							}
							_addJson(_node7, _$parent9);
						}_$parent8.children.push(_node6);
					}_$parent7.children.push(_node5);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent10 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 6 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 487306359;_node8.attrs["w-class"] = "content";{
					var _$i = 0;
					for (var _iterator = it.content, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
						var _ref;

						if (_isArray) {
							if (_i >= _iterator.length) break;
							_ref = _iterator[_i++];
						} else {
							_i = _iterator.next();
							if (_i.done) break;
							_ref = _i.value;
						}

						var val = _ref;
						var ind = _$i++;_$temp = _node8;{
							var _$parent11 = _$temp;var _node9 = { "attrs": {}, "tagName": "p", "sid": 7 };_node9.children = [];_node9.attrHash = 0;_$temp = _node9;{
								var _$parent12 = _$temp;_addText(val, _$parent12);
							}_chFunc(_node9);_$parent11.children.push(_node9);
						}
					}
				}_chFunc(_node8);_$parent10.children.push(_node8);
			}_$temp = _node2;{
				var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 2;_node10.attrHash = 3585701875;_node10.attrs["style"] = "height: 90px;";_node10.attrs["ev-input-change"] = "change";_$temp = _node10;{
					var _$parent14 = _$temp;var _node11 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 9 };_node11.hasChild = false;_node11.child = null;_node11.attrHash = 0;_$temp = _node11;{
						var _$parent15 = _$temp;var _node12 = {}; //jpair pre

						_node12["placeHolder"] = it.placeholder ? it.placeholder : "";
						//jpair suf
						//jpair pre

						_node12["itype"] = it.itype ? it.itype : "text";
						//jpair suf
						//jpair pre

						{
							var _jvalue3 = "";
							_jvalue3 = "padding:0;font-size:28px;";
							//jpair suf

							_node12["style"] = _jvalue3;
						}
						//jpair pre

						_node12["underLine"] = true;
						//jpair suf
						//jpair pre

						_node12["autofocus"] = true;
						//jpair suf
						_addJson(_node12, _$parent15);
					}_chFunc(_node11);_$parent14.children.push(_node11);
				}_chFunc(_node10);_$parent13.children.push(_node10);
			}_$temp = _node2;{
				var _$parent16 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 10 };_node13.children = [];_node13.attrSize = 1;_node13.attrHash = 2566746008;_node13.attrs["w-class"] = "btns";if (it.cancelText) {
					cancelText = { "zh_Hans": it.cancelText, "zh_Hant": it.cancelText, "en": "" };
				} else {
					cancelText = { "zh_Hans": "取消", "zh_Hant": "取消", "en": "" };
				}if (it.sureText) {
					sureText = { "zh_Hans": it.sureText, "zh_Hant": it.sureText, "en": "" };
				} else {
					sureText = { "zh_Hans": "确定", "zh_Hant": "確定", "en": "" };
				}_$temp = _node13;{
					var _$parent17 = _$temp;var _node14 = { "attrs": {}, "tagName": "div", "sid": 11 };_node14.children = [];_node14.attrSize = 2;_node14.attrHash = 3340574570;_node14.attrs["w-class"] = "btn-cancel";_node14.attrs["on-tap"] = "cancelBtnClick";_$temp = _node14;{
						var _$parent18 = _$temp;var _node15 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 12 };_node15.hasChild = false;_node15.child = null;_node15.attrHash = 0;_$temp = _node15;{
							var _$parent19 = _$temp;_addJson(cancelText, _$parent19);
						}_chFunc(_node15);_$parent18.children.push(_node15);
					}_chFunc(_node14);_$parent17.children.push(_node14);
				}_$temp = _node13;{
					var _$parent20 = _$temp;var _node16 = { "attrs": {}, "tagName": "div", "sid": 13 };_node16.children = [];_node16.attrSize = 2;_node16.attrHash = 4264153071;_node16.attrs["w-class"] = "btn-ok";_node16.attrs["on-tap"] = "okBtnClick";_$temp = _node16;{
						var _$parent21 = _$temp;var _node17 = { "attrs": {}, "tagName": "pi-ui-lang", "sid": 14 };_node17.hasChild = false;_node17.child = null;_node17.attrHash = 0;_$temp = _node17;{
							var _$parent22 = _$temp;_addJson(sureText, _$parent22);
						}_chFunc(_node17);_$parent21.children.push(_node17);
					}_chFunc(_node16);_$parent20.children.push(_node16);
				}_chFunc(_node13);_$parent16.children.push(_node13);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});