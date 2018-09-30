(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 1;_node.attrHash = 1250095831;_node.attrs["w-class"] = "modal-mask";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 4252679546;_node2.attrs["w-class"] = "body";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.attrSize = 1;_node3.attrHash = 1019047777;_node3.attrs["w-class"] = "title";_$temp = _node3;{
					var _$parent4 = _$temp;_addText(it.title, _$parent4);
				}_$temp = _node3;{
					var _$parent5 = _$temp;var _node4 = { "attrs": {}, "tagName": "span", "sid": 3 };_node4.children = [];_node4.attrSize = 2;_node4.attrHash = 3480141923;_node4.attrs["w-class"] = "forgetPsw";_node4.attrs["on-tap"] = "foegetPsw";_$temp = _node4;{
						var _$parent6 = _$temp;_addText(it1.cfgData.forgetPsw, _$parent6);
					}_chFunc(_node4);_$parent5.children.push(_node4);
				}_chFunc(_node3);_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent7 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 487306359;_node5.attrs["w-class"] = "content";{
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
						var ind = _$i++;_$temp = _node5;{
							var _$parent8 = _$temp;var _node6 = { "attrs": {}, "tagName": "p", "sid": 5 };_node6.children = [];_node6.attrHash = 0;_$temp = _node6;{
								var _$parent9 = _$temp;_addText(val, _$parent9);
							}_chFunc(_node6);_$parent8.children.push(_node6);
						}
					}
				}_chFunc(_node5);_$parent7.children.push(_node5);
			}_$temp = _node2;{
				var _$parent10 = _$temp;var _node7 = { "attrs": {}, "tagName": "div", "sid": 6 };_node7.children = [];_node7.attrSize = 2;_node7.attrHash = 283800706;_node7.attrs["style"] = "height: 90px;border-bottom: 1px solid #3294E6;";_node7.attrs["ev-input-change"] = "change";_$temp = _node7;{
					var _$parent11 = _$temp;var _node8 = { "attrs": {}, "tagName": "app-components1-input-input", "sid": 7 };_node8.hasChild = false;_node8.child = null;_node8.attrHash = 0;_$temp = _node8;{
						var _$parent12 = _$temp;var _node9 = {}; //jpair pre

						_node9["placeHolder"] = it.placeholder ? it.placeholder : "";
						//jpair suf
						//jpair pre

						_node9["itype"] = it.itype ? it.itype : "text";
						//jpair suf
						//jpair pre

						{
							var jvalue = "";
							jvalue = "padding:0;font-size:28px;";
							//jpair suf

							_node9["style"] = jvalue;
						}
						_addJson(_node9, _$parent12);
					}_chFunc(_node8);_$parent11.children.push(_node8);
				}_chFunc(_node7);_$parent10.children.push(_node7);
			}_$temp = _node2;{
				var _$parent13 = _$temp;var _node10 = { "attrs": {}, "tagName": "div", "sid": 8 };_node10.children = [];_node10.attrSize = 1;_node10.attrHash = 2566746008;_node10.attrs["w-class"] = "btns";_$temp = _node10;{
					var _$parent14 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 9 };_node11.children = [];_node11.attrSize = 2;_node11.attrHash = 3340574570;_node11.attrs["w-class"] = "btn-cancel";_node11.attrs["on-tap"] = "cancelBtnClick";_$temp = _node11;{
						var _$parent15 = _$temp;_addText(it.cancelText ? it.cancelText : it1.cfgData.cancelText, _$parent15);
					}_chFunc(_node11);_$parent14.children.push(_node11);
				}_$temp = _node10;{
					var _$parent16 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrSize = 2;_node12.attrHash = 4264153071;_node12.attrs["w-class"] = "btn-ok";_node12.attrs["on-tap"] = "okBtnClick";_$temp = _node12;{
						var _$parent17 = _$temp;_addText(it.sureText ? it.sureText : it1.cfgData.sureText, _$parent17);
					}_chFunc(_node12);_$parent16.children.push(_node12);
				}_chFunc(_node10);_$parent13.children.push(_node10);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_chFunc(_node);return _node;
	}
});