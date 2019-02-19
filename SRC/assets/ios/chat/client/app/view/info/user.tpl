(function (_cfg, it, it1) {
	var _$temp = void 0,
	    node = void 0;_$temp = node;{
		var _$parent = _$temp;var _node = { "attrs": {}, "tagName": "div", "sid": 0 };_node.children = [];_node.attrSize = 4;_node.attrHash = 1282016519;_node.attrs["w-class"] = "new-page";_node.attrs["class"] = "new-page";_node.attrs["on-tap"] = "pageClick";_node.attrs["ev-back-click"] = "goBack";_$temp = _node;{
			var _$parent2 = _$temp;var _node2 = { "attrs": {}, "tagName": "div", "sid": 1 };_node2.children = [];_node2.attrSize = 1;_node2.attrHash = 2960902391;_node2.attrs["w-class"] = "top-main-wrap";_$temp = _node2;{
				var _$parent3 = _$temp;var _node3 = { "attrs": {}, "tagName": "chat-client-app-widget-topBar-topBar", "sid": 2 };_node3.hasChild = false;_node3.child = null;_node3.childHash = 21949214;_node3.attrHash = 0;_$temp = _node3;{
					var _$parent4 = _$temp;var _node4 = {}; //jpair pre

					{
						var jvalue = "";
						jvalue = "";
						//jpair suf

						_node4["title"] = jvalue;
					}
					//jpair pre

					{
						var _jvalue = "";
						_jvalue = "#318DE6";
						//jpair suf

						_node4["background"] = _jvalue;
					}
					_addJson(_node4, _$parent4);
				}_$parent3.children.push(_node3);
			}_$temp = _node2;{
				var _$parent5 = _$temp;var _node5 = { "attrs": {}, "tagName": "div", "sid": 3 };_node5.children = [];_node5.attrSize = 1;_node5.attrHash = 22015006;_node5.attrs["w-class"] = "home-info-wrap";_$temp = _node5;{
					var _$parent6 = _$temp;var _node6 = { "attrs": {}, "tagName": "widget", "sid": 4 };_node6.hasChild = false;_node6.child = null;_node6.attrSize = 1;_node6.attrHash = 1941416123;_node6.attrs["w-tag"] = "chat-client-app-widget-imgShow-imgShow";_node6.tagName = _node6.attrs["w-tag"];_node6.attrs["w-class"] = "avatar";_$temp = _node6;{
						var _$parent7 = _$temp;var _node7 = {}; //jpair pre

						_node7["imgURL"] = it.avatar;
						//jpair suf
						//jpair pre

						{
							var _jvalue2 = "";
							_jvalue2 = "190px;";
							//jpair suf

							_node7["width"] = _jvalue2;
						}
						_addJson(_node7, _$parent7);
					}_chFunc(_node6);_$parent6.children.push(_node6);
				}_$temp = _node5;{
					var _$parent8 = _$temp;var _node8 = { "attrs": {}, "tagName": "div", "sid": 5 };_node8.children = [];_node8.attrSize = 1;_node8.attrHash = 2372826457;_node8.attrs["w-class"] = "nameText";_$temp = _node8;{
						var _$parent9 = _$temp;_addText(it.name, _$parent9);
					}_chFunc(_node8);_$parent8.children.push(_node8);
				}_$temp = _node5;{
					var _$parent10 = _$temp;var _node9 = { "attrs": {}, "tagName": "div", "sid": 6 };_node9.children = [];_node9.attrSize = 2;_node9.attrHash = 1626951748;_node9.attrs["on-tap"] = "doCopy(0)";_node9.attrs["style"] = "border-bottom: 40px solid transparent;";_$temp = _node9;{
						var _$parent11 = _$temp;var _node10 = _installText("ID：", 3204938943);;
						_$parent11.children.push(_node10);
					}_$temp = _node9;{
						var _$parent12 = _$temp;_addText(it.info.uid, _$parent12);
					}_chFunc(_node9);_$parent10.children.push(_node9);
				}_chFunc(_node5);_$parent5.children.push(_node5);
			}_chFunc(_node2);_$parent2.children.push(_node2);
		}_$temp = _node;{
			var _$parent13 = _$temp;var _node11 = { "attrs": {}, "tagName": "div", "sid": 7 };_node11.children = [];_node11.attrSize = 1;_node11.attrHash = 3735594628;_node11.attrs["w-class"] = "detail-info-wrap";_$temp = _node11;{
				var _$parent14 = _$temp;var _node12 = { "attrs": {}, "tagName": "div", "sid": 8 };_node12.children = [];_node12.attrSize = 1;_node12.attrHash = 3931189419;_node12.attrs["w-class"] = "detail-info";_$temp = _node12;{
					var _$parent15 = _$temp;var _node13 = { "attrs": {}, "tagName": "div", "sid": 9 };_node13.children = [];_node13.attrSize = 3;_node13.attrHash = 905396339;_node13.attrs["w-class"] = "adress-wrap";_node13.attrs["style"] = "margin: 60px 0px 20px;";_node13.attrs["on-tap"] = "doCopy(1)";_$temp = _node13;{
						var _$parent16 = _$temp;var _node14 = { "attrs": {}, "tagName": "img", "sid": 10 };_node14.children = [];_node14.childHash = 0;_node14.attrSize = 2;_node14.attrHash = 3649326135;_node14.attrs["w-class"] = "adressIcon";_node14.attrs["src"] = "../../res/images/adress-book.png";_$parent16.children.push(_node14);
					}_$temp = _node13;{
						var _$parent17 = _$temp;var _node15 = { "attrs": {}, "tagName": "div", "sid": 11 };_node15.children = [];_node15.attrSize = 1;_node15.attrHash = 4092497811;_node15.attrs["w-class"] = "adress-text-wrap";_$temp = _node15;{
							var _$parent18 = _$temp;var _node16 = { "attrs": {}, "tagName": "span", "sid": 12 };_node16.children = [];_node16.attrSize = 1;_node16.attrHash = 471407342;_node16.attrs["w-class"] = "mainText";_$temp = _node16;{
								var _$parent19 = _$temp;_addText(it.info.uid, _$parent19);
							}_chFunc(_node16);_$parent18.children.push(_node16);
						}_$temp = _node15;{
							var _$parent20 = _$temp;var _node17 = { "attrs": {}, "tagName": "span", "sid": 13 };_node17.children = [];_node17.childHash = 3701888615;_node17.attrSize = 1;_node17.attrHash = 1984368765;_node17.attrs["w-class"] = "flag";_$temp = _node17;{
								var _$parent21 = _$temp;var _node18 = _installText("ID", 396921490);;
								_$parent21.children.push(_node18);
							}_$parent20.children.push(_node17);
						}_chFunc(_node15);_$parent17.children.push(_node15);
					}_chFunc(_node13);_$parent15.children.push(_node13);
				}_$temp = _node12;{
					var _$parent22 = _$temp;var _node19 = { "attrs": {}, "tagName": "div", "sid": 14 };_node19.children = [];_node19.attrSize = 2;_node19.attrHash = 2648070758;_node19.attrs["w-class"] = "adress-wrap";_node19.attrs["on-tap"] = "doCopy(2)";_$temp = _node19;{
						var _$parent23 = _$temp;var _node20 = { "attrs": {}, "tagName": "img", "sid": 15 };_node20.children = [];_node20.childHash = 0;_node20.attrSize = 2;_node20.attrHash = 2405658539;_node20.attrs["w-class"] = "adressIcon";_node20.attrs["src"] = "../../res/images/phone.png";_$parent23.children.push(_node20);
					}_$temp = _node19;{
						var _$parent24 = _$temp;var _node21 = { "attrs": {}, "tagName": "div", "sid": 16 };_node21.children = [];_node21.attrSize = 1;_node21.attrHash = 4092497811;_node21.attrs["w-class"] = "adress-text-wrap";_$temp = _node21;{
							var _$parent25 = _$temp;var _node22 = { "attrs": {}, "tagName": "span", "sid": 17 };_node22.children = [];_node22.attrSize = 1;_node22.attrHash = 471407342;_node22.attrs["w-class"] = "mainText";_$temp = _node22;{
								var _$parent26 = _$temp;_addText(it.tel, _$parent26);
							}_chFunc(_node22);_$parent25.children.push(_node22);
						}_$temp = _node21;{
							var _$parent27 = _$temp;var _node23 = { "attrs": {}, "tagName": "span", "sid": 18 };_node23.children = [];_node23.childHash = 702834102;_node23.attrSize = 1;_node23.attrHash = 1984368765;_node23.attrs["w-class"] = "flag";_$temp = _node23;{
								var _$parent28 = _$temp;var _node24 = _installText("电话", 2935744730);;
								_$parent28.children.push(_node24);
							}_$parent27.children.push(_node23);
						}_chFunc(_node21);_$parent24.children.push(_node21);
					}_chFunc(_node19);_$parent22.children.push(_node19);
				}_chFunc(_node12);_$parent14.children.push(_node12);
			}_$temp = _node11;{
				var _$parent29 = _$temp;var _node25 = { "attrs": {}, "tagName": "div", "sid": 19 };_node25.children = [];_node25.childHash = 1033020139;_node25.attrSize = 1;_node25.attrHash = 1474034264;_node25.attrs["w-class"] = "other-wrap";_$temp = _node25;{
					var _$parent30 = _$temp;var _node26 = { "attrs": {}, "tagName": "div", "sid": 20 };_node26.children = [];_node26.childHash = 2801225034;_node26.attrSize = 1;_node26.attrHash = 3625508179;_node26.attrs["style"] = "display:flex;align-items:center;";_$temp = _node26;{
						var _$parent31 = _$temp;var _node27 = { "attrs": {}, "tagName": "img", "sid": 21 };_node27.children = [];_node27.childHash = 0;_node27.attrSize = 2;_node27.attrHash = 3865073803;_node27.attrs["w-class"] = "moreChooseIcon";_node27.attrs["src"] = "../../res/images/more-choose.png";_$parent31.children.push(_node27);
					}_$temp = _node26;{
						var _$parent32 = _$temp;var _node28 = { "attrs": {}, "tagName": "span", "sid": 22 };_node28.children = [];_node28.childHash = 4194239557;_node28.attrSize = 1;_node28.attrHash = 4107859370;_node28.attrs["style"] = "font-size:32px;color:#222222";_$temp = _node28;{
							var _$parent33 = _$temp;var _node29 = _installText("其他设置", 3659209164);;
							_$parent33.children.push(_node29);
						}_$parent32.children.push(_node28);
					}_$parent30.children.push(_node26);
				}_$parent29.children.push(_node25);
			}_chFunc(_node11);_$parent13.children.push(_node11);
		}_chFunc(_node);return _node;
	}
});