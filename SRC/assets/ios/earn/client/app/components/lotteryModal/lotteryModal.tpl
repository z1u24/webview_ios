(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 2;_node.attrHash = 3097205650;_node.attrs["w-class"] = "modal-mask";_node.attrs["class"] = "new-page";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 2;_node2.attrHash = 937271183;_node2.attrs["w-class"] = "body";_node2.attrs["class"] = "smallToBig";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "div", "sid": 2 };_node3.children = [];_node3.childHash = 120955990;_node3.attrSize = 1;_node3.attrHash = 145131995;_node3.attrs["w-class"] = "bg";_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = { "attrs": {}, "tagName": "div", "sid": 3 };_node4.children = [];_node4.childHash = 2946814719;_node4.attrSize = 1;_node4.attrHash = 714848223;_node4.attrs["w-class"] = "bg-top";_$parent4.children.push(_node4);
				}_$temp = _node3;{
					var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 4 };_node5.children = [];_node5.childHash = 2946814719;_node5.attrSize = 1;_node5.attrHash = 3027210797;_node5.attrs["w-class"] = "bg-bottom";_$parent5.children.push(_node5);
				}_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "div", "sid": 5 };_node6.children = [];_node6.attrSize = 1;_node6.attrHash = 487306359;_node6.attrs["w-class"] = "content";_$temp = _node6;{
					var _$parent7 = _$temp;var _node7 = { "attrs": {}, "tagName": "img", "sid": 6 };_node7.children = [];_node7.childHash = 0;_node7.attrSize = 4;_node7.attrHash = 2706256866;_node7.attrs["src"] = "../../res/image/trophies.png";_node7.attrs["width"] = "260px";_node7.attrs["height"] = "280px;";_node7.attrs["alt"] = "";_$parent7.children.push(_node7);
				}_$temp = _node6;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 7 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2583402658;_node8.attrs["w-class"] = "prize-img";_$temp = _node8;{
						var _$parent9 = _$temp;var _node9 = { "attrs": {}, "tagName": "img", "sid": 8 };_node9.children = [];_node9.attrSize = 4;_node9.attrHash = 27900106;{
							var attrvalue = "";attrvalue += "../../res/image/virtualGoods/";attrvalue += it.prizeType;attrvalue += ".jpg";_node9.attrs["src"] = attrvalue;
						}_node9.attrHash = _hash.nextHash(_node9.attrHash, _calTextHash(_node9.attrs["src"]));_node9.attrs["width"] = "200px";_node9.attrs["height"] = "200px;";_node9.attrs["alt"] = "";_chFunc(_node9);_$parent9.children.push(_node9);
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}_$temp = _node6;{
					var _$parent10 = _$temp;var _node10 = { "attrs": {}, "tagName": "widget", "sid": 9 };_node10.hasChild = false;_node10.child = null;_node10.childHash = 3591890446;_node10.attrSize = 1;_node10.attrHash = 1739807805;_node10.attrs["w-class"] = "tips";_node10.attrs["w-tag"] = "pi-ui-lang";_node10.tagName = _node10.attrs["w-tag"];_$temp = _node10;{
						var _$parent11 = _$temp;var _node11 = {}; //jpair pre

						{
							var jvalue = "";
							jvalue = "抽中了";
							//jpair suf

							_node11["zh_Hans"] = jvalue;
						}
						//jpair pre

						{
							var _jvalue = "";
							_jvalue = "抽中了";
							//jpair suf

							_node11["zh_Hant"] = _jvalue;
						}
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "";
							//jpair suf

							_node11["en"] = _jvalue2;
						}
						_addJson(_node11, _$parent11);
					}_$parent10.children.push(_node10);
				}_$temp = _node6;{
					var _$parent12 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 10 };_node12.children = [];_node12.attrHash = 0;_$temp = _node12;{
						var _$parent13 = _$temp;var _node13 = { "attrs": {}, "tagName": "widget", "sid": 11 };_node13.hasChild = false;_node13.child = null;_node13.attrSize = 1;_node13.attrHash = 1058223714;_node13.attrs["w-class"] = "prize-name";_node13.attrs["w-tag"] = "pi-ui-lang";_node13.tagName = _node13.attrs["w-tag"];_$temp = _node13;{
							var _$parent14 = _$temp;_addJson(it.prizeName, _$parent14);
						}_chFunc(_node13);_$parent13.children.push(_node13);
					}_$temp = _node12;{
						var _$parent15 = _$temp;var _node14 = { "attrs": {}, "tagName": "span", "sid": 12 };_node14.children = [];_node14.attrSize = 1;_node14.attrHash = 2305899579;_node14.attrs["w-class"] = "prize-name";_$temp = _node14;{
							var _$parent16 = _$temp;var _node15 = _installText("&nbsp;x&nbsp;", 2552537132);;
							_$parent16.children.push(_node15);
						}_$temp = _node14;{
							var _$parent17 = _$temp;_addText(it.prizeNum, _$parent17);
						}_chFunc(_node14);_$parent15.children.push(_node14);
					}_$temp = _node12;{
						var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "widget", "sid": 13 };_node16.hasChild = false;_node16.child = null;_node16.attrSize = 1;_node16.attrHash = 1058223714;_node16.attrs["w-class"] = "prize-name";_node16.attrs["w-tag"] = "pi-ui-lang";_node16.tagName = _node16.attrs["w-tag"];_$temp = _node16;{
							var _$parent19 = _$temp;_addJson(it.prizeUnit, _$parent19);
						}_chFunc(_node16);_$parent18.children.push(_node16);
					}_chFunc(_node12);_$parent12.children.push(_node12);
				}_chFunc(_node6);_$parent6.children.push(_node6);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "div", "sid": 14 };_node17.children = [];_node17.childHash = 41651616;_node17.attrSize = 3;_node17.attrHash = 3834618450;_node17.attrs["w-class"] = "closeBtn";_node17.attrs["class"] = "smallToBig";_node17.attrs["on-tap"] = "close";_$temp = _node17;{
				var _$parent21 = _$temp;var _node18 = { "attrs": {}, "tagName": "img", "sid": 15 };_node18.children = [];_node18.childHash = 0;_node18.attrSize = 3;_node18.attrHash = 1767696083;_node18.attrs["src"] = "../../res/image1/close-white.png";_node18.attrs["width"] = "30px;";_node18.attrs["height"] = "30px;";_$parent21.children.push(_node18);
			}_$parent20.children.push(_node17);
		}_chFunc(_node);return _node;
	}
});